import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
	slug: 'media',
	access: {
		create: () => true,
		delete: () => true,
		read: () => true,
		update: () => true,
	},
	labels: {
		singular: 'Media',
		plural: 'Media',
	},
	fields: [
		{
			name: 'alt',
			label: 'Texto alternativo',
			type: 'text',
			admin: {
				description:
					'Ayuda a los lectores de pantalla a describir la imagen' +
					' (NO lo utilices en imágenes decorativas)',
			},
		},
	],
	upload: {
		disableLocalStorage: true,
		mimeTypes: [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml',
		],
	},
	defaultPopulate: {
		filename: true,
		url: true,
		mimeType: true,
		width: true,
		height: true,
		filesize: true,
		alt: true,
		cloudinaryUrl: true,
	},
	hooks: {
		afterRead: [
			async ({ doc }) => {
				// Identifica si es SVG
				if (doc.mimeType === 'image/svg+xml' || doc.filename?.endsWith('.svg')) {
					doc.isSVG = true;
				}
				return doc;
			}
		]
	}
};