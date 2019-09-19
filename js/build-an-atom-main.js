// Copyright 2013-2019, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 */
define( require => {
  'use strict';

  // modules
  const BuildAnAtomScreen = require( 'BUILD_AN_ATOM/buildanatom/BuildAnAtomScreen' );
  const GameScreen = require( 'BUILD_AN_ATOM/game/GameScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SymbolScreen = require( 'BUILD_AN_ATOM/symbol/SymbolScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const buildAnAtomTitleString = require( 'string!BUILD_AN_ATOM/build-an-atom.title' );

  // root tandem
  var tandem = Tandem.rootTandem;

  var simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, ' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson, ' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, ' +
            'Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    },
    supportsSound: true
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

