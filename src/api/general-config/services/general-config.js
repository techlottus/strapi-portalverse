'use strict';

/**
 * general-config service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::general-config.general-config');
