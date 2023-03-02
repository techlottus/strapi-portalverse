'use strict';

/**
 * podcast-episode service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::podcast-episode.podcast-episode');
