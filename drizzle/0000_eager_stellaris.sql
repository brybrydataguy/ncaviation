CREATE TYPE "public"."plane_status" AS ENUM('sale', 'pending', 'sold');--> statement-breakpoint
CREATE TABLE "plane_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"plane_id" uuid NOT NULL,
	"image_url" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "planes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"price" integer NOT NULL,
	"status" "plane_status" DEFAULT 'sale' NOT NULL,
	"main_image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "plane_images" ADD CONSTRAINT "plane_images_plane_id_planes_id_fk" FOREIGN KEY ("plane_id") REFERENCES "public"."planes"("id") ON DELETE cascade ON UPDATE no action;