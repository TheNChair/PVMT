module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:import/recommended'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh'],
    rules: {
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        indent: ['error', 4, { SwitchCase: 1 }],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'semi-spacing': ['error'],
        'comma-dangle': ['error', 'never'],
        'comma-spacing': 'error',
        'key-spacing': 'error',
        'arrow-spacing': 'error',
        'space-infix-ops': 'error',
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        camelcase: 'error',
        'new-cap': 'error',
        'space-before-blocks': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'no-var': 'error',
        'no-unreachable': 'error',
        'computed-property-spacing': ['error', 'never'],
        curly: ['error', 'all'],
        'no-unneeded-ternary': 'error',
        'no-trailing-spaces': 'error',
        'no-empty': 'error',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'react-hooks/exhaustive-deps': 'warn'
    },
    settings: {
        'import/resolver': {
            typescript: {
                project: ['tsconfig.json', 'package/tsconfig.json']
            },
            node: {
                project: ['tsconfig.json', 'package/tsconfig.json']
            }
        }
    }
};
