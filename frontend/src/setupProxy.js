const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        `/getevents/*`,
        createProxyMiddleware({
            target: 'https://one111111.herokuapp.com/'
         
        })
       );
};
