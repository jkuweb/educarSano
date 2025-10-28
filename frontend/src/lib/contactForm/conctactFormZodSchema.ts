import { z } from 'zod';
import type { FormField } from '@/lib/payloadTypes';

// 🧠 Genera un esquema Zod dinámico
export const conctactFormZodSchema = (fields: FormField[] | null | undefined) => {
	const shape: Record<string, z.ZodTypeAny> = {};

	fields?.forEach((field) => {
		if (field.blockType === 'message') return;

		switch (field.blockType) {
			case 'email':
				shape[field.name] = field.required
					? z.email({ message: 'Debe ser un email válido' })
					: z.email({ message: 'Debe ser un email válido' }).optional();
				break;

			case 'textarea':
			case 'text':
				shape[field.name] = field.required
					? z.string().min(2, { message: 'Campo requerido' })
					: z.string().optional();
				break;

			case 'select':
			case 'radio':
				shape[field.name] = field.required
					? z.string().min(1, { message: 'Selecciona una opción' })
					: z.string().optional();
				break;

			case 'checkbox':
				shape[field.name] = field.required
					? z.literal(true, { message: 'Debes aceptar este campo' })
					: z.boolean().optional();
				break;

			default:
				break;
		}
	});

	return z.object(shape);
};

