// @ts-check
import globals from 'globals';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'prefer-promise-reject-errors': 'error',
      'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
      'space-before-blocks': ['error', 'always']
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.es2024
    }
  },
  {
    files: ['userscripts/*/src/main.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        main_css: 'readonly',
        translations: 'writable',
        userjs: 'writable',
        ...globals.browser,
        ...globals.greasemonkey
      }
    }
  },
  {
    files: ['userscripts/*/src/header.js'],
    languageOptions: {
      sourceType: 'script',
      globals: {
        code: 'readonly',
        metadata: 'readonly',
        languageList: 'readonly',
        translations: 'readonly',
        ...globals.browser
      }
    },
    rules: {
      quotes: 'off',
      'no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  {
    files: ['tools/*.js', 'utils/**/*.js'],
    languageOptions: {
      globals: globals.node
    }
  }
]);
