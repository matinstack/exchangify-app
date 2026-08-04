CREATE TYPE "public"."notification_type_enum" AS ENUM('INFO', 'SUCCESS', 'WARNING', 'ERROR');--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7() NOT NULL,
	"user_id" text NOT NULL,
	"status" "report_status_enum" DEFAULT 'PENDING' NOT NULL,
	"priority" "priority_enum" NOT NULL,
	"subject" text NOT NULL,
	"description" text NOT NULL,
	"is_answered" boolean DEFAULT false NOT NULL,
	"admin_reply" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "is_read" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "is_read" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "type" "notification_type_enum" DEFAULT 'INFO' NOT NULL;--> statement-breakpoint
ALTER TABLE "notifications" ADD COLUMN "link" text;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;