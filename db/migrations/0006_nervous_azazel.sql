CREATE TYPE "public"."entity_type" AS ENUM('transaction', 'account', 'budget', 'goal', 'category', 'user');--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "activity_action" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."activity_action";--> statement-breakpoint
CREATE TYPE "public"."activity_action" AS ENUM('signup', 'login', 'logout', 'password_changed', 'card_created', 'card_updated', 'card_deleted', 'profile_updated', 'currency_changed', 'theme_changed', 'transaction_created', 'transaction_updated', 'transaction_deleted', 'budget_created', 'budget_updated', 'budget_deleted', 'goal_created', 'goal_updated', 'goal_completed', 'category_created', 'category_updated', 'category_deleted');--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "activity_action" SET DATA TYPE "public"."activity_action" USING "activity_action"::"public"."activity_action";--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "currency" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user_settings" ALTER COLUMN "currency" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."currency";--> statement-breakpoint
CREATE TYPE "public"."currency" AS ENUM('IRR', 'EUR', 'USD', 'GBP', 'AED', 'TRY');--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "currency" SET DATA TYPE "public"."currency" USING "currency"::"public"."currency";--> statement-breakpoint
ALTER TABLE "user_settings" ALTER COLUMN "currency" SET DATA TYPE "public"."currency" USING "currency"::"public"."currency";--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "entity_type" SET DATA TYPE "public"."entity_type" USING "entity_type"::"public"."entity_type";--> statement-breakpoint
ALTER TABLE "activity_log" ALTER COLUMN "entity_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "currency" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "activity_user_created_idx" ON "activity_log" USING btree ("user_id","created_at");