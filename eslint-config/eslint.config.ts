import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import ts from 'typescript-eslint'
import unicorn from 'eslint-plugin-unicorn'
import jsdoc from 'eslint-plugin-jsdoc'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig(
  {
    ignores: ['dist/', '.turbo/', '.nitro/', '.output/'],
  },

  // javascript
  js.configs.recommended,
  {
    rules: {
      // "no-unused-vars": "off",
      // "no-undef": "off",
    },
  },

  // typescript
  ts.configs.recommended,
  {
    rules: {
      // "@typescript-eslint/no-unused-vars": "warn",
      // "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  // unicorn
  unicorn.configs.recommended,
  {
    rules: {
      // "unicon/no-unused-vars": "warn",
    },
  },

  // jsdoc
  jsdoc.configs['flat/recommended-typescript'],
  {
    rules: {
      // "jsdoc/check-alignment": "warn",
    },
  },

  // stylistic
  stylistic.configs.recommended,
)
