import SchemaBuilder from "@pothos/core";
import { PrismaClient } from "@prisma/client";
import PrismaPlugin from "@pothos/plugin-prisma";
import RelayPlugin from "@pothos/plugin-relay";
import type PrismaTypes from "@pothos/plugin-prisma/generated";

const prisma = new PrismaClient({
  log: ["query"],
});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [RelayPlugin, PrismaPlugin],
  relayOptions: {
    // These will become the defaults in the next major version
    clientMutationId: "omit",
    cursorType: "ID",
  },
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: true,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

const Country = builder.prismaNode("Country", {
  // Optional name for the object, defaults to the name of the prisma model
  //name: "Country",
  id: { field: "code" },
  fields: (t) => ({
    code: t.exposeID("code"),
    name: t.exposeString("name"),
  }),
});

builder.queryType({
  description: "Queries",
  fields: (t) => ({
    countries: t.field({
      type: [Country],
      description: "All countries",
      resolve: () => prisma.country.findMany(),
    }),
    posts: t.prismaConnection(
      {
        type: Country,
        cursor: "code",
        resolve: (query) => prisma.country.findMany({ ...query }),
      },
      {}, // optional options for the Connection type
      {} // optional options for the Edge type),
    ),
  }),
});

export { builder };
