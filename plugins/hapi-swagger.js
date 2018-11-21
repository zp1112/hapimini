const inert = require('inert');
const vision = require('vision');
const package = require('package');
const basic = require('./basic');
const hapiSwagger = require('hapi-swagger');

module.exports = [
  basic,
  inert,
  vision,
  // {
  //   plugin: require('./auth'),
  //   options: {
  //     username: 'candy',
  //     password: '222'
  //   }
  // },
  {
    plugin: hapiSwagger,
    options: {
      info: {
        title: '接口文档',
        version: package.version,
      },
      // 定义接口以 tags 属性定义为分组
      grouping: 'tags',
      tags: [
        { name: 'tests', description: '测试相关' },
      ]
    }
  }
]