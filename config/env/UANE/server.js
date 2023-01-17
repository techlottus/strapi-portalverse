module.exports = ({ env }) => ({
  host: env('HOST', 'localhost'),
  port: env('HOST_PORT'),
  app: {
    keys: env.array('APP_KEYS')
  }
});