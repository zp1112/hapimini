const Joi = require('joi');
const models = require('../models');
const { paginationDefine, jwtHeaderDefine } = require('../utils/router-helper');
const GROUP_NAME = 'shops';

module.exports = [
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, h) => {
      console.log(request.auth.credentials);
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: [
          'id',
          'name',
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
      return h.paginate({ results, otherKey: 'value', otherKey2: 'value2', totalCount }, 0, { key: 'results' });
    },
    config: {
      auth: 'jwt',
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      validate: {
        query: {
          ...paginationDefine,
        },
        ...jwtHeaderDefine,
      }
    }
  },
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, h) => {
      try {
        const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
          where: {
            id: request.params.shopId
          },
          attributes: [
            'id',
            'name',
          ],
          limit: request.query.limit,
          offset: (request.query.page - 1) * request.query.limit,
        });
        // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
        return { results, totalCount, test: 1 };
      } catch (error) {
        console.log(error)
      }
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      validate: {
        query: {
          ...paginationDefine
        },
        params: {
          shopId: Joi.number().integer().default(1).description('商铺id')
        }
      }
    },
  },
];