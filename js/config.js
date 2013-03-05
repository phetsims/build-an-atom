// Copyright 2002-2012, University of Colorado

// RequireJS configuration file for BAA-Easel.
require.config(
    {
      deps: ['main'],

      paths: {
        // local contrib dependencies
        i18n: "../contrib/i18n-2.0.2",
        tpl: "../contrib/tpl-0.2",
        lodash: "../contrib/lodash-1.0.1",

        // PhET's common code, uppercase names to identify them in require imports
        PHETCOMMON: "../common/phetcommon/js",

        // Scenery and its dependencies
        ASSERT: '../../assert/js',
        DOT: '../../dot/js',
        SCENERY: '../../scenery/js'
      },

      shim: {
        lodash: { exports: "_" }
      },

      urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

    } );
