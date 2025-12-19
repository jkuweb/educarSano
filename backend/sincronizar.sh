#!/bin/bash

# 🚀 Migración + Verificación Railway

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
    exit 1
fi

# 3. Obtener credenciales de Railway
echo -e "\n${BLUE}🔐 Ingresa las credenciales de Railway Postgres:${NC}"
read -p "PGHOST (ej: postgres.railway.app): " RAILWAY_HOST
RAILWAY_HOST=${RAILWAY_HOST:?PGHOST es requerido}

read -p "PGPORT (default 5432): " RAILWAY_PORT
RAILWAY_PORT=${RAILWAY_PORT:-5432}

read -p "PGUSER (default postgres): " RAILWAY_USER
RAILWAY_USER=${RAILWAY_USER:-postgres}

read -sp "PGPASSWORD: " RAILWAY_PASSWORD
echo ""
[ -z "$RAILWAY_PASSWORD" ] && { echo -e "${RED}❌ PGPASSWORD es requerida${NC}"; exit 1; }

read -p "PGDATABASE (default railway): " RAILWAY_DB
RAILWAY_DB=${RAILWAY_DB:-railway}

# Construir URL Railway
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
else
    echo -e "${RED}❌ Error creando backup${NC}"
    exit 1
fi

# 5. Confirmar restauración
echo -e "\n${YELLOW}⚠️  ATENCIÓN:${NC}"
echo -e "Se eliminarán los datos actuales en Railway y se restaurarán desde tu entorno local"
read -p "¿Continuar? (escribe 'SI' para confirmar): " CONFIRM
[ "$CONFIRM" != "SI" ] && { echo -e "${RED}❌ Migración cancelada${NC}"; exit 0; }

# 6. Probar conexión a Railway
echo -e "\n${BLUE}🔌 Probando conexión a Railway...${NC}"

if ! psql "$RAILWAY_URL" -c "SELECT 1;" >/dev/null 2>&1; then
    echo -e "${RED}❌ No se pudo conectar a Railway${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Conexión a Railway exitosa${NC}"

# 7. Borrar schema público antes de restaurar
echo -e "\n${BLUE}🧹 Limpiando schema público...${NC}"
psql "$RAILWAY_URL" <<EOF
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO $RAILWAY_USER;
EOF

# 8. Restaurar backup
echo -e "\n${BLUE}☁️  Restaurando backup en Railway...${NC}"
psql "$RAILWAY_URL" -v ON_ERROR_STOP=1 -f "$BACKUP_FILE"
echo -e "${GREEN}✅ Restauración completada${NC}"

# 9. Verificación final
echo -e "\n${BLUE}🔍 Verificando tablas y datos...${NC}"

psql "$RAILWAY_URL" -c "SELECT current_database(), current_user;"
psql "$RAILWAY_URL" -c "\dt"
psql "$RAILWAY_URL" -c "
SELECT table_name, (xpath('/row/cnt/text()', xml_count))[1]::text::int as row_count
FROM (
  SELECT table_name, query_to_xml(format('select count(*) as cnt from %I.%I', table_schema, table_name), false, true, '') as xml_count
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
) t
ORDER BY row_count DESC
LIMIT 10;
"

# 10. Resumen final
echo -e "\n${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          🎉 MIGRACIÓN COMPLETADA EXITOSAMENTE 🎉          ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}📁 Backup guardado en:${NC} $BACKUP_FILE"
echo -e "${BLUE}💾 Tamaño:${NC} $BACKUP_SIZE"

echo -e "\n${YELLOW}🔹 Próximos pasos:${NC}"
echo -e "\n${GREEN}1. Ver tus servicios en Railway:${NC}"
echo -e "   👉 https://railway.app/dashboard"

echo -e "\n${GREEN}2. Conectarte a la base de datos:${NC}"
echo -e "   ${BLUE}# Desde tu terminal:${NC}"
echo -e "   export RAILWAY_DATABASE_URL=\"$RAILWAY_URL\""
echo -e "   psql \"\$RAILWAY_DATABASE_URL\""

echo -e "\n${GREEN}3. Actualizar tu aplicación:${NC}"
echo -e "   ${BLUE}# En Railway Dashboard > Tu Proyecto > Variables:${NC}"
echo -e "   DATABASE_URL = $RAILWAY_URL"

echo -e "\n${GREEN}4. Herramientas recomendadas para administrar la BD:${NC}"
echo -e "   • TablePlus: ${BLUE}https://tableplus.com${NC}"
echo -e "   • DBeaver: ${BLUE}https://dbeaver.io${NC}"
echo -e "   • pgAdmin: ${BLUE}https://www.pgadmin.org${NC}"

echo -e "\n${YELLOW}💡 Tip: Guarda la RAILWAY_DATABASE_URL en un lugar seguro${NC}"
echo -e "${YELLOW}💡 No compartas esta URL públicamente (contiene contraseña)${NC}\n"
