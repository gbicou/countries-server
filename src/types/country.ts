import { builder, prisma } from "../builder.js";

const Country = builder.prismaObject("Country", {
  description: "A country record",
  fields: (t) => ({
    code: t.exposeID("code", { description: "ISO code" }),
    name: t.exposeString("name", { description: "Name of country" }),
    alpha3: t.exposeString("alpha3", { description: "Alpha‑3 code" }),
    numeric: t.exposeString("numeric", { description: "Numeric" }),
    tld: t.exposeString("tld", { description: "TLD" }),
    neighbours: t.relation("neighbours", { description: "Neighbours" }),
  }),
});

export default () => {
  builder.queryFields((t) => ({
    countries: t.prismaField({
      type: [Country],
      description: "All countries",
      resolve: (query) => prisma.country.findMany({ ...query }),
    }),
    country: t.prismaField({
      type: Country,
      description: "Country by code",
      nullable: true,
      args: {
        code: t.arg.id({
          required: true,
        }),
      },
      resolve: (query, _, { code }) => prisma.country.findUnique({ ...query, where: { code: code.toString() } }),
    }),
  }));
};
