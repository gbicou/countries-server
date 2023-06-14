import { GraphQLSchema } from "graphql";

import { builder } from "./builder.js";

export const schema: GraphQLSchema = builder.toSchema();
