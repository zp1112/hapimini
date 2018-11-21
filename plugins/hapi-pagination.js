const hapiPagination = require('hapi-pagination');

const options = {
  routes: {
    include: [
      '/shops',  // 店铺列表支持分页特性
      '/shops/{shopId}/goods',
    ],
    exclude: []
  }
}

module.exports = {
  plugin: hapiPagination,
  options: options,
}