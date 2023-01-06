module.exports = ({ env }) => {
  console.log('db test2 env: ', env);

  return ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST_PRODUCTION'),
        port: env('DATABASE_PORT_PRODUCTION'),
        database: env('DATABASE_NAME_TEST2'),
        user: env('DATABASE_USER_PRODUCTION'),
        password: env('DATABASE_PASS_PRODUCTION'),
        ssl: false
      },
    },
  });
}