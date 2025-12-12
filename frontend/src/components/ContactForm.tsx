import React, { useState, useRef, useEffect } from "react";
import { z } from "zod";
import type {
  Form,
  FormField as FormFieldType,
  Media,
} from "@/lib/payloadTypes";
import { conctactFormZodSchema } from "@/lib/contactForm/conctactFormZodSchema";
import AstroImage from "./image/AstroImage";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

interface FormFieldProps {
  field: Exclude<FormFieldType, { blockType: "message" }>;
  className?: string;
  onFocus?: () => void;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  className = "",
  onFocus,
}) => {
  const baseInputClass =
    "w-full bg-yellow-neutral dark:bg-section-color/50 text-paragraph-color p-2 border border-yellow-dark  dark:border-white/50 rounded placeholder:text-[#714e04f7]  dark:placeholder:text-text/50 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-dark  dark:focus:ring-[#f0f0f0]  focus:border-transparent transition-all duration-200";

  switch (field.blockType) {
    case "textarea":
      return (
        <textarea
          id={field.name}
          name={field.name}
          required={!!field.required}
          rows={10}
          placeholder={field.label ?? ""}
          className={`${baseInputClass} ${className}`}
          onFocus={onFocus}
        />
      );
    case "select":
      return (
        <select
          id={field.name}
          name={field.name}
          required={!!field.required}
          className={`${baseInputClass} ${className} text-base h-[47px]`}
          onFocus={onFocus}
        >
          <option value="">Selecciona una opción</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          id={field.name}
          name={field.name}
          required={!!field.required}
          className={`h-4 w-4 rounded border-gray-300 dark:border-white/50  text-primary-600 focus:ring-primary-500 ${className}`}
          onFocus={onFocus}
        />
      );
    case "radio":
      return (
        <div className="mt-6">
          <legend className="text-yellow-dark dark:text-text mb-2 mt-12 text-center">
            Seleccione una opción
            <span className="text-red-500 dark:text-red-800 ml-1">*</span>
          </legend>
          <div className="flex mb-8 justify-center">
            {field.options?.map((option) => {
              const { label, value, id, image } = option;
              const mediaData =
                image && typeof image === "object" ? (image as Media) : null;
              const { alt, unpicUrl, width, height, mimeType, ...rest } =
                mediaData || {};
              return (
                <label key={id} htmlFor={id!}>
                  <input
                    type="radio"
                    id={id!}
                    name={field.blockName!}
                    value={value}
                    required={!!field.required}
                    className="peer absolute opacity-0 pointer-events-none"
                    onFocus={onFocus}
                  />
                  <div className="w-[130px] h-[50px] cursor-pointer items-center p-2 border-2 border-white transition-colors peer-checked:border-yellow-dark dark:peer-checked:border-yellow-neutral  peer-checked:bg-yellow-dark  dark:peer-checked:bg-[#1c2129] hover:border-yellow-dark dark:hover:border-yellow-neutral dark:border-white/50 peer-focus:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary text-gray-700 peer-checked:text-white peer-checked:[&>div_svg_g_path]:stroke-white peer-checked:[&>div_svg_path]:stroke-white">
                    <div className="flex justify-center items-center h-full gap-2">
                      {image && (
                        <AstroImage
                          src={unpicUrl ?? ""}
                          alt={alt ?? ""}
                          width={width ?? 40}
                          height={height ?? 40}
                          className="w-12 h-12 object-cover rounded-md border-2 border-transparent transition-all  dark:[&>svg>g>path]:stroke-[#f0f0f0] dark:[&>svg>path]:stroke-[#f0f0f0] dark:[&>svg>path]:fill-[#f0f0f0]"
                          mimeType={mimeType!}
                          {...rest}
                        />
                      )}
                      <span className="text-sm dark:text-text">{label}</span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      );
    case "email":
      return (
        <input
          type="email"
          id={field.name}
          name={field.name}
          required={!!field.required}
          placeholder={field.label ?? ""}
          className={`${baseInputClass} ${className}`}
          onFocus={onFocus}
        />
      );
    case "text":
      return (
        <input
          type="text"
          id={field.name}
          name={field.name}
          required={!!field.required}
          placeholder={field.label ?? ""}
          className={`${baseInputClass} ${className}`}
          onFocus={onFocus}
        />
      );
    default:
      const _exhaustive: never = field;
      return _exhaustive;
  }
};

interface Props {
  form: Form;
}

export const ContactForm: React.FC<Props> = ({ form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const recaptchaSiteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;
  const payloadUrl = import.meta.env.PAYLOAD_API_URL || "http://localhost:3000";
  const recaptchaLoadedRef = useRef(false);

  useEffect(() => setIsHydrated(true), []);

  const loadRecaptchaScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (recaptchaLoadedRef.current || window.grecaptcha) {
        recaptchaLoadedRef.current = true;
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Error cargando reCAPTCHA"));
      document.head.appendChild(script);
    });
  };

  const handleUserFocus = async () => {
    if (!recaptchaReady && recaptchaSiteKey) {
      try {
        await loadRecaptchaScript();
        window.grecaptcha.ready(() => setRecaptchaReady(true));
        console.log("✅ reCAPTCHA listo");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const schema = conctactFormZodSchema(form.fields);
  type FormDataType = z.infer<typeof schema>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {} as FormDataType;

    form.fields?.forEach((field) => {
      if (field.blockType === "message") return;
      const value = formData.get(field.name);
      if (field.blockType === "checkbox")
        (data as any)[field.name] = value === "on";
      else (data as any)[field.name] = value || "";
    });

    const validation = schema.safeParse(data);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validation.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      let recaptchaToken = "";
      if (recaptchaReady && recaptchaSiteKey && window.grecaptcha) {
        recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: "submit",
        });
      }

      const dataWithRecaptcha = { ...validation.data, recaptchaToken };

      const response = await fetch(`${payloadUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(dataWithRecaptcha),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData?.error === "recaptcha_validation_failed") {
          setErrors({
            _general:
              "Validación de seguridad fallida. Por favor, intenta de nuevo.",
          });
          setIsSubmitting(false);
          return;
        }
        if (errorData?.errors) {
          const formatted: Record<string, string> = {};
          errorData.errors.forEach((err: any) => {
            formatted[err.field] = err.message;
          });
          setErrors(formatted);
          setIsSubmitting(false);
          return;
        }
        throw new Error(errorData?.message || "Error al enviar el formulario");
      }

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setErrors({
        _general:
          err instanceof Error ? err.message : "Error al enviar el formulario",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) return null;

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
        <h3 className="text-green-800 font-semibold">¡Mensaje enviado!</h3>
        <p className="text-green-700 mt-1">Gracias por contactarnos.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleUserFocus}
      className="bg-yellow-neutral dark:bg-section-color-blue rounded-sm space-y-4"
    >
      {errors._general && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-800 text-sm">
            {errors._general}
          </p>
        </div>
      )}

      {form.fields
        ?.filter(
          (f): f is Exclude<FormFieldType, { blockType: "message" }> =>
            f.blockType !== "message",
        )
        .map((field) => (
          <div key={field.name} className="form-field">
            {field.blockType !== "radio" && (
              <label
                htmlFor={field.name}
                className="mb-2 block text-yellow-dark dark:text-text"
              >
                {field.label}
                {field.required && (
                  <span className="text-red-500 dark:text-red-800 ml-1">*</span>
                )}
              </label>
            )}
            <FormField field={field} onFocus={handleUserFocus} />

            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-800">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting || !recaptchaReady}
          className="w-full sm:w-auto inline-flex justify-center items-center py-3 px-6 border border-transparent shadow-sm text-base uppercase font-bold tracking-widest  text-white bg-yellow-dark hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </div>
    </form>
  );
};
