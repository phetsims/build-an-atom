// Copyright 2013-2025, University of Colorado Boulder

/**
 * Base type for challenges where the user is presented with some sort of
 * information about an atom and must find the atom on a periodic table,
 * and must also determine whether it is an ion or a neutral atom.
 *
 * @author John Blanco
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from './AnswerAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

abstract class ToElementChallenge extends BAAGameChallenge {
  public constructor( buildAnAtomGameModel: GameModel, answerAtom: AnswerAtom, challengeType: string, tandem: Tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
    answerAtom.neutralOrIon = answerAtom.protonCount - answerAtom.electronCount === 0 ? 'neutral' : 'ion';
  }
}

buildAnAtom.register( 'ToElementChallenge', ToElementChallenge );

export default ToElementChallenge;