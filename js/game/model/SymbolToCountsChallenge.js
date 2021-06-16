// Copyright 2017-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a chemical symbol
 * including atomic number, mass number, and charge, and needs to determine
 * the number of protons, neutrons, and electrons that comprise the atom.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import SymbolToCountsChallengeView from '../view/SymbolToCountsChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class SymbolToCountsChallenge extends BAAGameChallenge {

  /**
   * @param {GameModel} buildAnAtomGameModel
   * @param {NumberAtom} answerAtom
   * @param {string} challengeType
   * @param {Tandem} tandem
   */
  constructor( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
    super( buildAnAtomGameModel, answerAtom, challengeType, tandem );
  }

  /**
   * Create the view needed to visual represent this challenge.
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @returns {CountsToChargeChallengeView}
   * @public
   */
  createView( layoutBounds, tandem ) {
    return new SymbolToCountsChallengeView( this, layoutBounds, tandem.createTandem( 'symbolToCountsChallengeView' ) );
  }
}

buildAnAtom.register( 'SymbolToCountsChallenge', SymbolToCountsChallenge );

export default SymbolToCountsChallenge;