// Copyright 2025, University of Colorado Boulder

/**
 * SelectedChallenge is the model for the selected challenge in the game. It contains information about the challenge
 * type, the correct answer atom, and the submitted answer atom.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Property from '../../../../axon/js/Property.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import AnswerAtom from './AnswerAtom.js';

export default class SelectedChallenge extends PhetioObject {

  public challengeTypeProperty: Property<string>;
  public correctAnswerAtom: AnswerAtom;
  public submittedAnswerAtom: AnswerAtom;

  public constructor( tandem: Tandem ) {
    super( {
      tandem: tandem,
      phetioState: false
    } );

    this.challengeTypeProperty = new StringProperty( '', {
      phetioReadOnly: true,
      phetioDocumentation: 'The type of challenge selected',
      tandem: tandem.createTandem( 'challengeTypeProperty' )
    } );

    this.correctAnswerAtom = new AnswerAtom( {
      tandem: tandem.createTandem( 'correctAnswerAtom' )
    } );

    this.submittedAnswerAtom = new AnswerAtom( {
      tandem: tandem.createTandem( 'submittedAnswerAtom' )
    } );
  }

  public reset(): void {
    this.challengeTypeProperty.reset();
    this.correctAnswerAtom.reset();
    this.submittedAnswerAtom.reset();
  }
}

buildAnAtom.register( 'SelectedChallenge', SelectedChallenge );