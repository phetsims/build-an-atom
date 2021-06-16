// Copyright 2017-2021, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */

import buildAnAtom from '../../buildAnAtom.js';
import SchematicToElementChallengeView from '../view/SchematicToElementChallengeView.js';
import ToElementChallenge from './ToElementChallenge.js';

class SchematicToElementChallenge extends ToElementChallenge {

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
    return new SchematicToElementChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToElementChallengeView' ) );
  }
}

buildAnAtom.register( 'SchematicToElementChallenge', SchematicToElementChallenge );

export default SchematicToElementChallenge;