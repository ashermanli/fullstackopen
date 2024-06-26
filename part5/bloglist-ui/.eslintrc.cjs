/* eslint-env node */

module.exports = {
	root: true,
	env: { browser: true, es2020: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh', 'simple-import-sort'],
	rules: {
		'no-undef': 'error',
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'sort-imports': [
			'error',
			{
				ignoreCase: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'single', 'multiple', 'all'],
				allowSeparatedGroups: true,
			},
		],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		eqeqeq: 'error',
		'no-trailing-spaces': 'error',
		'object-curly-spacing': ['error', 'always'],
		'arrow-spacing': ['error', { before: true, after: true }],
		'no-console': 1,
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 0,
		'no-unused-vars': 0,
	},
	overrides: [
		// override "simple-import-sort" config
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.cjs', '*.cjsx'],
			rules: {
				'simple-import-sort/imports': [
					'error',
					{
						groups: [
							// Packages `react` related packages come first.
							['^react', '^@?\\w'],
							// Internal packages.
							['^(@|components)(/.*|$)'],
							// Side effect imports.
							['^\\u0000'],
							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$'],
						],
					},
				],
			},
		},
	],
}
