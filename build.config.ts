import { defineBuildConfig } from "unbuild";
import dsv from "@rollup/plugin-dsv";

export default defineBuildConfig({
  hooks: {
    "rollup:options": async (context, options) => {
      const plugins = await options.plugins;
      // @ts-ignore
      options.plugins = [...plugins, dsv()];
    },
  },
});
