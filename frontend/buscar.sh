#!/bin/bash
# buscar-ssr.sh

echo "🔍 Buscando páginas que piden SSR..."
echo ""

echo "1. Buscando prerender = false:"
grep -rn "prerender.*false" src/pages/ 2>/dev/null
echo ""

echo "2. Buscando endpoints API:"
find src/pages -name "*.ts" -o -name "*.js" | grep -v ".astro"
echo ""

echo "3. Verificando astro.config:"
grep -n "output.*server" astro.config.mjs 2>/dev/null
echo ""

echo "4. Buscando uso de Astro.cookies:"
grep -rn "Astro.cookies" src/pages/ 2>/dev/null
echo ""

echo "5. Buscando uso de Astro.request:"
grep -rn "Astro.request" src/pages/ 2>/dev/null
