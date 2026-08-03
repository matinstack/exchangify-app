CREATE TABLE "today_currency" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"euro_ratio" text NOT NULL,
	"usd_ratio" text NOT NULL,
	"usd_euro_ratio" text NOT NULL,
	"euro_usd_ratio" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "currency" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_settings" ALTER COLUMN "currency" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."currency";--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('IRR', 'EUR', 'USD');--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "currency" SET DATA TYPE "public"."currency" USING "currency"::"public"."currency";--> statement-breakpoint
ALTER TABLE "user_settings" ALTER COLUMN "currency" SET DATA TYPE "public"."currency" USING "currency"::"public"."currency";--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "rialAmount" numeric(14, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "euro_ratio" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "usd_ratio" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "usd_euro_ratio" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "euro_usd_ratio" text NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "amount";