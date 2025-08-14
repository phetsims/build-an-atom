// Copyright 2025, University of Colorado Boulder

/**
 * Set that stores and controls all the ChallengeViews from the game.
 *
 * @author Agustín Vallejo
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import buildAnAtom from '../../buildAnAtom.js';
import BAAGameChallenge from '../model/BAAGameChallenge.js';
import { ChallengeType } from '../model/ChallengeType.js';
import CountsToChargeChallenge from '../model/CountsToChargeChallenge.js';
import CountsToElementChallenge from '../model/CountsToElementChallenge.js';
import CountsToMassNumberChallenge from '../model/CountsToMassNumberChallenge.js';
import CountsToSymbolAllChallenge from '../model/CountsToSymbolAllChallenge.js';
import CountsToSymbolChargeChallenge from '../model/CountsToSymbolChargeChallenge.js';
import CountsToSymbolMassNumberChallenge from '../model/CountsToSymbolMassNumberChallenge.js';
import SchematicToChargeChallenge from '../model/SchematicToChargeChallenge.js';
import SchematicToElementChallenge from '../model/SchematicToElementChallenge.js';
import SchematicToMassNumberChallenge from '../model/SchematicToMassNumberChallenge.js';
import SchematicToSymbolAllChallenge from '../model/SchematicToSymbolAllChallenge.js';
import SchematicToSymbolChargeChallenge from '../model/SchematicToSymbolChargeChallenge.js';
import SchematicToSymbolMassNumberChallenge from '../model/SchematicToSymbolMassNumberChallenge.js';
import SchematicToSymbolProtonCountChallenge from '../model/SchematicToSymbolProtonCountChallenge.js';
import SymbolToCountsChallenge from '../model/SymbolToCountsChallenge.js';
import SymbolToSchematicChallenge from '../model/SymbolToSchematicChallenge.js';
import ChallengeView from './ChallengeView.js';
import CountsToChargeChallengeView from './CountsToChargeChallengeView.js';
import CountsToElementChallengeView from './CountsToElementChallengeView.js';
import CountsToMassNumberChallengeView from './CountsToMassNumberChallengeView.js';
import CountsToSymbolChallengeView from './CountsToSymbolChallengeView.js';
import SchematicToChargeChallengeView from './SchematicToChargeChallengeView.js';
import SchematicToElementChallengeView from './SchematicToElementChallengeView.js';
import SchematicToMassNumberChallengeView from './SchematicToMassNumberChallengeView.js';
import SchematicToSymbolChallengeView from './SchematicToSymbolChallengeView.js';
import SymbolToCountsChallengeView from './SymbolToCountsChallengeView.js';
import SymbolToSchematicChallengeView from './SymbolToSchematicChallengeView.js';

class ChallengeViewSet {

  private challengeViewSet: Map<BAAGameChallenge, ChallengeView> = new Map<BAAGameChallenge, ChallengeView>();

  public constructor( challengeSet: BAAGameChallenge[], layoutBounds: Bounds2, parentTandem: Tandem ) {

    // For each of the challenges in the provided set, create a ChallengeView using the appropriate creator function.
    challengeSet.forEach( ( challenge: BAAGameChallenge ) => {
      const creatorFunction = mapChallengeTypeToViewCreator.get( challenge.challengeType );
      affirm( creatorFunction !== undefined, `No view creator found for challenge type: ${challenge.challengeType}` );
      this.challengeViewSet.set( challenge, creatorFunction( challenge, layoutBounds, parentTandem ) );
    } );
  }

  // Returns the ChallengeView for a given challenge, if it exists. Otherwise, returns undefined.
  public get( challenge: BAAGameChallenge ): ChallengeView | undefined {
    return this.challengeViewSet.get( challenge );
  }
}

// Create a Map that associates each ChallengeType with its corresponding view creator function.
type ChallengeViewCreator = ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) => ChallengeView;
const mapChallengeTypeToViewCreator: Map<ChallengeType, ChallengeViewCreator> = new Map<ChallengeType, ChallengeViewCreator>( [
  [
    'counts-to-element',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToElementChallengeView(
        challenge as CountsToElementChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToElementChallengeView' )
      )
  ],
  [
    'counts-to-charge',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToChargeChallengeView(
        challenge as CountsToChargeChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToChargeChallengeView' )
      )
  ],
  [
    'counts-to-mass-number',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToMassNumberChallengeView(
        challenge as CountsToMassNumberChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToMassNumberChallengeView' )
      )
  ],
  [
    'counts-to-symbol-all',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToSymbolChallengeView(
        challenge as CountsToSymbolAllChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToSymbolAllChallengeView' ) )
  ],
  [
    'counts-to-symbol-charge',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToSymbolChallengeView(
        challenge as CountsToSymbolChargeChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToSymbolChargeChallengeView' )
      )
  ],
  [
    'counts-to-symbol-mass-number',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new CountsToSymbolChallengeView(
        challenge as CountsToSymbolMassNumberChallenge,
        layoutBounds,
        parentTandem.createTandem( 'countsToSymbolMassNumberChallengeView' )
      )
  ],
  [
    'schematic-to-element',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToElementChallengeView(
        challenge as SchematicToElementChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToElementChallengeView' )
      )
  ],
  [
    'schematic-to-charge',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToChargeChallengeView(
        challenge as SchematicToChargeChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToChargeChallengeView' )
      )
  ],
  [
    'schematic-to-mass-number',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToMassNumberChallengeView(
        challenge as SchematicToMassNumberChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToMassNumberChallengeView' )
      )
  ],
  [
    'schematic-to-symbol-all',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToSymbolChallengeView(
        challenge as SchematicToSymbolAllChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToSymbolChallengeView' )
      )
  ],
  [
    'schematic-to-symbol-charge',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToSymbolChallengeView(
        challenge as SchematicToSymbolChargeChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToSymbolChargeChallengeView' )
      )
  ],
  [
    'schematic-to-symbol-mass-number',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToSymbolChallengeView(
        challenge as SchematicToSymbolMassNumberChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToSymbolMassNumberChallengeView' )
      )
  ],
  [
    'schematic-to-symbol-proton-count',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SchematicToSymbolChallengeView(
        challenge as SchematicToSymbolProtonCountChallenge,
        layoutBounds,
        parentTandem.createTandem( 'schematicToSymbolProtonCountChallengeView' )
      )
  ],
  [
    'symbol-to-counts',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SymbolToCountsChallengeView(
        challenge as SymbolToCountsChallenge,
        layoutBounds,
        parentTandem.createTandem( 'symbolToCountsChallengeView' )
      )
  ],
  [
    'symbol-to-schematic',
    ( challenge: BAAGameChallenge, layoutBounds: Bounds2, parentTandem: Tandem ) =>
      new SymbolToSchematicChallengeView(
        challenge as SymbolToSchematicChallenge,
        layoutBounds,
        parentTandem.createTandem( 'symbolToSchematicChallengeView' )
      )
  ]
] );

buildAnAtom.register( 'ChallengeViewSet', ChallengeViewSet );
export default ChallengeViewSet;