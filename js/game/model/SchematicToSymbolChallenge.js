// Copyright 2013-2020, University of Colorado Boulder

/**
 * Type for game challenges where the user is presented with a set of particle
 * counts for an atom and must determine the total charge and enter it in an
 * interactive element symbol.
 *
 * @author John Blanco
 */

import inherit from '../../../../phet-core/js/inherit.js';
import buildAnAtom from '../../buildAnAtom.js';
import SchematicToSymbolChallengeView from '../view/SchematicToSymbolChallengeView.js';
import BAAGameChallenge from './BAAGameChallenge.js';

/**
 * @param {BAAGameModel} buildAnAtomGameModel
 * @param {NumberAtom} answerAtom
 * @param {string} challengeType
 * @param {Tandem} tandem
 * @param {boolean} configurableProtonCount
 * @param {boolean} configurableMassNumber
 * @param {boolean} configurableCharge
 * @constructor
 */
function SchematicToSymbolChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem, configurableProtonCount, configurableMassNumber, configurableCharge ) {
  BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
  this.configurableProtonCount = configurableProtonCount;
  this.configurableMassNumber = configurableMassNumber;
  this.configurableCharge = configurableCharge;
}

buildAnAtom.register( 'SchematicToSymbolChallenge', SchematicToSymbolChallenge );

// Inherit from base class and define the methods for this object.

inherit( BAAGameChallenge, SchematicToSymbolChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new SchematicToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'schematicToSymbolChallengeView' ) );
  }
} );

export default SchematicToSymbolChallenge;