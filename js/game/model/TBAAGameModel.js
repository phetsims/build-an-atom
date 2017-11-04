// Copyright 2017, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'ifphetio!PHET_IO/assertInstanceOf' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var phetioInherit = require( 'ifphetio!PHET_IO/phetioInherit' );
  var TArray = require( 'ifphetio!PHET_IO/types/TArray' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );
  var TObjectState = require( 'ifphetio!PHET_IO/types/TObjectState' );
  var TString = require( 'ifphetio!PHET_IO/types/TString' );
  var TVoid = require( 'ifphetio!PHET_IO/types/TVoid' );

  var TBAAGameModel = function( gameModel, phetioID ) {
    assert && assertInstanceOf( gameModel, phet.buildAnAtom.BAAGameModel );
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

    setChallenges: {
      returnType: TVoid,
      parameterTypes: [ TArray( TArray( TObjectState ) ) ],
      implementation: function( challenges ) {
        this.instance.setChallenges( challenges );
      },
      documentation: 'Specify exact challenges'
    },

    setAllowedChallengeTypesByLevel: {
      returnType: TVoid,
      parameterTypes: [ TArray( TArray( TString ) ) ],

      // TODO: change this to take index as 1st argument (for level index)
      implementation: function( allowedChallengeTypesByLevel ) {
        this.instance.setAllowedChallengeTypesByLevel( allowedChallengeTypesByLevel );
      },

      documentation: 'Specify which challenge types may be presented to the user for each level.'
      // The default value is [
      //    [ 'schematic-to-element', 'counts-to-element' ],
      //    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      //    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      //    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
      //  ]
    }
  }, {

    clearChildInstances: function( instance ) {
      instance.challengeSetProperty.value.forEach( function( challenge ) {
        challenge.dispose();
      } );
      instance.challengeSetProperty.reset();
    },

    // addChildInstance: function( instance, tandem, stateObject ){
    //
    // },


    documentation: 'The model for the Game'
  } );

  buildAnAtom.register( 'TBAAGameModel', TBAAGameModel );

  return TBAAGameModel;
} );

