import { link } from '@/fields/link';
import { Block } from 'payload';

export const SocialMediaBlock: Block = {
	slug: 'social',
	interfaceName: 'SocialMediaBlock',
	labels: {
		singular: 'Bloque de Redes Sociales',
		plural: 'Bloques de Redes Sociales',
	},
	fields: [
		{
			name: 'rrss',
			label: 'Red Social',
			type: 'array',
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: 'title',
					label: 'Red Social',
					type: 'text',
				},
				link({
					appearances: false,
				}),
				{
					name: 'icon',
					label: 'Icono',
					type: 'upload',
					relationTo: 'media',
				},
			],
		},
	],
};