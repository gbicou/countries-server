import { countries } from "./geonames.js";
import { prisma } from "./builder.js";

await prisma.country.deleteMany();
for (const c of countries) {
  await prisma.country.create({
    data: {
      code: c.ISO,
      name: c.Country,
      alpha3: c.ISO3,
      numeric: c["ISO-Numeric"],
      tld: c.tld,
    },
  });
}

for (const c of countries) {
  const neighbours = c.neighbours.split(",").filter((n) => n.length);
  if (neighbours.length > 0) {
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

await prisma.$disconnect();
