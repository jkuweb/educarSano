// src/pages/api/exit-preview.ts
import type { APIRoute } from 'astro'

export const prerender = false

export const GET: APIRoute = async ({ url, redirect }) => {
	const slug = url.searchParams.get('slug') || ''

	// Redirigir a la versión publicada (estática con caché)
	return redirect(`/${slug}`)
}