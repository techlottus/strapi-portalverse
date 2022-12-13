module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST_PRODUCTION'),
      port: env('DATABASE_PORT_PRODUCTION'),
      database: 'test2',
      user: env('DATABASE_USER_PRODUCTION'),
      password: env('DATABASE_PASS_PRODUCTION'),
      ssl: false
    },
  },
});