interface Environment {
  production: boolean;
  API_HOST: string;
  API_PORT: string;
  API_URL: (arg0: Environment) => string;
}

export const environment: Environment = {
  production: false,
  API_HOST: 'http://localhost',
  API_PORT: '4000',
  API_URL: (env: Environment) => {
    return `${env.API_HOST}:${env.API_PORT}`;
  },
};
