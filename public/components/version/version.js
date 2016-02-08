'use strict';

angular.module('MyApp.version', [
  'MyApp.version.interpolate-filter',
  'MyApp.version.version-directive'
])

.value('version', '0.1');
