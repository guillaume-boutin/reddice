const mix = require('laravel-mix');

mix.extend('externals', new class {
   externals () {
      return {
         react: 'React'
      }
   }
}());

mix.react('resources/js/index.js', 'public/js')
   .sourceMaps()
   .disableNotifications();
   // .sass('resources/sass/app.scss', 'public/css');
   // .webpackConfig({
   //    plugins: [
   //       new LiveReloadPlugin()
   //    ]
   // });

