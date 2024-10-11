/* eslint-env node */

import local from '@private/eslint-config'

export default [
  {
    ignores: ['src/countries.ts'],
  },
  ...local,
]
