// Copyright 2016-2025, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Aadish Gupta
 */

import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';
import getGameLevelsSchema from '../../../vegas/js/getGameLevelsSchema.js';
import buildAnAtom from '../buildAnAtom.js';
import BAAConstants from './BAAConstants.js';

const BAAQueryParameters = QueryStringMachine.getAll( {

  // TODO: A public query parameter appears to have been removed, was that by design? see https://github.com/phetsims/build-an-atom/issues/329

  // shows the game reward regardless of score
  reward: { type: 'flag' },

  gameLevels: getGameLevelsSchema( BAAConstants.NUMBER_OF_GAME_LEVELS ),

  challengesPerLevel: {
    type: 'number',
    defaultValue: 5
  },

  protons: {
    type: 'number',
    defaultValue: 0,
    isValidValue: ( value: number ) => value >= 0
  },

  neutrons: {
    type: 'number',
    defaultValue: 0,
    isValidValue: ( value: number ) => value >= 0
  },

  electrons: {
    type: 'number',
    defaultValue: 0,
    isValidValue: ( value: number ) => value >= 0
  }

} );

buildAnAtom.register( 'BAAQueryParameters', BAAQueryParameters );

export default BAAQueryParameters;