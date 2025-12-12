import type { Endpoint } from 'payload'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit } from '@/utilities/rateLimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string('Email inválido'),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres').optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
  recaptchaToken: z.string().optional(),
})

export const contactEndpoint: Endpoint = {
  path: '/contact',
  method: 'post',
  handler: async (req) => {
    try {
      const ip =
        req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
        req.headers.get('x-real-ip') ||
        'unknown'

      const rateLimit = checkRateLimit(`contact:${ip}`, {
        windowMs: 60 * 60 * 1000,
        maxRequests: 5,
      })

      if (!rateLimit.allowed) {
        const resetDate = new Date(rateLimit.resetTime)

        return Response.json(
          {
            success: false,
            message: 'Has enviado demasiados mensajes. Por favor, espera un momento.',
            retryAfter: resetDate.toISOString(),
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((rateLimit.resetTime - Date.now()) / 1000)),
            },
          },
        )
      }

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

      const parsed = ContactSchema.parse(body)

      if (parsed.recaptchaToken && process.env.RECAPTCHA_SECRET_KEY) {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${parsed.recaptchaToken}`,
        })

        const recaptchaData = await recaptchaResponse.json()

        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          console.log('⛔ reCAPTCHA validation failed:', recaptchaData)
          return Response.json(
            {
              success: false,
              error: 'recaptcha_validation_failed',
              message: 'Validación de seguridad fallida',
            },
            { status: 400 },
          )
        }
      }

      const emailRateLimit = checkRateLimit(`contact:email:${parsed.email}`, {
        windowMs: 24 * 60 * 60 * 1000,
        maxRequests: 3,
      })

      if (!emailRateLimit.allowed) {
        return Response.json(
          {
            success: false,
            message: 'Has enviado demasiados mensajes desde este email.',
          },
          { status: 429 },
        )
      }

      // let submission
      // try {
      //   submission = await req.payload.create({
      //     collection: 'contact-messages',
      //     data: {
      //       name: parsed.name,
      //       email: parsed.email,
      //       subject: parsed.subject || 'Sin asunto',
      //       message: parsed.message,
      //       status: 'nuevo',
      //     },
      //   })
      // } catch (collectionError) {
      //   submission = { id: 'pending' }
      // }

      // Enviar emails (mismo código de antes)
      try {
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@educarsano.com'

        await resend.emails.send({
          from: fromEmail,
          to: parsed.email,
          subject: `Confirmación: Hemos recibido tu mensaje`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">¡Gracias por contactarnos!</h2>
              <p>Hola <strong>${parsed.name}</strong>,</p>
              <p>Hemos recibido tu mensaje correctamente.</p>
            </div>
          `,
        })
      } catch (emailError) {}

      try {
        const adminEmail = process.env.ADMIN_EMAIL || 'asesoriaeducarsano@gmail.com'
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@educarsano.com'

        if (adminEmail) {
          await resend.emails.send({
            from: fromEmail,
            to: adminEmail,
            replyTo: parsed.email,
            subject: `🔔 Nuevo mensaje: ${parsed.subject || parsed.name}`,
            html: `
              <h2>Nuevo mensaje de contacto</h2>
              <p><strong>Nombre:</strong> ${parsed.name}</p>
              <p><strong>Email:</strong> ${parsed.email}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${parsed.message}</p>
            `,
          })
        }
      } catch (emailError) {}

      return Response.json(
        {
          success: true,
          message: 'Formulario enviado correctamente',
        },
        { status: 200 },
      )
    } catch (err) {
      if (err instanceof z.ZodError) {
        return Response.json(
          {
            success: false,
            message: 'Errores de validación',
            errors: err.issues.map((e) => ({
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
        },
        { status: 500 },
      )
    }
  },
}
