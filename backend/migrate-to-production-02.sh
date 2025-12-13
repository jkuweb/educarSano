#!/bin/bash

# 🚀 Migración Payload CMS: Local → Railway

set -e

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Migración Payload CMS → Railway      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"

# -------------------------------
# 1️⃣ Variables locales
# -------------------------------

LOCAL_DB_URL="${DATABASE_URL:-postgres://postgres:rascaspas@127.0.0.1:5432/educarSano}"

if [ -z "$LOCAL_DB_URL" ]; then
    echo -e "${RED}❌ DATABASE_URL local no encontrada${NC}"
    exit 1
fi

echo -e "${GREEN}✅ BASE LOCAL: $LOCAL_DB_URL${NC}"

# -------------------------------
# 2️⃣ Crear backup local
# -------------------------------

mkdir -p backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/educarSano_${TIMESTAMP}.sql"

echo -e "\n${BLUE}💾 Creando backup local...${NC}"

pg_dump "$LOCAL_DB_URL" --no-owner --no-acl --clean --if-exists -f "$BACKUP_FILE"

echo -e "${GREEN}✅ Backup creado: $BACKUP_FILE${NC}"

# -------------------------------
# 3️⃣ Pedir credenciales de Railway
# -------------------------------

echo -e "\n${BLUE}🔐 Ingresa credenciales de Railway:${NC}"

read -p "PGUSER (default postgres): " RAILWAY_USER
RAILWAY_USER=${RAILWAY_USER:-postgres}

read -sp "PGPASSWORD: " RAILWAY_PASSWORD
echo ""

read -p "PGDATABASE (default railway): " RAILWAY_DB
RAILWAY_DB=${RAILWAY_DB:-railway}

# Proxy TCP de Railway
read -p "PGHOST (ej: trolley.proxy.rlwy.net): " RAILWAY_HOST
read -p "PGPORT (ej: 33482): " RAILWAY_PORT
RAILWAY_PORT=${RAILWAY_PORT:-33482}

RAILWAY_URL="postgresql://${RAILWAY_USER}:${RAILWAY_PASSWORD}@${RAILWAY_HOST}:${RAILWAY_PORT}/${RAILWAY_DB}"

echo -e "\n${BLUE}📋 Configuración Railway:${NC}"
echo -e "   Host: ${RAILWAY_HOST}"
echo -e "   Port: ${RAILWAY_PORT}"
echo -e "   User: ${RAILWAY_USER}"
echo -e "   Database: ${RAILWAY_DB}"

# -------------------------------
# 4️⃣ Confirmar restauración
# -------------------------------

echo -e "\n${YELLOW}⚠️  ATENCIÓN:${NC}"
echo -e "Se eliminarán los datos actuales en Railway y se restaurarán desde tu entorno local\n"

read -p "¿Continuar? (escribe 'SI' para confirmar): " CONFIRM
if [ "$CONFIRM" != "SI" ]; then
    echo -e "${RED}❌ Migración cancelada${NC}"
    exit 0
fi

# -------------------------------
# 5️⃣ Probar conexión Railway
# -------------------------------

echo -e "\n${BLUE}🔌 Probando conexión a Railway...${NC}"

if PGPASSWORD="$RAILWAY_PASSWORD" psql -h "$RAILWAY_HOST" -U "$RAILWAY_USER" -p "$RAILWAY_PORT" -d "$RAILWAY_DB" -c "SELECT 1;" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Conexión a Railway exitosa${NC}"
else
    echo -e "${RED}❌ No se pudo conectar a Railway${NC}"
    exit 1
fi

# -------------------------------
# 6️⃣ Restaurar backup en Railway
# -------------------------------

echo -e "\n${BLUE}☁️  Restaurando backup en Railway...${NC}"

PGPASSWORD="$RAILWAY_PASSWORD" psql "$RAILWAY_URL" -f "$BACKUP_FILE"

echo -e "${GREEN}✅ Restauración completada${NC}"

# -------------------------------
# 7️⃣ Verificar tablas
# -------------------------------

echo -e "\n${BLUE}🔍 Verificando tablas en Railway...${NC}"

PGPASSWORD="$RAILWAY_PASSWORD" psql "$RAILWAY_URL" -c "\dt"

# -------------------------------
# 8️⃣ Migraciones Payload (opcional)
# -------------------------------

echo -e "\n${BLUE}🔧 Ejecutando migraciones de Payload (si hay)...${NC}"

railway run pnpm run payload migrate || true

echo -e "\n${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   🎉 MIGRACIÓN COMPLETADA              ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"

echo -e "\n${BLUE}📁 Backup guardado en:${NC} $BACKUP_FILE"
echo -e "${GREEN}🌐 Admin panel Railway: https://${RAILWAY_HOST}/admin${NC}"
