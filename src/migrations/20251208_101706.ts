import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "content"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "content"."enum_universes_status" AS ENUM('draft', 'published');
  CREATE TYPE "content"."enum__universes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "content"."enum__universes_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "content"."enum_journeys_status" AS ENUM('draft', 'published');
  CREATE TYPE "content"."enum__journeys_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "content"."enum__journeys_v_published_locale" AS ENUM('fr', 'en');
  CREATE TABLE "content"."admins_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "content"."admins" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
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
  
  CREATE TABLE "content"."media" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"alt" varchar NOT NULL,
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
  
  CREATE TABLE "content"."universes" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "content"."enum_universes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "content"."universes_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_universes_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "content"."enum__universes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "content"."enum__universes_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "content"."_universes_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."chapters_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."quests" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."quests_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"task" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."habits" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"duration" numeric,
  	"eco2_reduced" numeric,
  	"money_saved" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."habits_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"task" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."quizzes_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "content"."quizzes_questions_locales" (
  	"question" varchar,
  	"answers" varchar,
  	"anwswer" numeric,
  	"explanation" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."quizzes" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."quizzes_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."lessons" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" uuid,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."lessons_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content"."journeys" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_journeys_journeys_order" varchar,
  	"universe_id" uuid,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "content"."enum_journeys_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "content"."journeys_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_chapters_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."_chapters_v_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_quests_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."_quests_v_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"task" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_habits_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"duration" numeric,
  	"eco2_reduced" numeric,
  	"money_saved" numeric,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."_habits_v_locales" (
  	"title" varchar,
  	"content" jsonb,
  	"task" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_quizzes_v_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "content"."_quizzes_v_questions_locales" (
  	"question" varchar,
  	"answers" varchar,
  	"anwswer" numeric,
  	"explanation" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_quizzes_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."_quizzes_v_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_lessons_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" uuid NOT NULL,
  	"_path" text NOT NULL,
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"image_id" uuid,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content"."_lessons_v_locales" (
  	"name" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."_journeys_v" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"parent_id" uuid,
  	"version__journeys_journeys_order" varchar,
  	"version_universe_id" uuid,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "content"."enum__journeys_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "content"."enum__journeys_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "content"."_journeys_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "content"."_locales" NOT NULL,
  	"_parent_id" uuid NOT NULL
  );
  
  CREATE TABLE "content"."payload_kv" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "content"."payload_locked_documents" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content"."payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" uuid,
  	"media_id" uuid,
  	"universes_id" uuid,
  	"journeys_id" uuid
  );
  
  CREATE TABLE "content"."payload_preferences" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "content"."payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" uuid NOT NULL,
  	"path" varchar NOT NULL,
  	"admins_id" uuid
  );
  
  CREATE TABLE "content"."payload_migrations" (
  	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "content"."admins_sessions" ADD CONSTRAINT "admins_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."universes_locales" ADD CONSTRAINT "universes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."universes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_universes_v" ADD CONSTRAINT "_universes_v_parent_id_universes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "content"."universes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."_universes_v_locales" ADD CONSTRAINT "_universes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_universes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."chapters" ADD CONSTRAINT "chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."chapters_locales" ADD CONSTRAINT "chapters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."chapters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quests" ADD CONSTRAINT "quests_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quests_locales" ADD CONSTRAINT "quests_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."quests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."habits" ADD CONSTRAINT "habits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."habits_locales" ADD CONSTRAINT "habits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."habits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quizzes_questions" ADD CONSTRAINT "quizzes_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quizzes_questions_locales" ADD CONSTRAINT "quizzes_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."quizzes_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quizzes" ADD CONSTRAINT "quizzes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."quizzes_locales" ADD CONSTRAINT "quizzes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."quizzes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."lessons" ADD CONSTRAINT "lessons_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "content"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."lessons" ADD CONSTRAINT "lessons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."lessons_locales" ADD CONSTRAINT "lessons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."journeys" ADD CONSTRAINT "journeys_universe_id_universes_id_fk" FOREIGN KEY ("universe_id") REFERENCES "content"."universes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."journeys_locales" ADD CONSTRAINT "journeys_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_chapters_v" ADD CONSTRAINT "_chapters_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_chapters_v_locales" ADD CONSTRAINT "_chapters_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_chapters_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quests_v" ADD CONSTRAINT "_quests_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quests_v_locales" ADD CONSTRAINT "_quests_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_quests_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_habits_v" ADD CONSTRAINT "_habits_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_habits_v_locales" ADD CONSTRAINT "_habits_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_habits_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quizzes_v_questions" ADD CONSTRAINT "_quizzes_v_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quizzes_v_questions_locales" ADD CONSTRAINT "_quizzes_v_questions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_quizzes_v_questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quizzes_v" ADD CONSTRAINT "_quizzes_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_quizzes_v_locales" ADD CONSTRAINT "_quizzes_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_quizzes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_lessons_v" ADD CONSTRAINT "_lessons_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "content"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."_lessons_v" ADD CONSTRAINT "_lessons_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_lessons_v_locales" ADD CONSTRAINT "_lessons_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_lessons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."_journeys_v" ADD CONSTRAINT "_journeys_v_parent_id_journeys_id_fk" FOREIGN KEY ("parent_id") REFERENCES "content"."journeys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."_journeys_v" ADD CONSTRAINT "_journeys_v_version_universe_id_universes_id_fk" FOREIGN KEY ("version_universe_id") REFERENCES "content"."universes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content"."_journeys_v_locales" ADD CONSTRAINT "_journeys_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "content"."_journeys_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "content"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "content"."admins"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "content"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_universes_fk" FOREIGN KEY ("universes_id") REFERENCES "content"."universes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "content"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "content"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_admins_fk" FOREIGN KEY ("admins_id") REFERENCES "content"."admins"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "admins_sessions_order_idx" ON "content"."admins_sessions" USING btree ("_order");
  CREATE INDEX "admins_sessions_parent_id_idx" ON "content"."admins_sessions" USING btree ("_parent_id");
  CREATE INDEX "admins_updated_at_idx" ON "content"."admins" USING btree ("updated_at");
  CREATE INDEX "admins_created_at_idx" ON "content"."admins" USING btree ("created_at");
  CREATE UNIQUE INDEX "admins_email_idx" ON "content"."admins" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "content"."media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "content"."media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "content"."media" USING btree ("filename");
  CREATE INDEX "universes_updated_at_idx" ON "content"."universes" USING btree ("updated_at");
  CREATE INDEX "universes_created_at_idx" ON "content"."universes" USING btree ("created_at");
  CREATE INDEX "universes__status_idx" ON "content"."universes" USING btree ("_status");
  CREATE UNIQUE INDEX "universes_locales_locale_parent_id_unique" ON "content"."universes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_universes_v_parent_idx" ON "content"."_universes_v" USING btree ("parent_id");
  CREATE INDEX "_universes_v_version_version_updated_at_idx" ON "content"."_universes_v" USING btree ("version_updated_at");
  CREATE INDEX "_universes_v_version_version_created_at_idx" ON "content"."_universes_v" USING btree ("version_created_at");
  CREATE INDEX "_universes_v_version_version__status_idx" ON "content"."_universes_v" USING btree ("version__status");
  CREATE INDEX "_universes_v_created_at_idx" ON "content"."_universes_v" USING btree ("created_at");
  CREATE INDEX "_universes_v_updated_at_idx" ON "content"."_universes_v" USING btree ("updated_at");
  CREATE INDEX "_universes_v_snapshot_idx" ON "content"."_universes_v" USING btree ("snapshot");
  CREATE INDEX "_universes_v_published_locale_idx" ON "content"."_universes_v" USING btree ("published_locale");
  CREATE INDEX "_universes_v_latest_idx" ON "content"."_universes_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_universes_v_locales_locale_parent_id_unique" ON "content"."_universes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "chapters_order_idx" ON "content"."chapters" USING btree ("_order");
  CREATE INDEX "chapters_parent_id_idx" ON "content"."chapters" USING btree ("_parent_id");
  CREATE INDEX "chapters_path_idx" ON "content"."chapters" USING btree ("_path");
  CREATE UNIQUE INDEX "chapters_locales_locale_parent_id_unique" ON "content"."chapters_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quests_order_idx" ON "content"."quests" USING btree ("_order");
  CREATE INDEX "quests_parent_id_idx" ON "content"."quests" USING btree ("_parent_id");
  CREATE INDEX "quests_path_idx" ON "content"."quests" USING btree ("_path");
  CREATE UNIQUE INDEX "quests_locales_locale_parent_id_unique" ON "content"."quests_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "habits_order_idx" ON "content"."habits" USING btree ("_order");
  CREATE INDEX "habits_parent_id_idx" ON "content"."habits" USING btree ("_parent_id");
  CREATE INDEX "habits_path_idx" ON "content"."habits" USING btree ("_path");
  CREATE UNIQUE INDEX "habits_locales_locale_parent_id_unique" ON "content"."habits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quizzes_questions_order_idx" ON "content"."quizzes_questions" USING btree ("_order");
  CREATE INDEX "quizzes_questions_parent_id_idx" ON "content"."quizzes_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "quizzes_questions_locales_locale_parent_id_unique" ON "content"."quizzes_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quizzes_order_idx" ON "content"."quizzes" USING btree ("_order");
  CREATE INDEX "quizzes_parent_id_idx" ON "content"."quizzes" USING btree ("_parent_id");
  CREATE INDEX "quizzes_path_idx" ON "content"."quizzes" USING btree ("_path");
  CREATE UNIQUE INDEX "quizzes_locales_locale_parent_id_unique" ON "content"."quizzes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "lessons_order_idx" ON "content"."lessons" USING btree ("_order");
  CREATE INDEX "lessons_parent_id_idx" ON "content"."lessons" USING btree ("_parent_id");
  CREATE INDEX "lessons_path_idx" ON "content"."lessons" USING btree ("_path");
  CREATE INDEX "lessons_image_idx" ON "content"."lessons" USING btree ("image_id");
  CREATE UNIQUE INDEX "lessons_locales_locale_parent_id_unique" ON "content"."lessons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journeys__journeys_journeys_order_idx" ON "content"."journeys" USING btree ("_journeys_journeys_order");
  CREATE INDEX "journeys_universe_idx" ON "content"."journeys" USING btree ("universe_id");
  CREATE INDEX "journeys_updated_at_idx" ON "content"."journeys" USING btree ("updated_at");
  CREATE INDEX "journeys_created_at_idx" ON "content"."journeys" USING btree ("created_at");
  CREATE INDEX "journeys__status_idx" ON "content"."journeys" USING btree ("_status");
  CREATE UNIQUE INDEX "journeys_locales_locale_parent_id_unique" ON "content"."journeys_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_chapters_v_order_idx" ON "content"."_chapters_v" USING btree ("_order");
  CREATE INDEX "_chapters_v_parent_id_idx" ON "content"."_chapters_v" USING btree ("_parent_id");
  CREATE INDEX "_chapters_v_path_idx" ON "content"."_chapters_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_chapters_v_locales_locale_parent_id_unique" ON "content"."_chapters_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_quests_v_order_idx" ON "content"."_quests_v" USING btree ("_order");
  CREATE INDEX "_quests_v_parent_id_idx" ON "content"."_quests_v" USING btree ("_parent_id");
  CREATE INDEX "_quests_v_path_idx" ON "content"."_quests_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_quests_v_locales_locale_parent_id_unique" ON "content"."_quests_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_habits_v_order_idx" ON "content"."_habits_v" USING btree ("_order");
  CREATE INDEX "_habits_v_parent_id_idx" ON "content"."_habits_v" USING btree ("_parent_id");
  CREATE INDEX "_habits_v_path_idx" ON "content"."_habits_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_habits_v_locales_locale_parent_id_unique" ON "content"."_habits_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_quizzes_v_questions_order_idx" ON "content"."_quizzes_v_questions" USING btree ("_order");
  CREATE INDEX "_quizzes_v_questions_parent_id_idx" ON "content"."_quizzes_v_questions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_quizzes_v_questions_locales_locale_parent_id_unique" ON "content"."_quizzes_v_questions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_quizzes_v_order_idx" ON "content"."_quizzes_v" USING btree ("_order");
  CREATE INDEX "_quizzes_v_parent_id_idx" ON "content"."_quizzes_v" USING btree ("_parent_id");
  CREATE INDEX "_quizzes_v_path_idx" ON "content"."_quizzes_v" USING btree ("_path");
  CREATE UNIQUE INDEX "_quizzes_v_locales_locale_parent_id_unique" ON "content"."_quizzes_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_lessons_v_order_idx" ON "content"."_lessons_v" USING btree ("_order");
  CREATE INDEX "_lessons_v_parent_id_idx" ON "content"."_lessons_v" USING btree ("_parent_id");
  CREATE INDEX "_lessons_v_path_idx" ON "content"."_lessons_v" USING btree ("_path");
  CREATE INDEX "_lessons_v_image_idx" ON "content"."_lessons_v" USING btree ("image_id");
  CREATE UNIQUE INDEX "_lessons_v_locales_locale_parent_id_unique" ON "content"."_lessons_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_journeys_v_parent_idx" ON "content"."_journeys_v" USING btree ("parent_id");
  CREATE INDEX "_journeys_v_version_version__journeys_journeys_order_idx" ON "content"."_journeys_v" USING btree ("version__journeys_journeys_order");
  CREATE INDEX "_journeys_v_version_version_universe_idx" ON "content"."_journeys_v" USING btree ("version_universe_id");
  CREATE INDEX "_journeys_v_version_version_updated_at_idx" ON "content"."_journeys_v" USING btree ("version_updated_at");
  CREATE INDEX "_journeys_v_version_version_created_at_idx" ON "content"."_journeys_v" USING btree ("version_created_at");
  CREATE INDEX "_journeys_v_version_version__status_idx" ON "content"."_journeys_v" USING btree ("version__status");
  CREATE INDEX "_journeys_v_created_at_idx" ON "content"."_journeys_v" USING btree ("created_at");
  CREATE INDEX "_journeys_v_updated_at_idx" ON "content"."_journeys_v" USING btree ("updated_at");
  CREATE INDEX "_journeys_v_snapshot_idx" ON "content"."_journeys_v" USING btree ("snapshot");
  CREATE INDEX "_journeys_v_published_locale_idx" ON "content"."_journeys_v" USING btree ("published_locale");
  CREATE INDEX "_journeys_v_latest_idx" ON "content"."_journeys_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_journeys_v_locales_locale_parent_id_unique" ON "content"."_journeys_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "content"."payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "content"."payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "content"."payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "content"."payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "content"."payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "content"."payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "content"."payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_admins_id_idx" ON "content"."payload_locked_documents_rels" USING btree ("admins_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "content"."payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_universes_id_idx" ON "content"."payload_locked_documents_rels" USING btree ("universes_id");
  CREATE INDEX "payload_locked_documents_rels_journeys_id_idx" ON "content"."payload_locked_documents_rels" USING btree ("journeys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "content"."payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "content"."payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "content"."payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "content"."payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "content"."payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "content"."payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_admins_id_idx" ON "content"."payload_preferences_rels" USING btree ("admins_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "content"."payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "content"."payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "content"."admins_sessions" CASCADE;
  DROP TABLE "content"."admins" CASCADE;
  DROP TABLE "content"."media" CASCADE;
  DROP TABLE "content"."universes" CASCADE;
  DROP TABLE "content"."universes_locales" CASCADE;
  DROP TABLE "content"."_universes_v" CASCADE;
  DROP TABLE "content"."_universes_v_locales" CASCADE;
  DROP TABLE "content"."chapters" CASCADE;
  DROP TABLE "content"."chapters_locales" CASCADE;
  DROP TABLE "content"."quests" CASCADE;
  DROP TABLE "content"."quests_locales" CASCADE;
  DROP TABLE "content"."habits" CASCADE;
  DROP TABLE "content"."habits_locales" CASCADE;
  DROP TABLE "content"."quizzes_questions" CASCADE;
  DROP TABLE "content"."quizzes_questions_locales" CASCADE;
  DROP TABLE "content"."quizzes" CASCADE;
  DROP TABLE "content"."quizzes_locales" CASCADE;
  DROP TABLE "content"."lessons" CASCADE;
  DROP TABLE "content"."lessons_locales" CASCADE;
  DROP TABLE "content"."journeys" CASCADE;
  DROP TABLE "content"."journeys_locales" CASCADE;
  DROP TABLE "content"."_chapters_v" CASCADE;
  DROP TABLE "content"."_chapters_v_locales" CASCADE;
  DROP TABLE "content"."_quests_v" CASCADE;
  DROP TABLE "content"."_quests_v_locales" CASCADE;
  DROP TABLE "content"."_habits_v" CASCADE;
  DROP TABLE "content"."_habits_v_locales" CASCADE;
  DROP TABLE "content"."_quizzes_v_questions" CASCADE;
  DROP TABLE "content"."_quizzes_v_questions_locales" CASCADE;
  DROP TABLE "content"."_quizzes_v" CASCADE;
  DROP TABLE "content"."_quizzes_v_locales" CASCADE;
  DROP TABLE "content"."_lessons_v" CASCADE;
  DROP TABLE "content"."_lessons_v_locales" CASCADE;
  DROP TABLE "content"."_journeys_v" CASCADE;
  DROP TABLE "content"."_journeys_v_locales" CASCADE;
  DROP TABLE "content"."payload_kv" CASCADE;
  DROP TABLE "content"."payload_locked_documents" CASCADE;
  DROP TABLE "content"."payload_locked_documents_rels" CASCADE;
  DROP TABLE "content"."payload_preferences" CASCADE;
  DROP TABLE "content"."payload_preferences_rels" CASCADE;
  DROP TABLE "content"."payload_migrations" CASCADE;
  DROP TYPE "content"."_locales";
  DROP TYPE "content"."enum_universes_status";
  DROP TYPE "content"."enum__universes_v_version_status";
  DROP TYPE "content"."enum__universes_v_published_locale";
  DROP TYPE "content"."enum_journeys_status";
  DROP TYPE "content"."enum__journeys_v_version_status";
  DROP TYPE "content"."enum__journeys_v_published_locale";`)
}
