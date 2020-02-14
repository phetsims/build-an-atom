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
  const tandem = Tandem.ROOT;

  const simOptions = {
    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, ' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson, ' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, ' +
                        'Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    }
  };

  SimLauncher.launch( function() {
    const screens = [
      new BuildAnAtomScreen( tandem.createTandem( 'atomScreen' ) ),
      new SymbolScreen( tandem.createTandem( 'symbolScreen' ) )
    ];

    // PhET-iO does not support the game screen (yet), see https://github.com/phetsims/build-an-atom/issues/156
    if ( !Tandem.PHET_IO_ENABLED ) {
      screens.push( new GameScreen( tandem.createTandem( 'gameScreen' ) ) );
    }
    new Sim( buildAnAtomTitleString, screens, simOptions ).start();
  } );
} );

