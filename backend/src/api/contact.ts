import type { Endpoint } from 'payload'
import { z } from 'zod'
import { Resend } from 'resend'
import { getClientEmailTemplate } from '@/EmailTemplates/clientEmailTemplate'

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY)

// Schema de validación
const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string('Email inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres').optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  consent: z.boolean().optional(),
})

export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    try {
      console.log('🔵 [CONTACT ENDPOINT] Request recibida')

      // Obtener el body
      let body
      if (req.data) {
        body = req.data
      } else if (typeof req.json === 'function') {
        body = await req.json()
      } else if (req.body) {
        body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
      } else {
        throw new Error('No se pudo obtener el body de la request')
      }

      console.log('✅ Body parseado:', body)

      const parsed = ContactSchema.parse(body)
      console.log('✅ Datos validados:', parsed)

      let submission
      try {
        submission = await req.payload.create({
          collection: 'contact-messages',
          data: {
            name: parsed.name,
            email: parsed.email,
            subject: parsed.subject || 'Sin asunto',
            message: parsed.message,
            status: 'nuevo',
          },
        })
      } catch (collectionError) {
        submission = { id: 'pending' }
      }

      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

        await resend.emails.send({
          from: fromEmail,
          to: parsed.email,
          subject: `Confirmación: Hemos recibido tu mensaje`,
          html: getClientEmailTemplate(),
        })
      } catch (emailError) {}

      try {
        const adminEmail = process.env.ADMIN_EMAIL
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

        if (adminEmail) {
          await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            replyTo: process.env.ADMIN_EMAIL,
            subject: `🔔 Nuevo mensaje de contacto: ${parsed.subject || parsed.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0066cc;">Nuevo mensaje de contacto</h2>

                <div style="background: #f0f7ff; padding: 15px; border-left: 4px solid #0066cc; border-radius: 3px; margin: 20px 0;">
                  <p><strong>Nombre:</strong> ${parsed.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${parsed.email}">${parsed.email}</a></p>
                  ${parsed.subject ? `<p><strong>Asunto:</strong> ${parsed.subject}</p>` : ''}
                  <p><strong>Enviado:</strong> ${new Date().toLocaleString('es-ES')}</p>
                </div>

                <h3 style="color: #333;">Mensaje:</h3>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                  <p style="white-space: pre-wrap; margin: 0;">${parsed.message}</p>
                </div>

                <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
                  <p style="margin: 0;"><strong>ID:</strong> ${submission.id}</p>
                </div>
              </div>
            `,
          })
        } else {
        }
      } catch (emailError) {}

      return Response.json(
        {
          success: true,
          message: 'Formulario enviado correctamente',
          submissionId: submission.id,
        },
        { status: 200 },
      )
    } catch (err) {
      if (err instanceof z.ZodError) {
        return Response.json(
          {
            success: false,
            message: 'Errores de validación',
            errors: err.errors.map((e) => ({
              field: e.path[0],
              message: e.message,
            })),
          },
          { status: 400 },
        )
      }

      const errorMessage = err instanceof Error ? err.message : 'Error interno del servidor'

      return Response.json(
        {
          success: false,
          message: errorMessage,
          error: process.env.NODE_ENV === 'development' ? String(err) : undefined,
        },
        { status: 500 },
      )
    }
  },
}
