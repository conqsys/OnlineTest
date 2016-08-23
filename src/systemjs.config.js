/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    '@angular':                   'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'ng2-bootstrap'             : 'node_modules/ng2-bootstrap',
    'rxjs':                       'node_modules/rxjs',    
    'angular2-highcharts':        'node_modules/angular2-highcharts/dist', 
    'highcharts/highstock.src':   'node_modules/highcharts/highstock.js',
    'highcharts/highcharts':      'node_modules/highcharts',
    'highcharts/highcharts-3d':   'node_modules/highcharts',
    'angular2-datatable':         'node_modules/angular2-datatable',
    'lodash':                     'node_modules/lodash',   
    'ng2-select':                 'node_modules/ng2-select',

    'ng2-bootstrap/ng2-bootstrap':'node_modules/ng2-bootstrap/ng2-bootstrap',
    'moment':                     'node_modules/moment/moment.js',
    'jquery.timepicker':                     'node_modules/jquery-timepicker/jquery.timepicker.js'
    

  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'ng2-bootstrap'             : {defaultExtension: 'js'},
    'angular2-highcharts' :       { main: 'index',format: 'cjs', defaultExtension: 'js' },
    'highcharts/highcharts' :     { main: 'highcharts.js', defaultExtension: 'js' },
    'highcharts/highcharts-3d' :  { main: 'highcharts-3d.js', defaultExtension: 'js' },
    'highcharts/highcharts.src' : { main: 'highcharts-3d.src.js', defaultExtension: 'js' },
    'angular2-datatable':         { defaultExtension: 'js' },
    'jquery.timepicker':          { defaultExtension: 'js' },
    'lodash' :                    { main: 'index', defaultExtension: 'js' },
    
    "node_modules/ng2-bootstrap": {
            "defaultExtension": "js"
        },
        'ng2-select'                : { defaultExtension: 'js', main: 'ng2-select.js' },
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
