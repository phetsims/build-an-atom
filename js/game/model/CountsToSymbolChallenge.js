// Copyright 2013-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class CountsToSymbolChallenge extends BAAGameChallenge {

  /**
   * @param {GameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   * @param {boolean} configurableProtonCount
   * @param {boolean} configurableMassNumber
   * @param {boolean} configurableCharge
   */
  constructor( buildAnAtomGameModel, answerAtom, challengeType, tandem, configurableProtonCount, configurableMassNumber, configurableCharge ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
    this.configurableProtonCount = configurableProtonCount;
    this.configurableMassNumber = configurableMassNumber;
    this.configurableCharge = configurableCharge;
  }

  /**
   * Create the view needed to visual represent this challenge.
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @returns {CountsToChargeChallengeView}
   * @public
   */
  createView( layoutBounds, tandem ) {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

export default CountsToSymbolChallenge;