-- CreateTable
CREATE TABLE "_Neighbours" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Neighbours_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Neighbours_B_fkey" FOREIGN KEY ("B") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_Neighbours_AB_unique" ON "_Neighbours"("A", "B");

-- CreateIndex
CREATE INDEX "_Neighbours_B_index" ON "_Neighbours"("B");
