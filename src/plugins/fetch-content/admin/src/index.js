import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import yup from 'yup';
import APISelect from './components/APISelect';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app
    app.customFields.register({
      name: "api-select",
      pluginId: "fetch-content", 
      type: "json", 
      intlLabel: {
        id: "fetch-content.api-select.label",
        defaultMessage: "texto fetch content",
      },
      intlDescription: {
        id: "fetch-content.api-select.description",
        defaultMessage: "should return a select with content type attributes",
      },
      icon: PluginIcon,
      components: {
        Input: async () => import(/* webpackChunkName: "input-component" */ "./components/APISelect"),
      },
      options: {
        
      },
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
    });
  },

  bootstrap(app) {
    // app.injectContentManagerComponent('listView', 'actions', { name: 'connect-content', Component: APISelect })
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
