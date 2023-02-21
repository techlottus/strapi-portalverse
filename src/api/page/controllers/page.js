'use strict';

/**
 * page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page.page',  ({ strapi }) => ({
  async findOne(ctx) {
    const { data, meta } = await super.find(ctx);
    const components = await Promise.all(data.attributes.sections.map(async section => {
      const component = await strapi.entityService.findOne(section.__component, section.id, { populate: '*' })
      // check for repeatable components to bring all data
      if (section.__component === 'sections.hero-slider') {
        const slides = await Promise.all(component.slide.map(async slide => {
          const newslide = await strapi.entityService.findOne('sections.hero', slide.id, { populate: '*' })
          return newslide
        }))
        component.slide = slides
      }
      return component
    }))
    data.attributes.sections = components
    return { data, meta };
  },
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    const newdata = Promise.all(data.map(async page => {

      const components = await Promise.all(page.attributes.sections.map(async section => {
        const component = await strapi.entityService.findOne(section.__component, section.id, { populate: '*' })
        // check for repeatable components to bring all data
        if (section.__component === 'sections.hero-slider') {
          const slides = await Promise.all(component.slide.map(async slide => {
            const newslide = await strapi.entityService.findOne('sections.hero', slide.id, { populate: '*' })
            return await newslide
          }))
          component.slide = slides
        }
        return await component
      }))
      page.attributes.sections = components
      return page
    }))
    return { data: await newdata, meta };
  },
}));

