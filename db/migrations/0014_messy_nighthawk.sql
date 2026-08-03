ALTER TABLE "transactions" ADD COLUMN "rial_amount" numeric(14, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "usd_amount" numeric(14, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "euro_amount" numeric(14, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" DROP COLUMN "rialAmount";