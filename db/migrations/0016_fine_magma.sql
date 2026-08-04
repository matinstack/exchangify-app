ALTER TABLE "user_settings" ALTER COLUMN "currency" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "card_currency" "currency" NOT NULL;