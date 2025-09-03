CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"options" jsonb,
	"answer" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "quiz" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"score" integer DEFAULT 0,
	"time_taken_in_seconds" integer DEFAULT 0,
	"submitted_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "quiz_answers" (
	"id" serial PRIMARY KEY NOT NULL,
	"quiz_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"chosen_answer" text NOT NULL,
	"is_correct" boolean NOT NULL,
	CONSTRAINT "quiz_answers_quiz_id_question_id_unique_constraint" UNIQUE("quiz_id","question_id")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"username" varchar(50),
	"password" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_quiz_id_quiz_id_fk" FOREIGN KEY ("quiz_id") REFERENCES "public"."quiz"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_answers" ADD CONSTRAINT "quiz_answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_email_index" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "user_username_index" ON "users" USING btree ("username");