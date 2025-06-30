-- CreateTable
CREATE TABLE "Board" (
    "boardId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Category" TEXT NOT NULL,
    "Author" TEXT,
    "img" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("boardId")
);

-- CreateTable
CREATE TABLE "Card" (
    "cardId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "cardDescription" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "owner" TEXT,
    "voteCount" INTEGER NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("cardId")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("boardId") ON DELETE CASCADE ON UPDATE CASCADE;
