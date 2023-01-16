
module.exports = ({ env }) => {
  return ({
    connection: {
      client: 'postgres',
      connection: {
        host: env('DATABASE_HOST_PRODUCTION1'),
        port: env('DATABASE_PORT_PRODUCTION1'),
        database: env('DATABASE_NAME_TEST1'),
        user: env('DATABASE_USER_PRODUCTION1'),
        password: env('DATABASE_PASS_PRODUCTION1'),
        ssl: env('DATABASE_SSL')
      },
    },
  })
};