import {
	BlocksFeature,
	FixedToolbarFeature,
	InlineToolbarFeature,
	lexicalEditor,
} from '@payloadcms/richtext-lexical';
import { Block } from 'payload';
import { SocialMediaBlock } from '@/blocks/SocialMediaBlock/config';

export const FormBlock: Block = {
	slug: 'formBlock',
	labels: {
		singular: 'Form Block',
		plural: 'Form Blocks',
	},
	fields: [
		{
			name: 'enableHeaderText',
			label: '¿Quieres añádir texto?',
			type: 'checkbox',
		},
		{
			name: 'headerText',
			label: 'Header Text',
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
					BlocksFeature({
						blocks: [SocialMediaBlock],
					}),
					FixedToolbarFeature(),
					InlineToolbarFeature(),
				],
			}),
			admin: {
				condition: (_, { enableHeaderText }) => Boolean(enableHeaderText),
			},
		},
		{
			name: 'enableCompanionText',
			label: '¿Añadir un título al formulario?',
			type: 'checkbox',
		},
		{
			name: 'companionText',
			label: 'Titulo del formulario',
			type: 'richText',
			editor: lexicalEditor({}),
			admin: {
				condition: (_, { enableCompanionText }) => Boolean(enableCompanionText),
			},
		},
		{
			name: 'form',
			relationTo: 'forms',
			type: 'relationship',
			required: true,
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
	],

};