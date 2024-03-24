module.exports = {
    env: { browser: true, es2020: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: ['react-refresh', 'react-hooks'],
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        'react-refresh/only-export-components': 'warn',
        'react-hooks/exhaustive-deps': 0,
    },
};
