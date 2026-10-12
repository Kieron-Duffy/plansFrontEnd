import { interstellarEslintPlugin } from '@interstellar/eslint-config-clean-code';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  interstellarEslintPlugin.configs.react,
  {
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          packageDir: ['./', 'coewright/'],
        },
      ],
      'import-x/prefer-default-export': 'off',
      'import-x/no-rename-default': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
    },
  },
]);
