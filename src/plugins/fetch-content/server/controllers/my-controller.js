'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('fetch-content')
      .service('myService')
      .getWelcomeMessage();
  },
});
