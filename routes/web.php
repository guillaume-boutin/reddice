<?php

Route::get('/{any}', function () {
    // TODO: Put that logic into into its ows ServiceProvider or something...
    $routes = Route::getRoutes()->getRoutes();

    $routes = array_filter($routes, function ($route) {
        return ! empty($route->action['as']);
    });
    $routes = array_map(function ($route) {
        $methods = $route->methods;
        unset($methods['HEAD']);

        preg_match_all('/\{[^\}]*\}/', $route->uri, $params);

        $params = array_map(function ($p) {
            $p = ltrim($p, '{');
            $p = rtrim($p, '}');

            return $p;
        }, $params[0]);

        return [
            'method' => $methods[0],
            'path' => '/' . ltrim($route->uri, '/'),
            'params' => $params,
            'name' => $route->action['as']
        ];
    }, $routes);
    $routes = array_values($routes);

    return view('app', compact('routes'));
})->where('any', '.*');