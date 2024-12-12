
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST','PATCH' , 'PUT', 'DELETE'], 
}));

// Set up the proxy middleware
app.use('/api', createProxyMiddleware({
    //https://sd-cf.cfapps.us10-001.hana.ondemand.com
    //https://sd.cfapps.us10-001.hana.ondemand.com
    // 'https://trial.cfapps.us10-001.hana.ondemand.com', 
    target: 'https://btpsd.cfapps.us10-001.hana.ondemand.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', 
    },
    onProxyReq: (proxyReq, req, res) => {
        // Log the full target URL
        console.log('Proxying request to:', proxyReq.getHeader('host') + proxyReq.path);
    },
}));

app.use('/auth', createProxyMiddleware({
    target: 'https://ajwgvqm4q.trial-accounts.ondemand.com/oauth2/token', 
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '', 
    },
}));
app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});