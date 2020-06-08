// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO type for BAAGameModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import validate from '../../../../axon/js/validate.js';
import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import ObjectIO from '../../../../tandem/js/types/ObjectIO.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import buildAnAtom from '../../buildAnAtom.js';

class BAAGameModelIO extends ObjectIO {

  /**
   * @param {BAAGameModel} baaGameModel
   * @public
   */
  static clearChildInstances( baaGameModel ) {
    validate( baaGameModel, this.validator );
    baaGameModel.challengeSetProperty.value.forEach( function( challenge ) {
      challenge.dispose();
    } );
    baaGameModel.challengeSetProperty.reset();
  }
}

BAAGameModelIO.methods = {

  /**
   * @public
   */
  startGameLevel: {
    returnType: VoidIO,
    parameterTypes: [ StringIO ],
    implementation: function( levelType ) {
      this.phetioObject.startGameLevel( levelType );
    },
    documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game',
    invocableForReadOnlyElements: false
  },

  /**
   * @public
   */
  setChallenges: {
    returnType: VoidIO,
    parameterTypes: [ ArrayIO( ArrayIO( ObjectIO ) ) ],
    implementation: function( challenges ) {
      this.phetioObject.setChallenges( challenges );
    },
    documentation: 'Specify exact challenges',
    invocableForReadOnlyElements: false
  },

  /**
   * @public
   */
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
};
BAAGameModelIO.documentation = 'The model for the Game';
BAAGameModelIO.validator = { isValidValue: x => x instanceof phet.buildAnAtom.BAAGameModel };
BAAGameModelIO.typeName = 'BAAGameModelIO';
ObjectIO.validateSubtype( BAAGameModelIO );

buildAnAtom.register( 'BAAGameModelIO', BAAGameModelIO );
export default BAAGameModelIO;