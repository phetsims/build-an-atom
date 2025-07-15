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

  // shows the game reward regardless of score
  reward: { type: 'flag' },

  gameLevels: getGameLevelsSchema( BAAConstants.NUMBER_OF_GAME_LEVELS ),

  challengesPerLevel: {
    type: 'number',
    defaultValue: 5
  }
} );

buildAnAtom.register( 'BAAQueryParameters', BAAQueryParameters );

export default BAAQueryParameters;