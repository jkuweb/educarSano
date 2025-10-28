import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  email: z.string()
    .email('Por favor ingrese un email válido'),
  message: z.string()
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder los 1000 caracteres'),
  subject: z.string()
    .min(3, 'El asunto debe tener al menos 3 caracteres')
    .max(100, 'El asunto no puede exceder los 100 caracteres'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;