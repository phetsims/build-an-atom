// Copyright 2017-2018, University of Colorado Boulder

/**
 * IO type for BAAGameModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrayIO = require( 'TANDEM/types/ArrayIO' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ObjectIO = require( 'TANDEM/types/ObjectIO' );
  var phetioInherit = require( 'TANDEM/phetioInherit' );
  var StringIO = require( 'TANDEM/types/StringIO' );
  var VoidIO = require( 'TANDEM/types/VoidIO' );
  var validate = require( 'AXON/validate' );

  /**
   * @param {BAAGameModel} baaGameModel
   * @param {string} phetioID
   * @constructor
   */
  var BAAGameModelIO = function( baaGameModel, phetioID ) {
    ObjectIO.call( this, baaGameModel, phetioID );
  };

  phetioInherit( ObjectIO, 'BAAGameModelIO', BAAGameModelIO, {

    startGameLevel: {
      returnType: VoidIO,
      parameterTypes: [ StringIO ],
      implementation: function( levelType ) {
        this.phetioObject.startGameLevel( levelType );
      },
      documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game',
      invocableForReadOnlyElements: false
    },

    setChallenges: {
      returnType: VoidIO,
      parameterTypes: [ ArrayIO( ArrayIO( ObjectIO ) ) ],
      implementation: function( challenges ) {
        this.phetioObject.setChallenges( challenges );
      },
      documentation: 'Specify exact challenges',
      invocableForReadOnlyElements: false
    },

    setAllowedChallengeTypesByLevel: {
      returnType: VoidIO,
      parameterTypes: [ ArrayIO( ArrayIO( StringIO ) ) ],

      // TODO: change this to take index as 1st argument (for level index)
      implementation: function( allowedChallengeTypesByLevel ) {
        this.phetioObject.setAllowedChallengeTypesByLevel( allowedChallengeTypesByLevel );
      },

      documentation: 'Specify which challenge types may be presented to the user for each level.',
      invocableForReadOnlyElements: false
      // The default value is [
      //    [ 'schematic-to-element', 'counts-to-element' ],
      //    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      //    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      //    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
      //  ]
    }
  }, {

    clearChildInstances: function( baaGameModel ) {
      validate( baaGameModel, this.validator );
      baaGameModel.challengeSetProperty.value.forEach( function( challenge ) {
        challenge.dispose();
      } );
      baaGameModel.challengeSetProperty.reset();
    },

    // addChildInstance: function( phetioObject, tandem, stateObject ){
    //
    // },


    documentation: 'The model for the Game',
    validator: { isValidValue: x => x instanceof phet.buildAnAtom.BAAGameModel }
  } );

  buildAnAtom.register( 'BAAGameModelIO', BAAGameModelIO );

  return BAAGameModelIO;
} );

