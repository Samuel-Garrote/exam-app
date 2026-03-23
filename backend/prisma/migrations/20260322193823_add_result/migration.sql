-- CreateTable
CREATE TABLE "Result" (
    "id" SERIAL NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "totalQuestions" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);
