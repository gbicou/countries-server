import { PrismaClient } from "@prisma/client";
import { countries } from "../src/geonames.js";

const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
});

async function main() {
  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.ISO },
      update: {},
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
}

await main();
await prisma.$disconnect();
