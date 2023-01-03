const env = require('dotenv').config().parsed

console.log(env);

module.exports = ({
  apps: [
    {
      name: env.NAME1,
      cwd: env.CWD,
      script: 'yarn',
      args: 'develop',
      env: {
        NODE_ENV: env.NAME1,
        HOST_PORT_TEST1: env.HOST_PORT_TEST1,
        DATABASE_HOST_PRODUCTION: env.DATABASE_HOST_PRODUCTION, 
        DATABASE_PORT_PRODUCTION: env.DATABASE_PORT_PRODUCTION,
        DATABASE_USER_PRODUCTION: env.DATABASE_USER_PRODUCTION,
        DATABASE_PASS_PRODUCTION: env.DATABASE_PASS_PRODUCTION,
        DATABASE_NAME_TEST1: env.DATABASE_NAME_TEST1,
        ADMIN_JWT_SECRET: env.ADMIN_JWT_SECRET,
        DOMAIN_URL: env.DOMAIN_URL
      }
    },
    {
      name: env.NAME2,
      cwd: env.CWD,
      script: 'yarn',
      args: 'develop',
      env: {
        NODE_ENV: env.NAME2,
        HOST_PORT_TEST2: env.HOST_PORT_TEST2,
       DATABASE_HOST_PRODUCTION: env.DATABASE_HOST_PRODUCTION,
        DATABASE_PORT_PRODUCTION: env.DATABASE_PORT_PRODUCTION,
        DATABASE_USER_PRODUCTION: env.DATABASE_USER_PRODUCTION, 
        DATABASE_PASS_PRODUCTION: env.DATABASE_PASS_PRODUCTION,
        DATABASE_NAME_TEST2: env.DATABASE_NAME_TEST2,
        ADMIN_JWT_SECRET:  env.ADMIN_JWT_SECRET,
        DOMAIN_URL: env.DOMAIN_URL,
      }
    }
  ]
});