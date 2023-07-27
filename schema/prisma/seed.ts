import { PrismaClient } from "@prisma/client";
import { countries } from "../src/geonames.js";

const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});

async function main() {
  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.ISO },
      update: {
        code: country.ISO,
        name: country.Country,
        alpha3: country.ISO3,
        numeric: country["ISO-Numeric"],
        tld: country.tld,
      },
      create: {
        code: country.ISO,
        name: country.Country,
        alpha3: country.ISO3,
        numeric: country["ISO-Numeric"],
        tld: country.tld,
      },
    });
    console.log("upsert country", country.Country);
  }

  for (const c of countries) {
    const neighbours = c.neighbours.split(",").filter((n) => n.length);
    if (neighbours.length > 0) {
      console.log("update neighbours", c.ISO, neighbours);
      await prisma.country.update({
        where: {
          code: c.ISO,
        },
        data: {
          neighbours: {
            connect: neighbours.map((n) => ({
              code: n,
            })),
          },
        },
        include: {
          neighbours: true,
        },
      });
    }
  }
}

await main();
await prisma.$disconnect();
