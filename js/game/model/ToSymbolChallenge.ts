// Copyright 2025, University of Colorado Boulder

/**
 * ToSymbolChallenge is a base class for challenges in the Build an Atom game where the user must answer the challenge
 * by entering correct values in an interactive chemical symbol.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from './BAAGameChallenge.js';
import GameModel from './GameModel.js';

type SelfOptions = {

  // Whether the proton count, aka the atomic number, is configurable by the user in the interactive chemical symbol.
  isProtonCountConfigurable?: boolean;

  // Whether the mass number, is configurable by the user in the interactive chemical symbol.
  isMassNumberConfigurable?: boolean;

  // Whether the charge is configurable by the user in the interactive chemical symbol.
  isChargeConfigurable?: boolean;
};
export type ToSymbolChallengeOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

abstract class ToSymbolChallenge extends BAAGameChallenge {

  public readonly isProtonCountConfigurable;
  public readonly isMassNumberConfigurable;
  public readonly isChargeConfigurable;

  protected constructor( buildAnAtomGameModel: GameModel, providedOptions: ToSymbolChallengeOptions ) {

    const options = optionize<ToSymbolChallengeOptions, SelfOptions, PhetioObjectOptions>()( {
      isProtonCountConfigurable: false,
      isMassNumberConfigurable: false,
      isChargeConfigurable: false
    }, providedOptions );

    super( buildAnAtomGameModel, options.tandem );

    this.isProtonCountConfigurable = options.isProtonCountConfigurable;
    this.isMassNumberConfigurable = options.isMassNumberConfigurable;
    this.isChargeConfigurable = options.isChargeConfigurable;
  }
}

buildAnAtom.register( 'ToSymbolChallenge', ToSymbolChallenge );

export default ToSymbolChallenge;