// Copyright 2002-2012, University of Colorado

// RequireJS configuration file for BAA-Easel.
require.config(
    {
      deps: ["main"],

      paths: {
        // local contrib dependencies
        easel: "../contrib/easeljs-0.6.0.min",
        i18n: "../contrib/i18n-2.0.2",
        tpl: "../contrib/tpl-0.2",
        lodash: "../contrib/lodash-1.0.1",

        // common directories, uppercase names to identify them in require imports
        PHETCOMMON: "../common/phetcommon/js",
        'EASEL-PHET': "../common/easel-phet/js"
      },

      shim: {

        lodash: {
          exports: "_"
        },

        easel: {
          exports: "createjs"
        }
      },

      urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

    } );
