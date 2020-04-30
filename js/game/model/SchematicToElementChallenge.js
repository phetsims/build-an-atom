// Copyright 2017-2020, University of Colorado Boulder

/**
 * Challenge where the user is presented with a schematic representation of an
 * atom (which looks much like the atoms constructed on the 1st tab), and must
 * find the represented element on a periodic table.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToElementChallengeView from '../view/SchematicToElementChallengeView.js';
import ToElementChallenge from './ToElementChallenge.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @constructor
 */
function SchematicToElementChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem ) {
  ToElementChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
}

buildAnAtom.register( 'SchematicToElementChallenge', SchematicToElementChallenge );

inherit( ToElementChallenge, SchematicToElementChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new SchematicToElementChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToElementChallengeView' ) );
  }
} );

export default SchematicToElementChallenge;