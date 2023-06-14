import { builder } from "../builder.js";
import { version } from "../../package.json";

export default () => {
  builder.queryFields((t) => ({
    version: t.string({
      description: "Package version",
      resolve: () => version,
    }),
  }));
};
