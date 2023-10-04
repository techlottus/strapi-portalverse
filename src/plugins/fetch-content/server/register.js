'use strict';

module.exports = ({ strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: "api-select",
    plugin: "fetch-content",
    type: "string",
    inputSize: {
      // optional
      default: 12,
      isResizable: true,
    },
  });
};
