module.exports = ({ env }) => {
  return ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST_PRODUCTION'),
        port: env('DATABASE_PORT_PRODUCTION'),
        database: env('DATABASE_NAME_TEST'),
        user: env('DATABASE_USER_PRODUCTION'),
        password: env('DATABASE_PASS_PRODUCTION'),
        ssl: env('DATABASE_SSL')
      },
    },
  });
}