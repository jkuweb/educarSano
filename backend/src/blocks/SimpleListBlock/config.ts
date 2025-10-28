import type { Block, Field } from 'payload';

import {
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';
const columnFields: Field[] = [
	{
		name: 'enableIcon',
		label: '¿Quieres añadir un Icono?',
		type: 'checkbox',
	},
	{
		name: 'media',
		label: 'icono',
		type: 'upload',
		relationTo: 'media',

		admin: {
			condition: (_, siblingData) => siblingData?.enableIcon,
		},
	},
	{
		name: 'enableRichText',
		label: '¿Quieres añadir texto?',
		type: 'checkbox',
	},
	{
		name: 'richText',
		type: 'richText',
		editor: lexicalEditor({
			admin: {
				hideGutter: true,
				hideInsertParagraphAtEnd: true,
				placeholder: 'Excribe tu contenido aquí...',
			},
			features: ({ defaultFeatures }) => [
				...defaultFeatures.filter(
					feature =>
						!['superscript', 'subscript', 'inlineCode', 'indent'].includes(
							feature.key
						)
				),
				FixedToolbarFeature(),
				InlineToolbarFeature(),
			],
		}),
		admin: {
			condition: (_, siblingData) => siblingData?.enableRichText,
		},
		label: false,
	},
	{
		name: 'color',
		label: 'Selecciona un color de fondo',
		type: 'select',
		defaultValue: 'transparent',
		options: [
			{ value: 'transparent', label: 'Sin Color' },
			{
				label: 'Verde',
				value: 'green',
			},
			{
				label: 'Amarillo',
				value: 'yellow',
			},
			{
				label: 'Rojo',
				value: 'red',
			},
		],
	},
];
export const SimpleListBlock: Block = {
	slug: 'simpleListContent',
	interfaceName: 'SimpleListBlock',
	fields: [
		{
			name: 'enableTitle',
			label: '¿Quieres añadir un Título?',
			type: 'checkbox',
		},
		{
			name: 'title',
			label: 'Título',
			type: 'text',
			admin: {
				condition: (_, siblingData) => siblingData?.enableTitle,
			},
		},
		{
			name: 'enableBackgroundImage',
			label: 'Añadir imagen de fondo',
			type: 'checkbox',
		},
		{
			name: 'enableImage',
			label: '¿Quieres añadir una imagen?',
			type: 'checkbox',
		},
		{
			name: 'fieldImage',
			label: 'Imagen',
			type: 'upload',
			relationTo: 'media',
			admin: {
				condition: (_, siblingData) => siblingData?.enableImage,
			},
		},
		{
			name: 'blocks',
			label: 'Bloques',
			type: 'array',
			admin: {
				initCollapsed: true,
			},
			fields: columnFields,
		},
		{
			name: 'isReverse',
			type: 'checkbox',
			defaultValue: false,
		},
		{
			name: 'bottom',
			type: 'number',
			defaultValue: 100,
		},
		{
			name: 'separatorType',
			type: 'select',
			options: [
				{
					label: 'Yellow',
					value: 'separatorYellow',
				},
				{
					label: 'White',
					value: 'separatorWhite',
				},
				{
					label: 'Background',
					value: 'separatorBackground',
				},
			],
		},
		{
			name: 'sectionName',
			type: 'text',
			required: true,
		},
	],
};