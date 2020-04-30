// Copyright 2017-2020, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * determine the charge.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToChargeChallengeView from '../view/SchematicToChargeChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @constructor
 */
function SchematicToChargeChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
  BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
}

buildAnAtom.register( 'SchematicToChargeChallenge', SchematicToChargeChallenge );

inherit( BAAGameChallenge, SchematicToChargeChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new SchematicToChargeChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToChargeChallengeView' ) );
  }
} );

export default SchematicToChargeChallenge;