import type {Config} from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your random environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Add more setup options before each random is run
  // Automatically clear mock calls, instances, contexts and results before every random
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // Indicates whether the coverage information should be collected while executing the random
  collectCoverage: true,
  verbose: true
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
