const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/*',
        createProxyMiddleware({
            target: 'http://localhost:5001'
          
        })
    );

    app.use(
        `/Conference/*`,
        createProxyMiddleware({
            target: 'http://localhost:5000'
         
        })
       );
};
