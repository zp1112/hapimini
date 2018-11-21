require('env2')('./.env')
const Hapi = require('hapi');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const pluginHapiPagination = require('./plugins/hapi-pagination');
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJWT2 = require('./plugins/hapi-auth-jwt2');

const server = Hapi.Server({
  port: config.port,
  host: config.host,
});

const init = async () => {
    await server.register([
      // 为系统使用 hapi-swagger
      ...pluginHapiSwagger,
      pluginHapiPagination,
      hapiAuthJWT2,
    ]);
    pluginHapiAuthJWT2(server);
    server.route([
      // 创建一个简单的hello hapi接口
      ...routesHelloHapi,
      ...routesShops,
      ...routesOrders,
      ...routesUsers
    ]);
    // 启动服务
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
  };

init().catch((err) => {

  console.error(err);
  process.exit(1);
});