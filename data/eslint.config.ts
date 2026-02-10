import local from '@private/eslint-config'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['src/countries.ts'],
  },
  ...local,
])
