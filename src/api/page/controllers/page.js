'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page', ({ strapi }) =>  ({

  async findOne(ctx) {
    const entity = await strapi.entityService.findOne('api::page.page', ctx.params.id, {
      fields: ['*'],
      populate: { sections: true, seo: true },
    });
    const sections = await Promise.all(entity.sections.map(async (section)=> {
      if (section.__component === 'content-relations.conect-content') {
        return {
          ...section,
          relatedContent: {
            ...section.relatedContent,
            contentData: await strapi.services[section.relatedContent.content.uid].find()
          }
        }
      }
      return section;
    }))
    return {
      ...entity,
      sections: sections
    }
  }
}));
