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
import CountsToSymbolChallengeView from '../view/CountsToSymbolChallengeView.js';
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
function CountsToSymbolChallenge( buildAnAtomGameModel, answerAtom, challengeType, tandem, configurableProtonCount, configurableMassNumber, configurableCharge ) {
  BAAGameChallenge.call( this, buildAnAtomGameModel, answerAtom, challengeType, tandem );
  this.configurableProtonCount = configurableProtonCount;
  this.configurableMassNumber = configurableMassNumber;
  this.configurableCharge = configurableCharge;
}

buildAnAtom.register( 'CountsToSymbolChallenge', CountsToSymbolChallenge );

inherit( BAAGameChallenge, CountsToSymbolChallenge, {

  // Create the view needed to visual represent this challenge.
  createView: function( layoutBounds, tandem ) {
    return new CountsToSymbolChallengeView( this, layoutBounds, tandem.createTandem( 'countsToSymbolChallengeView' ) );
  }
} );

export default CountsToSymbolChallenge;