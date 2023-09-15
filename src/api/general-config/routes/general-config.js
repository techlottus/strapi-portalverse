'use strict';

/**
 * general-config router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::general-config.general-config');
