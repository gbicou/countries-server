import { builder, prisma } from "../builder.js";

const Country = builder.prismaNode("Country", {
  description: "A country record",
  id: { field: "code" },
  fields: (t) => ({
    code: t.exposeID("code"),
    name: t.exposeString("name"),
    alpha3: t.exposeString("alpha3"),
    numeric: t.exposeString("numeric"),
    tld: t.exposeString("tld"),
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
    countriesList: t.prismaConnection(
      {
        type: Country,
        cursor: "code",
        resolve: (query) => prisma.country.findMany({ ...query }),
      },
      {}, // optional options for the Connection type
      {} // optional options for the Edge type),
    ),
  }));
};
