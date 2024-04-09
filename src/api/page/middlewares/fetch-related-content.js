'use strict';

/**
 * `fetch-related-content` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    strapi.log.info('In fetch-related-content middleware.');
      // some logic here
      // const { data, meta } = await super.find(ctx);
      // const res = 
      // console.log('ctx: ', ctx);
      // console.log('strapi: ', strapi);
      // console.log('ctx?.params: ', ctx?.params);
      // console.log('ctx.response: ', ctx.response);
      // const entryId = ctx?.params?.id ? ctx?.params?.id : undefined;
      // console.log('entryId: ', entryId);
      // (resolve, parent, ...rest) => {
      //   if (parent.id === 1) {
      //     return resolve({...parent, name: 'foobar' }, ...rest);
      //   }

      //   return resolve(parent, ...rest);
      // }
      // console.log('response: ', response);
      // console.log('response.data.attributes.sections: ', response.data.attributes.sections);
      // const connectComponent = response.data.attributes.sections.filter((section)=> section. __component === 'content-relations.conect-content')[0]
      // const hasConnect = !!connectComponent
      
      // // console.log('connectComponent: ', connectComponent);
      // // console.log('hasConnect: ', hasConnect);
      // if ( hasConnect ) {
      //   const relatedContentType = await strapi.services[connectComponent.relatedContent.content.uid].find()
      //   // .find(connectComponent.relatedContent.content.uid)
      //   connectComponent.relatedContent.contentData = relatedContentType.results
      //   // console.log('relatedContentType: ', relatedContentType);
        
      // }
      // const response = strapi.controllers['api::page.page'].findOne()
      // console.log(response);
      // some more logic
    
    await next();
    // return next(parent, args, context);
  };
};
