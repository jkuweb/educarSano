// src/scripts/buildSearchIndex.js
import fs from 'fs'
import fetch from 'node-fetch'

const PAYLOAD_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000'

async function buildIndex() {
  console.log('🧱 Generando índice de búsqueda...')
  const res = await fetch(`${PAYLOAD_URL}/api/posts?limit=1000`)
  const { docs } = await res.json()

  const minimalIndex = docs.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    date: post.date,
  }))

  fs.writeFileSync('./public/search-index.json', JSON.stringify(minimalIndex, null, 2))
  console.log('✅ search-index.json generado correctamente')
}

buildIndex()
