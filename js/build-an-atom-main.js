// Copyright 2013-2015, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 */
define( function( require ) {
  'use strict';

  // modules
  var BuildAnAtomScreen = require( 'BUILD_AN_ATOM/buildanatom/BuildAnAtomScreen' );
  var GameScreen = require( 'BUILD_AN_ATOM/game/GameScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SymbolScreen = require( 'BUILD_AN_ATOM/symbol/SymbolScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var buildAnAtomTitleString = require( 'string!BUILD_AN_ATOM/build-an-atom.title' );

  // root tandem
  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter,\n' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson,\n' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson,\n' +
            'Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    }
  };

  SimLauncher.launch( function() {
    new Sim(
      buildAnAtomTitleString,
      [
        new BuildAnAtomScreen( tandem.createTandem( 'atomScreen' ) ),
        new SymbolScreen( tandem.createTandem( 'symbolScreen' ) ),
        new GameScreen( tandem.createTandem( 'gameScreen' ) )
      ],
      simOptions
    ).start();
  } );
} );

