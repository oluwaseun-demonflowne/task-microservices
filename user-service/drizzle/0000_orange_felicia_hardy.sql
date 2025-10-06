CREATE TABLE "UserSchema" (
	"id" uuid DEFAULT gen_random_uuid(),
	"email" text NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "UserSchema_id_unique" UNIQUE("id"),
	CONSTRAINT "UserSchema_email_unique" UNIQUE("email")
);
