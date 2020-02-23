import { createSelector } from 'reselect';
import plugins from '../../utils/getPlugins';
import detectPlatform from '../Main/detectPlatform';
import isDev from '../../utils/isDev';

const platform = detectPlatform();

const getMapItems = state => state.mapItems;
const getPluginSettings = state => state.pluginSettings;

const immutableProperties = ['id', 'floor', 'connectorId'];

const isNull = v => v === null;
isNull.toString = () => 'null';

const isObject = v => v && Object.getPrototypeOf(v) === Object.prototype;
isObject.toString = () => 'string';

const mapItemsProperties = [
  ['name', ['string', 'undefined']],
  ['coordinates', [Array.isArray]],
  ['type', ['string', 'undefined']],
  ['photo', ['string', isNull]],
  ['panorama', ['string', isNull]],
  ['url', ['string', 'undefined']],
  ['geoLocs', [isObject, 'undefined']],
  ['others', [isObject, 'undefined']],
];

function applyMapItemEnhancerValidator(item, enhancer) {
  if (!isDev) {
    return enhancer(item);
  }

  if (typeof enhancer !== 'function') {
    throw new TypeError(`mapItemEnhancer must be a function, ${typeof enhancer} got`);
  }

  const enhancedItem = enhancer(item);

  immutableProperties.forEach(prop => {
    if (item[prop] !== enhancedItem[prop]) {
      throw new Error(`Attempt to change immutable map item property ${prop} in mapItemEnhancer`);
    }
  });

  mapItemsProperties.forEach(([prop, types]) => {
    const isValidTypes = types.some(type => {
      if (typeof type === 'function') {
        return type(enhancedItem[prop]);
      }

      return type === typeof enhancedItem[prop];
    });

    if (!isValidTypes) {
      console.error('enhancedItem type error:', enhancedItem);

      throw new TypeError(
        `Map item property ${prop} must be ${types.join(' or ')}, <value: ${
          enhancedItem[prop]
        }, type: ${typeof enhancedItem[prop]}> got from mapItemEnhancer`,
      );
    }
  });

  return enhancedItem;
}

const getEnhancedMapItems = createSelector(
  [getMapItems, getPluginSettings],
  (mapItems, pluginSettings) => {
    const activePlugins = plugins.filter(plugin => {
      if (plugin.platform && !plugin.platform.includes(platform)) {
        return false;
      }

      if (!pluginSettings.data[plugin.id]) {
        return true;
      }

      return !pluginSettings.data[plugin.id].off;
    });

    if (!mapItems.success) {
      return mapItems;
    }

    const data = mapItems.mapItems.map(_item => {
      let item = _item;
      activePlugins.forEach(({ mapItemEnhancer }) => {
        if (mapItemEnhancer) {
          item = applyMapItemEnhancerValidator(item, mapItemEnhancer);
        }
      });
      return item;
    });

    return {
      ...mapItems,
      mapItems: data,
    };
  },
);

export default getEnhancedMapItems;
