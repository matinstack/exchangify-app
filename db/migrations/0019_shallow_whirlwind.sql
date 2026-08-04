CREATE TYPE "public"."category_enum" AS ENUM('BUG', 'FEATURE', 'BILLING', 'OTHER');--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "category" "category_enum" NOT NULL;