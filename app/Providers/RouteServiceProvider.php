<?php

namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
        
        $this->getRouteFilePaths()
            ->each(function ($path) {
                Route::prefix('ajax')
                    ->middleware('web')
                    ->namespace($this->getNamespace($path))
                    ->group($path);
            });
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }

    protected function getRouteFilePaths() : Collection
    {
        return collect(glob(base_path() . '/app/Containers/*/Routes/*php'));
    }

    protected function getNamespace(string $routesFilePath) : string
    {
        // make an array of each folder names of the path
        $split = explode('/', $routesFilePath);
        // chop everything before `app` folder
        $appIndex = array_search('app', $split);
        $sliced = array_slice($split, $appIndex);
        $sliced[0] = ucfirst($sliced[0]);
        // replace folder names `Routes by `Controllers`
        $routesIndex = array_search('Routes', $sliced);
        $sliced[$routesIndex] = 'Controllers';
        // remove routes file name from path array
        array_pop($sliced);

        return implode('\\', $sliced);
    }
}
