// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertions/assertInstanceOf' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var TArray = require( 'ifphetio!PHET_IO/types/TArray' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TVoid = require( 'ifphetio!PHET_IO/types/TVoid' );

  var TBAAGameModel = function( gameModel, phetioID ) {
    assertInstanceOf( gameModel, phet.buildAnAtom.BAAGameModel );
    TObject.call( this, gameModel, phetioID );
  };

  phetioInherit( TObject, 'TBAAGameModel', TBAAGameModel, {

    startGameLevel: {
      returnType: TVoid,
      parameterTypes: [ TString ],
      implementation: function( levelType ) {
        this.instance.startGameLevel( levelType );
      },
      documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game'
    },

    setAllowedProblemTypesByLevel: {
      returnType: TVoid,
      parameterTypes: [ TArray( TArray( TString ) ) ],

      implementation: function( allowedProblemTypesByLevel ) {
        this.instance.setAllowedProblemTypesByLevel( allowedProblemTypesByLevel );
      },

      documentation: 'Specify which problem types may be presented to the user for each level.'
      // The default value is [
      //    [ 'schematic-to-element', 'counts-to-element' ],
      //    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      //    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      //    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
      //  ]
    }
  }, {
    documentation: 'The model for the Game',
    events: 'levelCompleted'
  } );

  buildAnAtom.register( 'TBAAGameModel', TBAAGameModel );

  return TBAAGameModel;
} );

