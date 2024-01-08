import SchemaBuilder from "@pothos/core";
import { GraphQLSchema } from "graphql";
import { countries, GeoCountry } from "@bicou/countries-server-data";

// build schema with pothos
const builder = new SchemaBuilder({});

const Country = builder.objectRef<GeoCountry>("Country");

export function buildSchema(version: string): GraphQLSchema {
  builder.objectType(Country, {
    description: "A country record",
    fields: (t) => ({
      code: t.exposeID("ISO", { description: "ISO code" }),
      name: t.exposeString("Country", { description: "Name of country" }),
      alpha3: t.exposeString("ISO3", { description: "Alpha‑3 code" }),
      numeric: t.exposeString("ISO-Numeric", { description: "Numeric" }),
      tld: t.exposeString("tld"),
      neighbours: t.field({
        type: [Country],
        description: "Neighbours countries",
        resolve: (parent) => {
          return countries.filter((c) => parent.neighbours.includes(c.ISO));
        },
      }),
    }),
  });

  builder.queryType({
    description: "Queries",
    fields: (t) => ({
      version: t.string({
        description: "Package version",
        resolve: () => version,
      }),
      countries: t.field({
        type: [Country],
        description: "All countries",
        resolve: () => countries,
      }),
      country: t.field({
        type: Country,
        description: "Country by code",
        nullable: true,
        args: {
          code: t.arg.id({
            required: true,
          }),
        },
        resolve: (_, { code }) => countries.find((c) => c.ISO == code),
      }),
    }),
  });

  return builder.toSchema();
}
