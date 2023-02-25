'use strict';

/**
 * opening router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::opening.opening');
