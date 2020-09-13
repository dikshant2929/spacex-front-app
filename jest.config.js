module.exports = {
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
    setupFilesAfterEnv: ['<rootDir>/script/config/jest/setupTestsAfterEnv.js'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.js?(x)',
        '<rootDir>/src/**/?(*.)(spec|test).js?(x)',
    ],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost:9000',
    transform: {
        '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        //'^.+\\.css$': '<rootDir>/script/config/jest/cssTransform.js',
        //'^(?!.*\\.(js|jsx|css|json)$)':'<rootDir>/script/config/jest/fileTransform.js',
    },
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
};
