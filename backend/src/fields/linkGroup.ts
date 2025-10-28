import { ArrayField, Field } from 'payload'
import { link, LinkAppearances } from './link'
import deepMerge from '@/utilities/deepMerge'

type LinkGroupType = (options?: {
	appearances?: LinkAppearances[] | false
	overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
	const generatedLinkGroup: Field = {
		name: 'links',
		label: 'Enlaces',
		type: 'array',
		fields: [
			link({
				appearances,
			}),
		],
		admin: {
			initCollapsed: true,
		},
	}

	return deepMerge(generatedLinkGroup, overrides)
}
