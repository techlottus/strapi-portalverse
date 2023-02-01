const env = require('dotenv').config().parsed

module.exports = ({
  apps: [
    {
      name: env.NAME1,
      script: env.SCRIPT,
      args: env.ARGS,
      env: {
        NODE_ENV: env.NAME1,
        HOST_PORT: env.HOST_PORT_TEST1,
        DATABASE_HOST_PRODUCTION: env.DATABASE_HOST_PRODUCTION1, 
        DATABASE_PORT_PRODUCTION: env.DATABASE_PORT_PRODUCTION1,
        DATABASE_USER_PRODUCTION: env.DATABASE_USER_PRODUCTION1,
        DATABASE_PASS_PRODUCTION: env.DATABASE_PASS_PRODUCTION1,
        DATABASE_NAME: env.DATABASE_NAME_TEST1,
        ADMIN_JWT_SECRET: env.ADMIN_JWT_SECRET,
        DOMAIN_URL: env.DOMAIN_URL1,
        DATABASE_SSL: env.DATABASE_SSL,
        AWS_FOLDER: env.AWS_FOLDER1,
      }
    }
  ]
});