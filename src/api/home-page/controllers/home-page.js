'use strict';

/**
 * home-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::home-page.home-page',  ({ strapi }) => ({
  async find(ctx) {
    console.log(ctx);
    // some custom logic here
    // ctx.query = { ...ctx.query, local: 'en' };
    
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    console.log(data.attributes.sections);
    // console.log(meta);
    const components = await Promise.all(data.attributes.sections.map(async section => {
      const component = await strapi.entityService.findOne(section.__component, section.id, { populate: '*' })
      if (section.__component === 'sections.hero-slider') {
        const slides = await Promise.all(component.slide.map(async slide => {
          console.log('slide: ', slide);
          const newslide = await strapi.entityService.findOne('sections.hero', slide.id, { populate: '*' })
          console.log('newslide: ', newslide);
          return newslide
        }))
        console.log('slides: ', slides);
        component.slide = slides
      }
      console.log('component: ', component);
      return component
    }))
    console.log('components: ', components);
    data.attributes.sections = components

    // some more custom logic
    // meta.date = Date.now();

    return { data, meta };
  },
}));
