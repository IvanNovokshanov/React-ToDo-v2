module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: ['plugin:react/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 13,
		sourceType: 'module'
	},
	plugins: [
		'prettier',
		'react',
		// Базовый набор правил eslint
		'eslint:recommended',
		// Отключаем правила из базового набора
		'plugin:@typescript-eslint/eslint-recommended',
		// Базовые правила для TypeScript
		'plugin:@typescript-eslint/recommended',
		// Правила TS, требующие инфо о типах
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	ignorePatterns: ['dist', 'node_modules'],
	rules: {
		'@typescript-eslint/rule-name': 'error',
		'@typescript-eslint/no-explicit-any': 'off',
		indent: ['error', 'tab'],
		quotes: [1, 'single'],
		'space-before-blocks': 'error',
		'arrow-spacing': 'error',
		'space-in-parens': 'error',
		'object-curly-spacing': ['error', 'always'],
		'keyword-spacing': 'error'
	}
};
