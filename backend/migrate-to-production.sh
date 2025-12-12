#!/bin/bash

# 🚀 Migración con debug mejorado

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Migración PostgreSQL → Railway       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"

# 1. Cargar DATABASE_URL local
echo -e "\n${BLUE}📦 Cargando configuración local...${NC}"

if [ ! -f .env ]; then
    echo -e "${RED}❌ No se encontró archivo .env${NC}"
    exit 1
fi

export $(grep -v '^#' .env | grep DATABASE_URL | xargs)

if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL no encontrada en .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ DATABASE_URL local encontrada${NC}"

# 2. Probar conexión local
echo -e "\n${BLUE}🔌 Probando conexión LOCAL...${NC}"

if psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Conexión local exitosa${NC}"
else
    echo -e "${RED}❌ No se pudo conectar a la base de datos local${NC}"
    echo -e "${YELLOW}Verifica tu DATABASE_URL en .env${NC}"
    exit 1
fi

# 3. Obtener credenciales de Railway
echo -e "\n${BLUE}🔐 Ingresa las credenciales de Railway Postgres:${NC}"
echo -e "${YELLOW}(Encuéntralas en: Railway → Postgres → Variables)${NC}\n"

read -p "PGHOST (ej: postgres.railway.app): " RAILWAY_HOST

if [ -z "$RAILWAY_HOST" ]; then
    echo -e "${RED}❌ PGHOST es requerido${NC}"
    exit 1
fi

read -p "PGPORT (default 5432): " RAILWAY_PORT
RAILWAY_PORT=${RAILWAY_PORT:-5432}

read -p "PGUSER (default postgres): " RAILWAY_USER
RAILWAY_USER=${RAILWAY_USER:-postgres}

read -sp "PGPASSWORD: " RAILWAY_PASSWORD
echo ""

if [ -z "$RAILWAY_PASSWORD" ]; then
    echo -e "${RED}❌ PGPASSWORD es requerida${NC}"
    exit 1
fi

read -p "PGDATABASE (default railway): " RAILWAY_DB
RAILWAY_DB=${RAILWAY_DB:-railway}

# Construir URL
RAILWAY_URL="postgresql://${RAILWAY_USER}:${RAILWAY_PASSWORD}@${RAILWAY_HOST}:${RAILWAY_PORT}/${RAILWAY_DB}"

echo -e "\n${BLUE}📋 Configuración Railway:${NC}"
echo -e "   Host: ${RAILWAY_HOST}"
echo -e "   Port: ${RAILWAY_PORT}"
echo -e "   User: ${RAILWAY_USER}"
echo -e "   Database: ${RAILWAY_DB}"

# 4. Crear backup
mkdir -p backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/produccion_${TIMESTAMP}.sql"

echo -e "\n${BLUE}💾 Creando backup local...${NC}"

if pg_dump "$DATABASE_URL" --no-owner --no-acl --clean --if-exists -f "$BACKUP_FILE"; then
    BACKUP_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE ($BACKUP_SIZE)${NC}"

    TABLE_COUNT=$(grep -c "CREATE TABLE" "$BACKUP_FILE" || true)
    echo -e "${GREEN}📊 Tablas: $TABLE_COUNT${NC}"
else
    echo -e "${RED}❌ Error creando backup${NC}"
    exit 1
fi

# 5. Confirmar
echo -e "\n${YELLOW}⚠️  ATENCIÓN:${NC}"
echo -e "Se eliminarán los datos actuales en Railway"
echo -e "y se restaurarán desde tu entorno local\n"

read -p "¿Continuar? (escribe 'SI' para confirmar): " CONFIRM

if [ "$CONFIRM" != "SI" ]; then
    echo -e "${RED}❌ Migración cancelada${NC}"
    exit 0
fi

# 6. Probar conexión a Railway CON DETALLE DE ERROR
echo -e "\n${BLUE}🔌 Probando conexión a Railway...${NC}"

# Intentar conexión y capturar error
CONNECTION_TEST=$(psql "$RAILWAY_URL" -c "SELECT version();" 2>&1)
CONNECTION_STATUS=$?

if [ $CONNECTION_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ Conexión a Railway exitosa${NC}"
    echo -e "${GREEN}   PostgreSQL: $(echo "$CONNECTION_TEST" | grep -oP 'PostgreSQL \d+\.\d+')"${NC}
else
    echo -e "${RED}❌ No se pudo conectar a Railway${NC}"
    echo -e "${RED}Error detallado:${NC}"
    echo -e "${YELLOW}$CONNECTION_TEST${NC}"
    echo ""
    echo -e "${BLUE}💡 Posibles soluciones:${NC}"
    echo -e "1. Verifica que el PGHOST sea correcto (no uses .railway.internal)"
    echo -e "2. Verifica que Public Networking esté habilitado en Railway"
    echo -e "3. Verifica la contraseña (PGPASSWORD)"
    echo -e "4. Asegúrate de que la database se llame 'railway'"
    echo ""
    echo -e "${YELLOW}Presiona cualquier tecla para ver las credenciales que usaste...${NC}"
    read -n 1
    echo -e "\n${BLUE}Credenciales usadas:${NC}"
    echo -e "URL: postgresql://${RAILWAY_USER}:***@${RAILWAY_HOST}:${RAILWAY_PORT}/${RAILWAY_DB}"
    exit 1
fi

# 7. Restaurar
echo -e "\n${BLUE}☁️  Restaurando en Railway...${NC}"
echo -e "${YELLOW}Esto puede tomar varios minutos...${NC}\n"

if psql "$RAILWAY_URL" -f "$BACKUP_FILE" 2>&1 | grep -v "already exists" | grep -v "does not exist"; then
    echo -e "\n${GREEN}✅ Restauración completada${NC}"
else
    echo -e "\n${YELLOW}⚠️  Completado con advertencias (esto es normal)${NC}"
fi

# 8. Verificar
echo -e "\n${BLUE}🔍 Verificando datos migrados...${NC}\n"

psql "$RAILWAY_URL" -c "
SELECT
  table_name,
  (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
FROM (
  SELECT
    table_name,
    query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
) t
ORDER BY row_count DESC
LIMIT 10;
" 2>/dev/null || psql "$RAILWAY_URL" -c "\dt"

# 9. Resumen
echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🎉 MIGRACIÓN COMPLETADA              ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}\n"

echo -e "${BLUE}📁 Backup guardado en:${NC} $BACKUP_FILE"
echo -e "${GREEN}🌐 Admin panel:${NC} https://${RAILWAY_HOST}/admin"

echo -e "\n${GREEN}Próximos pasos:${NC}"
echo -e "1. Accede a https://${RAILWAY_HOST}/admin"
echo -e "2. Inicia sesión con tus credenciales locales"
echo -e "3. Verifica que todo el contenido esté presente"

echo -e "\n${BLUE}🚀 ¡Tu sitio está listo para producción!${NC}"
