// Copyright 2025, University of Colorado Boulder

/**
 * Set that stores and controls all the ChallengeViews from the game.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import ChallengeView from './ChallengeView.js';

export default class ChallengeViewSet {

  // TODO: Instead of string we should use Challenge itself https://github.com/phetsims/build-an-atom/issues/280
  private challengeViewSet: Map<string, ChallengeView> = new Map<string, ChallengeView>();

  public constructor( challengeSet: BAAGameChallenge[], layoutBounds: Bounds2, tandem: Tandem ) {
    challengeSet.forEach( ( challenge: BAAGameChallenge ) => {
      this.set( challenge, layoutBounds, tandem );
    } );
  }

  private set( challenge: BAAGameChallenge, layoutBounds: Bounds2, tandem: Tandem ): void {
    this.challengeViewSet.set( challenge.challengeType, challenge.createView( layoutBounds, tandem ) );
  }

  // Returns the ChallengeView for a given challenge, if it exists. Otherwise, returns undefined.
  public get( challenge: BAAGameChallenge ): ChallengeView | undefined {
    return this.challengeViewSet.get( challenge.challengeType );
  }

  // Sets all the challenge views to invisible
  public resetVisibilities(): void {
    this.challengeViewSet.forEach( ( view: ChallengeView ) => {
      view.visible = false;
    } );
  }

}

buildAnAtom.register( 'ChallengeViewSet', ChallengeViewSet );