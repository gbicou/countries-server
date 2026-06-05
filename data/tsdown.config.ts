import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/countries.ts'],
  dts: true,
  exports: { legacy: true },
})
