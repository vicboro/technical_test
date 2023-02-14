export const Config = {
  env: process.env.NODE_ENV,
  isDevEnv: process.env.NODE_ENV === 'dev',
  authPhrase: process.env.AUTH_PHRASE as string
};
