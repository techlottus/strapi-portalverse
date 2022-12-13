module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env('HOST_PORT_TEST2'),
  app: {
    keys: env.array('APP_KEYS')
  }
});