/// <reference types="astro/client" />

import type { boolean } from "astro:schema";

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly PAYLOAD_API_KEY: string;
  readonly PAYLOAD_URL: string;
  readonly PREVIEW_SECRET: string;
  readonly DEV: boolean;
  readonly PUBLIC_RECAPTCHA_SITE_KEY: string;
  CALENDLY_API_KEY: string;
  CALENDLY_USER_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
