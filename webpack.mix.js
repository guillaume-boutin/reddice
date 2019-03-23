const mix = require('laravel-mix');

mix.react('resources/js/index.js', 'public/js')
   .sourceMaps()
   .disableNotifications();
   // .sass('resources/sass/app.scss', 'public/css');
