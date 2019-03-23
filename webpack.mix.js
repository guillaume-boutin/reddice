const mix = require('laravel-mix');
var LiveReloadPlugin = require('webpack-livereload-plugin');

mix.react('resources/js/index.js', 'public/js')
   .sourceMaps()
   .disableNotifications();
   // .sass('resources/sass/app.scss', 'public/css');
   // .webpackConfig({
   //    plugins: [
   //       new LiveReloadPlugin()
   //    ]
   // });
