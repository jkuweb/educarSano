import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_cta_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_content_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_content_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_list_content_blocks_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_list_content_blocks_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_list_content_blocks_color" AS ENUM('transparent', 'green', 'yellow', 'red');
  CREATE TYPE "public"."enum_pages_blocks_list_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground', 'separatorDark');
  CREATE TYPE "public"."enum_pages_blocks_list_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_form_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_form_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_social_rrss_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_simple_list_content_blocks_color" AS ENUM('transparent', 'green', 'yellow', 'red');
  CREATE TYPE "public"."enum_pages_blocks_simple_list_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_simple_list_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_quote_block_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_quote_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_quote_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_post_carousel_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_post_carousel_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_service_list_block_blocks_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_pages_blocks_service_list_block_blocks_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_service_list_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_service_list_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_service_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_blocks_service_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_hero_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_pages_hero_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_content_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_content_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_list_content_blocks_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_list_content_blocks_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_list_content_blocks_color" AS ENUM('transparent', 'green', 'yellow', 'red');
  CREATE TYPE "public"."enum__pages_v_blocks_list_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground', 'separatorDark');
  CREATE TYPE "public"."enum__pages_v_blocks_list_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_form_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_social_rrss_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_list_content_blocks_color" AS ENUM('transparent', 'green', 'yellow', 'red');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_list_content_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_simple_list_content_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_quote_block_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_quote_block_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_quote_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_post_carousel_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_post_carousel_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_service_list_block_blocks_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__pages_v_blocks_service_list_block_blocks_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_service_list_block_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_service_list_block_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_service_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_blocks_service_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_hero_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__pages_v_version_hero_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'user', 'guest');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_hero_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_services_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_services_blocks_service_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_services_blocks_service_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_services_hero_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_services_hero_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__services_v_version_hero_links_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum__services_v_version_hero_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__services_v_blocks_service_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__services_v_blocks_service_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__services_v_version_hero_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum__services_v_version_hero_dark_mode" AS ENUM('blue', 'dark');
  CREATE TYPE "public"."enum__services_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_nav_links_items_sub_items_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_header_nav_items_nav_links_items_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_footer_nav_items_link_type" AS ENUM('reference', 'custom', 'calendly');
  CREATE TYPE "public"."enum_footer_separator_type" AS ENUM('separatorYellow', 'separatorWhite', 'separatorBackground');
  CREATE TYPE "public"."enum_footer_dark_mode" AS ENUM('blue', 'dark');
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum_pages_blocks_cta_separator_type",
  	"bottom" numeric DEFAULT 100,
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_cta_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_image" boolean,
  	"image_id" integer,
  	"enable_background_image" boolean,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_content_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_link_appearance" DEFAULT 'default',
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_content_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"section_name" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_list_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_filed_title" boolean,
  	"field_title" varchar,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_pages_blocks_list_content_blocks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_list_content_blocks_link_appearance" DEFAULT 'default',
  	"color" "enum_pages_blocks_list_content_blocks_color" DEFAULT 'transparent'
  );
  
  CREATE TABLE "pages_blocks_list_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_sub_title" boolean,
  	"sub_title" jsonb,
  	"enable_image" boolean,
  	"field_image_id" integer,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_list_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_list_content_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_header_text" boolean,
  	"header_text" jsonb,
  	"enable_companion_text" boolean,
  	"companion_text" jsonb,
  	"form_id" integer,
  	"is_reverse" boolean DEFAULT false,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"dark_mode" "enum_pages_blocks_form_block_dark_mode",
  	"separator_type" "enum_pages_blocks_form_block_separator_type",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_rrss" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum_pages_blocks_social_rrss_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_simple_list_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"color" "enum_pages_blocks_simple_list_content_blocks_color" DEFAULT 'transparent'
  );
  
  CREATE TABLE "pages_blocks_simple_list_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"image_id" integer,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_simple_list_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_simple_list_content_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_pages_blocks_quote_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_quote_block_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_quote_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"enable_image" boolean,
  	"image_id" integer,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_quote_block_separator_type",
  	"section_name" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_box_content_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"rich_text" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_box_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_post_carousel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_post_carousel_block_separator_type",
  	"dark_mode" "enum_pages_blocks_post_carousel_block_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_frequently_questions_block_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_frequently_questions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_text" boolean,
  	"content" jsonb,
  	"enable_image" boolean,
  	"image_id" integer,
  	"section_name" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_list_block_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_filed_title" boolean,
  	"field_title" varchar,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"link_type" "enum_pages_blocks_service_list_block_blocks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_service_list_block_blocks_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_service_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_pages_blocks_service_list_block_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_service_list_block_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "pages_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum_pages_blocks_service_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_pages_blocks_service_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_title" varchar,
  	"hero_media_id" integer,
  	"hero_remove_svg" boolean,
  	"hero_rich_text" jsonb,
  	"hero_is_reverse" boolean DEFAULT false,
  	"hero_bottom" numeric DEFAULT 100,
  	"hero_separator_type" "enum_pages_hero_separator_type",
  	"hero_dark_mode" "enum_pages_hero_dark_mode",
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum__pages_v_blocks_cta_separator_type",
  	"bottom" numeric DEFAULT 100,
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_cta_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_image" boolean,
  	"image_id" integer,
  	"enable_background_image" boolean,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_content_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_link_appearance" DEFAULT 'default',
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_content_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"section_name" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_filed_title" boolean,
  	"field_title" varchar,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__pages_v_blocks_list_content_blocks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_list_content_blocks_link_appearance" DEFAULT 'default',
  	"color" "enum__pages_v_blocks_list_content_blocks_color" DEFAULT 'transparent',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_list_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_sub_title" boolean,
  	"sub_title" jsonb,
  	"enable_image" boolean,
  	"field_image_id" integer,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_list_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_list_content_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_header_text" boolean,
  	"header_text" jsonb,
  	"enable_companion_text" boolean,
  	"companion_text" jsonb,
  	"form_id" integer,
  	"is_reverse" boolean DEFAULT false,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"dark_mode" "enum__pages_v_blocks_form_block_dark_mode",
  	"separator_type" "enum__pages_v_blocks_form_block_separator_type",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_rrss" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"link_type" "enum__pages_v_blocks_social_rrss_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_list_content_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"color" "enum__pages_v_blocks_simple_list_content_blocks_color" DEFAULT 'transparent',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_simple_list_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"image_id" integer,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_simple_list_content_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_simple_list_content_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote_block_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__pages_v_blocks_quote_block_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_quote_block_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"enable_image" boolean,
  	"image_id" integer,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_quote_block_separator_type",
  	"section_name" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_box_content_boxes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"rich_text" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_box_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_post_carousel_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_post_carousel_block_separator_type",
  	"dark_mode" "enum__pages_v_blocks_post_carousel_block_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_frequently_questions_block_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_frequently_questions_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_text" boolean,
  	"content" jsonb,
  	"enable_image" boolean,
  	"image_id" integer,
  	"section_name" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_list_block_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_filed_title" boolean,
  	"field_title" varchar,
  	"enable_icon" boolean,
  	"media_id" integer,
  	"enable_rich_text" boolean,
  	"rich_text" jsonb,
  	"link_type" "enum__pages_v_blocks_service_list_block_blocks_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_service_list_block_blocks_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_list_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_title" boolean,
  	"title" varchar,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum__pages_v_blocks_service_list_block_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_service_list_block_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum__pages_v_blocks_service_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__pages_v_blocks_service_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_title" varchar,
  	"version_hero_media_id" integer,
  	"version_hero_remove_svg" boolean,
  	"version_hero_rich_text" jsonb,
  	"version_hero_is_reverse" boolean DEFAULT false,
  	"version_hero_bottom" numeric DEFAULT 100,
  	"version_hero_separator_type" "enum__pages_v_version_hero_separator_type",
  	"version_hero_dark_mode" "enum__pages_v_version_hero_dark_mode",
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"avatar_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"unpic_url" varchar,
  	"prefix" varchar DEFAULT 'images',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_services_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_services_hero_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "services_blocks_service_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb
  );
  
  CREATE TABLE "services_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum_services_blocks_service_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum_services_blocks_service_dark_mode",
  	"block_name" varchar
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_title" varchar,
  	"hero_media_id" integer,
  	"hero_remove_svg" boolean,
  	"hero_rich_text" jsonb,
  	"hero_is_reverse" boolean DEFAULT false,
  	"hero_bottom" numeric DEFAULT 100,
  	"hero_separator_type" "enum_services_hero_separator_type",
  	"hero_dark_mode" "enum_services_hero_dark_mode",
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"slug_lock" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_services_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "services_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "_services_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__services_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__services_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service_accordions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_services_v_blocks_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"rich_text" jsonb,
  	"enable_background_image" boolean,
  	"bottom" numeric DEFAULT 100,
  	"is_reverse" boolean DEFAULT false,
  	"separator_type" "enum__services_v_blocks_service_separator_type",
  	"section_name" varchar,
  	"dark_mode" "enum__services_v_blocks_service_dark_mode",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_services_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_title" varchar,
  	"version_hero_media_id" integer,
  	"version_hero_remove_svg" boolean,
  	"version_hero_rich_text" jsonb,
  	"version_hero_is_reverse" boolean DEFAULT false,
  	"version_hero_bottom" numeric DEFAULT 100,
  	"version_hero_separator_type" "enum__services_v_version_hero_separator_type",
  	"version_hero_dark_mode" "enum__services_v_version_hero_dark_mode",
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_slug_lock" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__services_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_services_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"doc_url" varchar,
  	"prefix" varchar DEFAULT 'documents',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"duration" numeric,
  	"prefix" varchar DEFAULT 'videos',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_radio_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "forms_blocks_radio" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"users_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"posts_id" integer,
  	"tags_id" integer,
  	"services_id" integer,
  	"documents_id" integer,
  	"videos_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_nav_links_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"enable_image" boolean,
  	"image_id" integer,
  	"link_type" "enum_header_nav_items_nav_links_items_sub_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_nav_links_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"link_type" "enum_header_nav_items_nav_links_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar
  );
  
  CREATE TABLE "header_nav_items_nav_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  CREATE TABLE "footer_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_footer_nav_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"enable_background_image" boolean,
  	"is_reverse" boolean DEFAULT false,
  	"bottom" numeric DEFAULT 100,
  	"separator_type" "enum_footer_separator_type",
  	"dark_mode" "enum_footer_dark_mode",
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"services_id" integer
  );
  
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block" ADD CONSTRAINT "pages_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_content_blocks" ADD CONSTRAINT "pages_blocks_list_content_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_content_blocks" ADD CONSTRAINT "pages_blocks_list_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_list_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_content" ADD CONSTRAINT "pages_blocks_list_content_field_image_id_media_id_fk" FOREIGN KEY ("field_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_list_content" ADD CONSTRAINT "pages_blocks_list_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block" ADD CONSTRAINT "pages_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_rrss" ADD CONSTRAINT "pages_blocks_social_rrss_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_rrss" ADD CONSTRAINT "pages_blocks_social_rrss_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social" ADD CONSTRAINT "pages_blocks_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_list_content_blocks" ADD CONSTRAINT "pages_blocks_simple_list_content_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_list_content_blocks" ADD CONSTRAINT "pages_blocks_simple_list_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_simple_list_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_list_content" ADD CONSTRAINT "pages_blocks_simple_list_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_simple_list_content" ADD CONSTRAINT "pages_blocks_simple_list_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote_block_links" ADD CONSTRAINT "pages_blocks_quote_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quote_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote_block" ADD CONSTRAINT "pages_blocks_quote_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote_block" ADD CONSTRAINT "pages_blocks_quote_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_box_content_boxes" ADD CONSTRAINT "pages_blocks_box_content_boxes_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_box_content_boxes" ADD CONSTRAINT "pages_blocks_box_content_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_box_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_box_content" ADD CONSTRAINT "pages_blocks_box_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_post_carousel_block" ADD CONSTRAINT "pages_blocks_post_carousel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_frequently_questions_block_questions" ADD CONSTRAINT "pages_blocks_frequently_questions_block_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_frequently_questions_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_frequently_questions_block" ADD CONSTRAINT "pages_blocks_frequently_questions_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_frequently_questions_block" ADD CONSTRAINT "pages_blocks_frequently_questions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list_block_blocks" ADD CONSTRAINT "pages_blocks_service_list_block_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list_block_blocks" ADD CONSTRAINT "pages_blocks_service_list_block_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_list_block" ADD CONSTRAINT "pages_blocks_service_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_accordions" ADD CONSTRAINT "pages_blocks_service_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service" ADD CONSTRAINT "pages_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block" ADD CONSTRAINT "_pages_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_content_blocks" ADD CONSTRAINT "_pages_v_blocks_list_content_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_content_blocks" ADD CONSTRAINT "_pages_v_blocks_list_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_list_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_content" ADD CONSTRAINT "_pages_v_blocks_list_content_field_image_id_media_id_fk" FOREIGN KEY ("field_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_list_content" ADD CONSTRAINT "_pages_v_blocks_list_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block" ADD CONSTRAINT "_pages_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_rrss" ADD CONSTRAINT "_pages_v_blocks_social_rrss_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_rrss" ADD CONSTRAINT "_pages_v_blocks_social_rrss_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social" ADD CONSTRAINT "_pages_v_blocks_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_list_content_blocks" ADD CONSTRAINT "_pages_v_blocks_simple_list_content_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_list_content_blocks" ADD CONSTRAINT "_pages_v_blocks_simple_list_content_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_simple_list_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_list_content" ADD CONSTRAINT "_pages_v_blocks_simple_list_content_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_simple_list_content" ADD CONSTRAINT "_pages_v_blocks_simple_list_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote_block_links" ADD CONSTRAINT "_pages_v_blocks_quote_block_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_quote_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote_block" ADD CONSTRAINT "_pages_v_blocks_quote_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote_block" ADD CONSTRAINT "_pages_v_blocks_quote_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_box_content_boxes" ADD CONSTRAINT "_pages_v_blocks_box_content_boxes_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_box_content_boxes" ADD CONSTRAINT "_pages_v_blocks_box_content_boxes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_box_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_box_content" ADD CONSTRAINT "_pages_v_blocks_box_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_post_carousel_block" ADD CONSTRAINT "_pages_v_blocks_post_carousel_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_frequently_questions_block_questions" ADD CONSTRAINT "_pages_v_blocks_frequently_questions_block_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_frequently_questions_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_frequently_questions_block" ADD CONSTRAINT "_pages_v_blocks_frequently_questions_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_frequently_questions_block" ADD CONSTRAINT "_pages_v_blocks_frequently_questions_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_list_block_blocks" ADD CONSTRAINT "_pages_v_blocks_service_list_block_blocks_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_list_block_blocks" ADD CONSTRAINT "_pages_v_blocks_service_list_block_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_list_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_list_block" ADD CONSTRAINT "_pages_v_blocks_service_list_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_accordions" ADD CONSTRAINT "_pages_v_blocks_service_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service" ADD CONSTRAINT "_pages_v_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_hero_links" ADD CONSTRAINT "services_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service_accordions" ADD CONSTRAINT "services_blocks_service_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_blocks_service" ADD CONSTRAINT "services_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services" ADD CONSTRAINT "services_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_rels" ADD CONSTRAINT "services_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_version_hero_links" ADD CONSTRAINT "_services_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service_accordions" ADD CONSTRAINT "_services_v_blocks_service_accordions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v_blocks_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_blocks_service" ADD CONSTRAINT "_services_v_blocks_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_parent_id_services_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v" ADD CONSTRAINT "_services_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_services_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_services_v_rels" ADD CONSTRAINT "_services_v_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options" ADD CONSTRAINT "forms_blocks_radio_options_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio_options" ADD CONSTRAINT "forms_blocks_radio_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_radio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_radio" ADD CONSTRAINT "forms_blocks_radio_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_nav_links_items_sub_items" ADD CONSTRAINT "header_nav_items_nav_links_items_sub_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_nav_links_items_sub_items" ADD CONSTRAINT "header_nav_items_nav_links_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_nav_links_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_nav_links_items" ADD CONSTRAINT "header_nav_items_nav_links_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_nav_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_nav_links" ADD CONSTRAINT "header_nav_items_nav_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items" ADD CONSTRAINT "footer_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_media_idx" ON "pages_blocks_cta" USING btree ("media_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_image_idx" ON "pages_blocks_content" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_content_section_name_idx" ON "pages_blocks_content" USING btree ("section_name");
  CREATE INDEX "pages_blocks_media_block_order_idx" ON "pages_blocks_media_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_block_parent_id_idx" ON "pages_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_block_path_idx" ON "pages_blocks_media_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_block_media_idx" ON "pages_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "pages_blocks_list_content_blocks_order_idx" ON "pages_blocks_list_content_blocks" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_content_blocks_parent_id_idx" ON "pages_blocks_list_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_content_blocks_media_idx" ON "pages_blocks_list_content_blocks" USING btree ("media_id");
  CREATE INDEX "pages_blocks_list_content_order_idx" ON "pages_blocks_list_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_list_content_parent_id_idx" ON "pages_blocks_list_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_list_content_path_idx" ON "pages_blocks_list_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_list_content_field_image_idx" ON "pages_blocks_list_content" USING btree ("field_image_id");
  CREATE UNIQUE INDEX "pages_blocks_list_content_section_name_idx" ON "pages_blocks_list_content" USING btree ("section_name");
  CREATE INDEX "pages_blocks_form_block_order_idx" ON "pages_blocks_form_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_block_parent_id_idx" ON "pages_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_block_path_idx" ON "pages_blocks_form_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_block_form_idx" ON "pages_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "pages_blocks_social_rrss_order_idx" ON "pages_blocks_social_rrss" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_rrss_parent_id_idx" ON "pages_blocks_social_rrss" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_rrss_icon_idx" ON "pages_blocks_social_rrss" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_social_order_idx" ON "pages_blocks_social" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_parent_id_idx" ON "pages_blocks_social" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_path_idx" ON "pages_blocks_social" USING btree ("_path");
  CREATE INDEX "pages_blocks_simple_list_content_blocks_order_idx" ON "pages_blocks_simple_list_content_blocks" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_list_content_blocks_parent_id_idx" ON "pages_blocks_simple_list_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_list_content_blocks_media_idx" ON "pages_blocks_simple_list_content_blocks" USING btree ("media_id");
  CREATE INDEX "pages_blocks_simple_list_content_order_idx" ON "pages_blocks_simple_list_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_simple_list_content_parent_id_idx" ON "pages_blocks_simple_list_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_simple_list_content_path_idx" ON "pages_blocks_simple_list_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_simple_list_content_image_idx" ON "pages_blocks_simple_list_content" USING btree ("image_id");
  CREATE INDEX "pages_blocks_quote_block_links_order_idx" ON "pages_blocks_quote_block_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_block_links_parent_id_idx" ON "pages_blocks_quote_block_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_block_order_idx" ON "pages_blocks_quote_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_block_parent_id_idx" ON "pages_blocks_quote_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_block_path_idx" ON "pages_blocks_quote_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_quote_block_image_idx" ON "pages_blocks_quote_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_quote_block_section_name_idx" ON "pages_blocks_quote_block" USING btree ("section_name");
  CREATE INDEX "pages_blocks_box_content_boxes_order_idx" ON "pages_blocks_box_content_boxes" USING btree ("_order");
  CREATE INDEX "pages_blocks_box_content_boxes_parent_id_idx" ON "pages_blocks_box_content_boxes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_box_content_boxes_media_idx" ON "pages_blocks_box_content_boxes" USING btree ("media_id");
  CREATE INDEX "pages_blocks_box_content_order_idx" ON "pages_blocks_box_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_box_content_parent_id_idx" ON "pages_blocks_box_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_box_content_path_idx" ON "pages_blocks_box_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_post_carousel_block_order_idx" ON "pages_blocks_post_carousel_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_post_carousel_block_parent_id_idx" ON "pages_blocks_post_carousel_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_post_carousel_block_path_idx" ON "pages_blocks_post_carousel_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_frequently_questions_block_questions_order_idx" ON "pages_blocks_frequently_questions_block_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_frequently_questions_block_questions_parent_id_idx" ON "pages_blocks_frequently_questions_block_questions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_frequently_questions_block_order_idx" ON "pages_blocks_frequently_questions_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_frequently_questions_block_parent_id_idx" ON "pages_blocks_frequently_questions_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_frequently_questions_block_path_idx" ON "pages_blocks_frequently_questions_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_frequently_questions_block_image_idx" ON "pages_blocks_frequently_questions_block" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_blocks_frequently_questions_block_section_name_idx" ON "pages_blocks_frequently_questions_block" USING btree ("section_name");
  CREATE INDEX "pages_blocks_service_list_block_blocks_order_idx" ON "pages_blocks_service_list_block_blocks" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_list_block_blocks_parent_id_idx" ON "pages_blocks_service_list_block_blocks" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_list_block_blocks_media_idx" ON "pages_blocks_service_list_block_blocks" USING btree ("media_id");
  CREATE INDEX "pages_blocks_service_list_block_order_idx" ON "pages_blocks_service_list_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_list_block_parent_id_idx" ON "pages_blocks_service_list_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_list_block_path_idx" ON "pages_blocks_service_list_block" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_service_list_block_section_name_idx" ON "pages_blocks_service_list_block" USING btree ("section_name");
  CREATE INDEX "pages_blocks_service_accordions_order_idx" ON "pages_blocks_service_accordions" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_accordions_parent_id_idx" ON "pages_blocks_service_accordions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_order_idx" ON "pages_blocks_service" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_parent_id_idx" ON "pages_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_path_idx" ON "pages_blocks_service" USING btree ("_path");
  CREATE INDEX "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_services_id_idx" ON "pages_rels" USING btree ("services_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_media_idx" ON "_pages_v_blocks_cta" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_image_idx" ON "_pages_v_blocks_content" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_content_section_name_idx" ON "_pages_v_blocks_content" USING btree ("section_name");
  CREATE INDEX "_pages_v_blocks_media_block_order_idx" ON "_pages_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_block_parent_id_idx" ON "_pages_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_block_path_idx" ON "_pages_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_block_media_idx" ON "_pages_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_list_content_blocks_order_idx" ON "_pages_v_blocks_list_content_blocks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_content_blocks_parent_id_idx" ON "_pages_v_blocks_list_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_content_blocks_media_idx" ON "_pages_v_blocks_list_content_blocks" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_list_content_order_idx" ON "_pages_v_blocks_list_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_list_content_parent_id_idx" ON "_pages_v_blocks_list_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_list_content_path_idx" ON "_pages_v_blocks_list_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_list_content_field_image_idx" ON "_pages_v_blocks_list_content" USING btree ("field_image_id");
  CREATE INDEX "_pages_v_blocks_list_content_section_name_idx" ON "_pages_v_blocks_list_content" USING btree ("section_name");
  CREATE INDEX "_pages_v_blocks_form_block_order_idx" ON "_pages_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_block_parent_id_idx" ON "_pages_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_block_path_idx" ON "_pages_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_block_form_idx" ON "_pages_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_social_rrss_order_idx" ON "_pages_v_blocks_social_rrss" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_rrss_parent_id_idx" ON "_pages_v_blocks_social_rrss" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_rrss_icon_idx" ON "_pages_v_blocks_social_rrss" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_social_order_idx" ON "_pages_v_blocks_social" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_parent_id_idx" ON "_pages_v_blocks_social" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_path_idx" ON "_pages_v_blocks_social" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_simple_list_content_blocks_order_idx" ON "_pages_v_blocks_simple_list_content_blocks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_list_content_blocks_parent_id_idx" ON "_pages_v_blocks_simple_list_content_blocks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_list_content_blocks_media_idx" ON "_pages_v_blocks_simple_list_content_blocks" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_simple_list_content_order_idx" ON "_pages_v_blocks_simple_list_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_simple_list_content_parent_id_idx" ON "_pages_v_blocks_simple_list_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_simple_list_content_path_idx" ON "_pages_v_blocks_simple_list_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_simple_list_content_image_idx" ON "_pages_v_blocks_simple_list_content" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_quote_block_links_order_idx" ON "_pages_v_blocks_quote_block_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_block_links_parent_id_idx" ON "_pages_v_blocks_quote_block_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_block_order_idx" ON "_pages_v_blocks_quote_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_block_parent_id_idx" ON "_pages_v_blocks_quote_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_block_path_idx" ON "_pages_v_blocks_quote_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_quote_block_image_idx" ON "_pages_v_blocks_quote_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_quote_block_section_name_idx" ON "_pages_v_blocks_quote_block" USING btree ("section_name");
  CREATE INDEX "_pages_v_blocks_box_content_boxes_order_idx" ON "_pages_v_blocks_box_content_boxes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_box_content_boxes_parent_id_idx" ON "_pages_v_blocks_box_content_boxes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_box_content_boxes_media_idx" ON "_pages_v_blocks_box_content_boxes" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_box_content_order_idx" ON "_pages_v_blocks_box_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_box_content_parent_id_idx" ON "_pages_v_blocks_box_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_box_content_path_idx" ON "_pages_v_blocks_box_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_post_carousel_block_order_idx" ON "_pages_v_blocks_post_carousel_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_post_carousel_block_parent_id_idx" ON "_pages_v_blocks_post_carousel_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_post_carousel_block_path_idx" ON "_pages_v_blocks_post_carousel_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_questions_order_idx" ON "_pages_v_blocks_frequently_questions_block_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_questions_parent_id_idx" ON "_pages_v_blocks_frequently_questions_block_questions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_order_idx" ON "_pages_v_blocks_frequently_questions_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_parent_id_idx" ON "_pages_v_blocks_frequently_questions_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_path_idx" ON "_pages_v_blocks_frequently_questions_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_image_idx" ON "_pages_v_blocks_frequently_questions_block" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_frequently_questions_block_section_name_idx" ON "_pages_v_blocks_frequently_questions_block" USING btree ("section_name");
  CREATE INDEX "_pages_v_blocks_service_list_block_blocks_order_idx" ON "_pages_v_blocks_service_list_block_blocks" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_list_block_blocks_parent_id_idx" ON "_pages_v_blocks_service_list_block_blocks" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_list_block_blocks_media_idx" ON "_pages_v_blocks_service_list_block_blocks" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_service_list_block_order_idx" ON "_pages_v_blocks_service_list_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_list_block_parent_id_idx" ON "_pages_v_blocks_service_list_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_list_block_path_idx" ON "_pages_v_blocks_service_list_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_list_block_section_name_idx" ON "_pages_v_blocks_service_list_block" USING btree ("section_name");
  CREATE INDEX "_pages_v_blocks_service_accordions_order_idx" ON "_pages_v_blocks_service_accordions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_accordions_parent_id_idx" ON "_pages_v_blocks_service_accordions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_order_idx" ON "_pages_v_blocks_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_parent_id_idx" ON "_pages_v_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_path_idx" ON "_pages_v_blocks_service" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_services_id_idx" ON "_pages_v_rels" USING btree ("services_id");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "services_hero_links_order_idx" ON "services_hero_links" USING btree ("_order");
  CREATE INDEX "services_hero_links_parent_id_idx" ON "services_hero_links" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_accordions_order_idx" ON "services_blocks_service_accordions" USING btree ("_order");
  CREATE INDEX "services_blocks_service_accordions_parent_id_idx" ON "services_blocks_service_accordions" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_order_idx" ON "services_blocks_service" USING btree ("_order");
  CREATE INDEX "services_blocks_service_parent_id_idx" ON "services_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "services_blocks_service_path_idx" ON "services_blocks_service" USING btree ("_path");
  CREATE INDEX "services_hero_hero_media_idx" ON "services" USING btree ("hero_media_id");
  CREATE INDEX "services_meta_meta_image_idx" ON "services" USING btree ("meta_image_id");
  CREATE INDEX "services_slug_idx" ON "services" USING btree ("slug");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE INDEX "services__status_idx" ON "services" USING btree ("_status");
  CREATE INDEX "services_rels_order_idx" ON "services_rels" USING btree ("order");
  CREATE INDEX "services_rels_parent_idx" ON "services_rels" USING btree ("parent_id");
  CREATE INDEX "services_rels_path_idx" ON "services_rels" USING btree ("path");
  CREATE INDEX "services_rels_pages_id_idx" ON "services_rels" USING btree ("pages_id");
  CREATE INDEX "services_rels_posts_id_idx" ON "services_rels" USING btree ("posts_id");
  CREATE INDEX "services_rels_services_id_idx" ON "services_rels" USING btree ("services_id");
  CREATE INDEX "_services_v_version_hero_links_order_idx" ON "_services_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_services_v_version_hero_links_parent_id_idx" ON "_services_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_accordions_order_idx" ON "_services_v_blocks_service_accordions" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_accordions_parent_id_idx" ON "_services_v_blocks_service_accordions" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_order_idx" ON "_services_v_blocks_service" USING btree ("_order");
  CREATE INDEX "_services_v_blocks_service_parent_id_idx" ON "_services_v_blocks_service" USING btree ("_parent_id");
  CREATE INDEX "_services_v_blocks_service_path_idx" ON "_services_v_blocks_service" USING btree ("_path");
  CREATE INDEX "_services_v_parent_idx" ON "_services_v" USING btree ("parent_id");
  CREATE INDEX "_services_v_version_hero_version_hero_media_idx" ON "_services_v" USING btree ("version_hero_media_id");
  CREATE INDEX "_services_v_version_meta_version_meta_image_idx" ON "_services_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_services_v_version_version_slug_idx" ON "_services_v" USING btree ("version_slug");
  CREATE INDEX "_services_v_version_version_updated_at_idx" ON "_services_v" USING btree ("version_updated_at");
  CREATE INDEX "_services_v_version_version_created_at_idx" ON "_services_v" USING btree ("version_created_at");
  CREATE INDEX "_services_v_version_version__status_idx" ON "_services_v" USING btree ("version__status");
  CREATE INDEX "_services_v_created_at_idx" ON "_services_v" USING btree ("created_at");
  CREATE INDEX "_services_v_updated_at_idx" ON "_services_v" USING btree ("updated_at");
  CREATE INDEX "_services_v_latest_idx" ON "_services_v" USING btree ("latest");
  CREATE INDEX "_services_v_autosave_idx" ON "_services_v" USING btree ("autosave");
  CREATE INDEX "_services_v_rels_order_idx" ON "_services_v_rels" USING btree ("order");
  CREATE INDEX "_services_v_rels_parent_idx" ON "_services_v_rels" USING btree ("parent_id");
  CREATE INDEX "_services_v_rels_path_idx" ON "_services_v_rels" USING btree ("path");
  CREATE INDEX "_services_v_rels_pages_id_idx" ON "_services_v_rels" USING btree ("pages_id");
  CREATE INDEX "_services_v_rels_posts_id_idx" ON "_services_v_rels" USING btree ("posts_id");
  CREATE INDEX "_services_v_rels_services_id_idx" ON "_services_v_rels" USING btree ("services_id");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "videos_filename_idx" ON "videos" USING btree ("filename");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_blocks_radio_options_order_idx" ON "forms_blocks_radio_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_options_parent_id_idx" ON "forms_blocks_radio_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_options_image_idx" ON "forms_blocks_radio_options" USING btree ("image_id");
  CREATE INDEX "forms_blocks_radio_order_idx" ON "forms_blocks_radio" USING btree ("_order");
  CREATE INDEX "forms_blocks_radio_parent_id_idx" ON "forms_blocks_radio" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_radio_path_idx" ON "forms_blocks_radio" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_nav_links_items_sub_items_order_idx" ON "header_nav_items_nav_links_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_nav_links_items_sub_items_parent_id_idx" ON "header_nav_items_nav_links_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_nav_links_items_sub_items_image_idx" ON "header_nav_items_nav_links_items_sub_items" USING btree ("image_id");
  CREATE INDEX "header_nav_items_nav_links_items_order_idx" ON "header_nav_items_nav_links_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_nav_links_items_parent_id_idx" ON "header_nav_items_nav_links_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_nav_links_order_idx" ON "header_nav_items_nav_links" USING btree ("_order");
  CREATE INDEX "header_nav_items_nav_links_parent_id_idx" ON "header_nav_items_nav_links" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "header_rels_services_id_idx" ON "header_rels" USING btree ("services_id");
  CREATE INDEX "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
  CREATE INDEX "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_services_id_idx" ON "footer_rels" USING btree ("services_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media_block" CASCADE;
  DROP TABLE "pages_blocks_list_content_blocks" CASCADE;
  DROP TABLE "pages_blocks_list_content" CASCADE;
  DROP TABLE "pages_blocks_form_block" CASCADE;
  DROP TABLE "pages_blocks_social_rrss" CASCADE;
  DROP TABLE "pages_blocks_social" CASCADE;
  DROP TABLE "pages_blocks_simple_list_content_blocks" CASCADE;
  DROP TABLE "pages_blocks_simple_list_content" CASCADE;
  DROP TABLE "pages_blocks_quote_block_links" CASCADE;
  DROP TABLE "pages_blocks_quote_block" CASCADE;
  DROP TABLE "pages_blocks_box_content_boxes" CASCADE;
  DROP TABLE "pages_blocks_box_content" CASCADE;
  DROP TABLE "pages_blocks_post_carousel_block" CASCADE;
  DROP TABLE "pages_blocks_frequently_questions_block_questions" CASCADE;
  DROP TABLE "pages_blocks_frequently_questions_block" CASCADE;
  DROP TABLE "pages_blocks_service_list_block_blocks" CASCADE;
  DROP TABLE "pages_blocks_service_list_block" CASCADE;
  DROP TABLE "pages_blocks_service_accordions" CASCADE;
  DROP TABLE "pages_blocks_service" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block" CASCADE;
  DROP TABLE "_pages_v_blocks_list_content_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_list_content" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block" CASCADE;
  DROP TABLE "_pages_v_blocks_social_rrss" CASCADE;
  DROP TABLE "_pages_v_blocks_social" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_list_content_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_simple_list_content" CASCADE;
  DROP TABLE "_pages_v_blocks_quote_block_links" CASCADE;
  DROP TABLE "_pages_v_blocks_quote_block" CASCADE;
  DROP TABLE "_pages_v_blocks_box_content_boxes" CASCADE;
  DROP TABLE "_pages_v_blocks_box_content" CASCADE;
  DROP TABLE "_pages_v_blocks_post_carousel_block" CASCADE;
  DROP TABLE "_pages_v_blocks_frequently_questions_block_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_frequently_questions_block" CASCADE;
  DROP TABLE "_pages_v_blocks_service_list_block_blocks" CASCADE;
  DROP TABLE "_pages_v_blocks_service_list_block" CASCADE;
  DROP TABLE "_pages_v_blocks_service_accordions" CASCADE;
  DROP TABLE "_pages_v_blocks_service" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "services_hero_links" CASCADE;
  DROP TABLE "services_blocks_service_accordions" CASCADE;
  DROP TABLE "services_blocks_service" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_rels" CASCADE;
  DROP TABLE "_services_v_version_hero_links" CASCADE;
  DROP TABLE "_services_v_blocks_service_accordions" CASCADE;
  DROP TABLE "_services_v_blocks_service" CASCADE;
  DROP TABLE "_services_v" CASCADE;
  DROP TABLE "_services_v_rels" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_radio_options" CASCADE;
  DROP TABLE "forms_blocks_radio" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_nav_links_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items_nav_links_items" CASCADE;
  DROP TABLE "header_nav_items_nav_links" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_nav_items" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TYPE "public"."enum_pages_hero_links_link_type";
  DROP TYPE "public"."enum_pages_hero_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_cta_separator_type";
  DROP TYPE "public"."enum_pages_blocks_cta_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_content_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_content_separator_type";
  DROP TYPE "public"."enum_pages_blocks_content_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_list_content_blocks_link_type";
  DROP TYPE "public"."enum_pages_blocks_list_content_blocks_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_list_content_blocks_color";
  DROP TYPE "public"."enum_pages_blocks_list_content_separator_type";
  DROP TYPE "public"."enum_pages_blocks_list_content_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_form_block_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_form_block_separator_type";
  DROP TYPE "public"."enum_pages_blocks_social_rrss_link_type";
  DROP TYPE "public"."enum_pages_blocks_simple_list_content_blocks_color";
  DROP TYPE "public"."enum_pages_blocks_simple_list_content_separator_type";
  DROP TYPE "public"."enum_pages_blocks_simple_list_content_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_quote_block_links_link_type";
  DROP TYPE "public"."enum_pages_blocks_quote_block_links_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_quote_block_separator_type";
  DROP TYPE "public"."enum_pages_blocks_post_carousel_block_separator_type";
  DROP TYPE "public"."enum_pages_blocks_post_carousel_block_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_service_list_block_blocks_link_type";
  DROP TYPE "public"."enum_pages_blocks_service_list_block_blocks_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_service_list_block_separator_type";
  DROP TYPE "public"."enum_pages_blocks_service_list_block_dark_mode";
  DROP TYPE "public"."enum_pages_blocks_service_separator_type";
  DROP TYPE "public"."enum_pages_blocks_service_dark_mode";
  DROP TYPE "public"."enum_pages_hero_separator_type";
  DROP TYPE "public"."enum_pages_hero_dark_mode";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__pages_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_cta_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_cta_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_content_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_list_content_blocks_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_content_blocks_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_list_content_blocks_color";
  DROP TYPE "public"."enum__pages_v_blocks_list_content_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_list_content_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_form_block_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_social_rrss_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_simple_list_content_blocks_color";
  DROP TYPE "public"."enum__pages_v_blocks_simple_list_content_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_simple_list_content_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_quote_block_links_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_quote_block_links_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_quote_block_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_post_carousel_block_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_post_carousel_block_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_service_list_block_blocks_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_list_block_blocks_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_service_list_block_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_list_block_dark_mode";
  DROP TYPE "public"."enum__pages_v_blocks_service_separator_type";
  DROP TYPE "public"."enum__pages_v_blocks_service_dark_mode";
  DROP TYPE "public"."enum__pages_v_version_hero_separator_type";
  DROP TYPE "public"."enum__pages_v_version_hero_dark_mode";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_services_hero_links_link_type";
  DROP TYPE "public"."enum_services_hero_links_link_appearance";
  DROP TYPE "public"."enum_services_blocks_service_separator_type";
  DROP TYPE "public"."enum_services_blocks_service_dark_mode";
  DROP TYPE "public"."enum_services_hero_separator_type";
  DROP TYPE "public"."enum_services_hero_dark_mode";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum__services_v_version_hero_links_link_type";
  DROP TYPE "public"."enum__services_v_version_hero_links_link_appearance";
  DROP TYPE "public"."enum__services_v_blocks_service_separator_type";
  DROP TYPE "public"."enum__services_v_blocks_service_dark_mode";
  DROP TYPE "public"."enum__services_v_version_hero_separator_type";
  DROP TYPE "public"."enum__services_v_version_hero_dark_mode";
  DROP TYPE "public"."enum__services_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_nav_links_items_sub_items_link_type";
  DROP TYPE "public"."enum_header_nav_items_nav_links_items_link_type";
  DROP TYPE "public"."enum_footer_nav_items_link_type";
  DROP TYPE "public"."enum_footer_separator_type";
  DROP TYPE "public"."enum_footer_dark_mode";`)
}
