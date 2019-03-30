const mix = require('laravel-mix');

mix.extend('externals', new class {
   externals () {
      return {
         react: 'React',
         axios: 'axios'
      }
   }
}());

mix.react('resources/js/index.js', 'public/js')
   .browserSync('reddice.local')
   .sourceMaps()
   .disableNotifications();
   // .sass('resources/sass/app.scss', 'public/css');
   // .webpackConfig({
   //    plugins: [
   //       new LiveReloadPlugin()
   //    ]
   // });

