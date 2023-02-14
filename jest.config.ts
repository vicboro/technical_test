import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest'
  },
  roots: ['./tests']
};

export default config;
