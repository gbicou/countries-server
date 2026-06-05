import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/schema.ts'],
  dts: true,
  exports: { legacy: true },
})
