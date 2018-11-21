const Joi = require('joi');

exports.plugin = {
    name: 'authentication',
    register: (server, options) => {
      const validation = Joi.validate(options, {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).default('')
      });
    
      if (validation.error) {
        return next(validation.error);
      }
      server.auth.strategy('tiny', 'basic', {
        validate: (request, username, password, callback) => {
          const isValid = username === options.username &&
            (password === options.password || options.password === undefined);
    
          return { isValid, credentials: isValid ? { username, password } : null };
        }
      });
    }
}