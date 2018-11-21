// routes/hello-hapi.js
const Joi = require('joi');
const { jwtHeaderDefine } = require('../utils/router-helper');
module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      validate: {
        ...jwtHeaderDefine,
      },
      handler: (request, h) => {
        console.log(request.auth.credentials);
        return h.response('hello hapi');
      },
      tags: ['api', 'tests'],
      description: '测试hello-hapi',
    },
  },
];