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
};
