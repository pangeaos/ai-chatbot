module.exports = {
    // Type check TypeScript files
    '*.{js,jsx,ts,tsx}': ['eslint .', 'eslint'],

    // Lint then format TypeScript and JavaScript files
    '**/*.ts?(x)': () => 'pnpm check-types',

    // Format MarkDown and JSON
    '*.{json,yaml}': ['prettier --write'],
};
