'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "api-select",
    plugin: "fetch-content",
    type: "json",
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });
  const extensionService = strapi.plugin('graphql').service('extension');

    extensionService.use(({ nexus }) => ({
      types: [
        nexus.extendType({
          type: "ComponentContentRelationsConectContent",
          definition: (t) => {
            t.field("contentData", {
              type: "JSON",
              resolve: async (root, args, ctx) => {
                // console.log('root: ', root)
                const contentData = await strapi.services[root.relatedContent.content.uid].find()
                // const components = root.relatedContent.components.map(component => {
                //   component.attributes.map(attr => {
                //     if (attr.value.length > 0 && typeof attr.value[0] === 'string') {
                //       console.log('attr.value: ', attr.value)
                //       attr.value.reduce((acc, curr) => {
                        
                //         return acc
                //       }, {})
                //     }
                //     return attr
                //   })
                //   return component
                // })
                return await contentData
              },
            })
          },
        }),
      ]
    }));

};
