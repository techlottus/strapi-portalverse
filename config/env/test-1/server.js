module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env('HOST_PORT_TEST1'),
  app: {
    keys: env.array('APP_KEYS')
  }
});