// .eslintrc.js
module.exports = {
	root: true, // Indicates this is the root configuration file
	parserOptions: {
		ecmaVersion: 2022, // Specify the ECMAScript version (e.g., 2022)
		sourceType: "module", // Use 'module' for ES modules
	},
	env: {
		browser: true, // Enable browser environment
		node: true, // Enable Node.js environment
	},
	extends: [
		"eslint:recommended", // Use ESLint's recommended rules
		"plugin:react/recommended", // Enable React-specific rules
		"plugin:@typescript-eslint/recommended", // Enable TypeScript-specific rules
		"prettier", // Integrate with Prettier
	],
	plugins: ["react", "@typescript-eslint"], // Specify additional plugins
	rules: {
		semi: "error", // Enforce semicolons
		"prefer-const": "error", // Prefer const over let
		// Add more rules as needed
	},
};
