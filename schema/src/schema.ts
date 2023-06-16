import { GraphQLSchema } from "graphql";
import { builder } from "./builder.js";

import version from "./types/version.js";
version();

import country from "./types/country.js";
country();

builder.queryType({
  description: "Queries",
});

export const schema: GraphQLSchema = builder.toSchema();
