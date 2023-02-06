-- CreateTable
CREATE TABLE "Pet" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "specie" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "match" (
    "petId1" INTEGER NOT NULL,
    "petId2" INTEGER NOT NULL,
    "ownerInterest1" BOOLEAN,
    "ownerInterest2" BOOLEAN,
    "ownerId1" INTEGER,
    "ownerId2" INTEGER,

    CONSTRAINT "match_pkey" PRIMARY KEY ("petId1","petId2")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pet_ownerId_id_key" ON "Pet"("ownerId", "id");
