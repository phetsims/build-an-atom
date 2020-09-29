// Copyright 2017-2020, University of Colorado Boulder

/**
 * IO Type for BAAGameModel
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Andrew Adare (PhET Interactive Simulations)
 */

import ArrayIO from '../../../../tandem/js/types/ArrayIO.js';
import IOType from '../../../../tandem/js/types/IOType.js';
import StringIO from '../../../../tandem/js/types/StringIO.js';
import VoidIO from '../../../../tandem/js/types/VoidIO.js';
import buildAnAtom from '../../buildAnAtom.js';

const BAAGameModelIO = new IOType( 'BAAGameModelIO', {
  isValidValue: x => x instanceof phet.buildAnAtom.BAAGameModel,
  documentation: 'The model for the Game',
  methods: {

    startGameLevel: {
      returnType: VoidIO,
      parameterTypes: [ StringIO ],
      implementation: function( levelType ) {
        this.startGameLevel( levelType );
      },
      documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game',
      invocableForReadOnlyElements: false
    },

    setChallenges: {
      returnType: VoidIO,
      parameterTypes: [ ArrayIO( ArrayIO( IOType.ObjectIO ) ) ],
      implementation: function( challenges ) {
        this.setChallenges( challenges );
      },
      documentation: 'Specify exact challenges',
      invocableForReadOnlyElements: false
    },

    setAllowedChallengeTypesByLevel: {
      returnType: VoidIO,
      parameterTypes: [ ArrayIO( ArrayIO( StringIO ) ) ],

      // TODO: change this to take index as 1st argument (for level index)
      implementation: function( allowedChallengeTypesByLevel ) {
        this.setAllowedChallengeTypesByLevel( allowedChallengeTypesByLevel );
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
  },
  /**
   * @param {BAAGameModel} baaGameModel
   * @public
   * TODO: eliminate this legacy pattern, see https://github.com/phetsims/tandem/issues/87
   */
  clearChildInstances: baaGameModel => {
    baaGameModel.challengeSetProperty.value.forEach( function( challenge ) {
      challenge.dispose();
    } );
    baaGameModel.challengeSetProperty.reset();
  }
} );

buildAnAtom.register( 'BAAGameModelIO', BAAGameModelIO );
export default BAAGameModelIO;