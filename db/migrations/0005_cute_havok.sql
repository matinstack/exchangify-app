ALTER TABLE "cards" ALTER COLUMN "card_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."card_type";--> statement-breakpoint
CREATE TYPE "public"."card_type" AS ENUM('visa', 'masterCard', 'iranianBank');--> statement-breakpoint
ALTER TABLE "cards" ALTER COLUMN "card_type" SET DATA TYPE "public"."card_type" USING "card_type"::"public"."card_type";--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "card_number" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "card_color" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_card_number_unique" UNIQUE("card_number");