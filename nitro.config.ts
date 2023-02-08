import { defineNitroConfig } from "nitropack";
import dsv from "@rollup/plugin-dsv";
export default defineNitroConfig({
  srcDir: "./src",
  rollupConfig: {
    plugins: [dsv()],
  },
});
