import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      js: js.configs.recommended,
    },
    rules: {
      // Ваши правила JS
    },
  },
  {
    name: 'vue',
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      vue: pluginVue,
    },
    rules: {
      // Ваши правила Vue
      'vue/multi-word-component-names': 'off', // Пример правила
    },
  },
]);
