'use strict';

/**
 * external-post service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::external-post.external-post');
