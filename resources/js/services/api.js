import axios from 'axios'

class Api {
    constructor (apiRoutes) {
        this.routes = apiRoutes;
    }

    request (routeName, payload = null) {
        let route = this.routes.find((r) => {
            return r.name === routeName;
        });

        if (route === undefined) {
            throw new Error(`Route name "${routeName} doesn't exist."`);
        }
    
        let method = route.method.toLowerCase();
    
        let path = route.path;
        route.params.forEach(param => {
            path = path.replace("{"+param+"}", payload[param]);
            delete payload[param]
        });
    
        return axios[method](path, payload);
    }

    getRoutes () {
        return this.routes;
    }
};

// Get the backend routes
let $routeMetaTag = document.head.querySelector('meta[name="routes"]');
const API_ROUTES = JSON.parse($routeMetaTag.content);

export default new Api(API_ROUTES);