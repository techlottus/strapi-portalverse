'use strict';

/**
 * vacant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vacant.vacant');
