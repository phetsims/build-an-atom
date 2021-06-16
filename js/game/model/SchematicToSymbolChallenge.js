// Copyright 2013-2021, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

class SchematicToSymbolChallenge extends BAAGameChallenge {

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
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToSymbolChallenge', SchematicToSymbolChallenge );

export default SchematicToSymbolChallenge;