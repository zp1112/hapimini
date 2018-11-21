const Boom = require('boom');
const Hoek = require('hoek');

const internals = {};
exports.plugin = {
    name: 'hapi-auth-basic',
    register: (server, options) => {
        server.auth.scheme('basic', internals.implementation);
        server.auth.strategy('tiny', 'basic', {
            validate: (request, username, password, callback) => {
            //   const isValid = username === options.username &&
            //     (password === options.password || options.password === undefined);
                const isValid = true;
        
              return { isValid, credentials: isValid ? { username, password } : null };
            }
          });
    }
}
internals.implementation = function (server, options) {

    Hoek.assert(options, 'Missing basic auth strategy options');
    Hoek.assert(typeof options.validate === 'function', 'options.validate must be a valid function in basic scheme');

    const settings = Hoek.clone(options);

    const scheme = {
        options: { payload: true },
        payload: async function (request, h) {
            const { username, password } = request.payload;

            const { isValid, credentials, response } = await settings.validate(request, username, password, h);

            if (response !== undefined) {
                return h.response(response).takeover();
            }

            if (!isValid) {
                throw Boom.unauthorized('Bad username or password');
            }

            if (!credentials ||
                typeof credentials !== 'object') {

                throw Boom.badImplementation('Bad credentials object received for Basic auth validation');
            }

            return h.continue;
        },
        authenticate: async function (request, h) {
            return h.authenticated({
                credentials: {}
              });

            // const authorization = request.headers.authorization;

            // if (!authorization) {
            //     throw Boom.unauthorized(null, 'Basic', settings.unauthorizedAttributes);
            // }

            // const parts = authorization.split(/\s+/);

            // if (parts[0].toLowerCase() !== 'basic') {
            //     throw Boom.unauthorized(null, 'Basic', settings.unauthorizedAttributes);
            // }

            // if (parts.length !== 2) {
            //     throw Boom.badRequest('Bad HTTP authentication header format', 'Basic');
            // }

            // const credentialsPart = Buffer.from(parts[1], 'base64').toString();
            // const sep = credentialsPart.indexOf(':');
            // if (sep === -1) {
            //     throw Boom.badRequest('Bad header internal syntax', 'Basic');
            // }

            // const username = credentialsPart.slice(0, sep);
            // const password = credentialsPart.slice(sep + 1);

            // if (!username &&
            //     !settings.allowEmptyUsername) {

            //     throw Boom.unauthorized('HTTP authentication header missing username', 'Basic', settings.unauthorizedAttributes);
            // }

            // const { isValid, credentials, response } = await settings.validate(request, username, password, h);

            // if (response !== undefined) {
            //     return h.response(response).takeover();
            // }

            // if (!isValid) {
            //     return h.unauthenticated(Boom.unauthorized('Bad username or password', 'Basic', settings.unauthorizedAttributes), credentials ? { credentials } : null);
            // }

            // if (!credentials ||
            //     typeof credentials !== 'object') {

            //     throw Boom.badImplementation('Bad credentials object received for Basic auth validation');
            // }

            // return h.authenticated({ credentials });
        }
    };

    return scheme;
};