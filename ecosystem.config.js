const env = require('dotenv').config().parsed

// console.log('env: ', env);
// console.log('process.env: ', process.env);

module.exports = ({
  apps: [
    {
      name: env.NAME1,
      cwd: env.CWD,
      script: env.SCRIPT,
      args: 'str:develop',
      env: {
        NODE_ENV: env.NAME1,
        HOST_PORT_TEST1: env.HOST_PORT_TEST1,
        DATABASE_HOST_PRODUCTION: env.DATABASE_HOST_PRODUCTION1, 
        DATABASE_PORT_PRODUCTION: env.DATABASE_PORT_PRODUCTION1,
        DATABASE_USER_PRODUCTION: env.DATABASE_USER_PRODUCTION1,
        DATABASE_PASS_PRODUCTION: env.DATABASE_PASS_PRODUCTION1,
        DATABASE_NAME_TEST1: env.DATABASE_NAME_TEST1,
        ADMIN_JWT_SECRET: env.ADMIN_JWT_SECRET,
        DOMAIN_URL: env.DOMAIN_URL1
      }
    },
    {
      name: env.NAME2,
      cwd: env.CWD,
      script: env.SCRIPT,
      args: 'str:develop',
      env: {
        NODE_ENV: env.NAME2,
        HOST_PORT_TEST2: env.HOST_PORT_TEST2,
        DATABASE_HOST_PRODUCTION: env.DATABASE_HOST_PRODUCTION2,
        DATABASE_PORT_PRODUCTION: env.DATABASE_PORT_PRODUCTION2,
        DATABASE_USER_PRODUCTION: env.DATABASE_USER_PRODUCTION2, 
        DATABASE_PASS_PRODUCTION: env.DATABASE_PASS_PRODUCTION2,
        DATABASE_NAME_TEST2: env.DATABASE_NAME_TEST2,
        ADMIN_JWT_SECRET:  env.ADMIN_JWT_SECRET,
        DOMAIN_URL: env.DOMAIN_URL2,
      }
    }
  ]
});