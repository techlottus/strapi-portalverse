'use strict';

/**
 * opening service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::opening.opening');
