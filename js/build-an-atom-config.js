// Copyright 2002-2013, University of Colorado

// RequireJS configuration file for Build an Atom.
require.config(
  {
    deps: ['build-an-atom-main'],

    paths: {
      // local lib dependencies
      i18n: "../lib/i18n-2.0.2",

      // PhET's common code, uppercase names to identify them in require imports
      PHETCOMMON: "../../phetcommon/js",

      // Scenery and its dependencies
      ASSERT: '../../assert/js',
      AXON: '../../axon/js',
      DOT: '../../dot/js',
      KITE: '../../kite/js',
      PHET_CORE: '../../phet-core/js',
      SCENERY: '../../scenery/js',
      SCENERY_PHET: '../../scenery-phet/js',
      JOIST: '../../joist/js',
      SUN: '../../sun/js'
    },

    urlArgs: new Date().getTime()  // cache buster to make browser refresh load all included scripts

  } );
