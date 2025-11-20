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

  private countsToElementView?: CountsToElementChallengeView;
  private countsToChargeView?: CountsToChargeChallengeView;
  private countsToMassNumberView?: CountsToMassNumberChallengeView;
  private countsToSymbolAllView?: CountsToSymbolChallengeView;
  private countsToSymbolChargeView?: CountsToSymbolChallengeView;
  private countsToSymbolMassNumberView?: CountsToSymbolChallengeView;
  private schematicToElementView?: SchematicToElementChallengeView;
  private schematicToChargeView?: SchematicToChargeChallengeView;
  private schematicToMassNumberView?: SchematicToMassNumberChallengeView;
  private schematicToSymbolAllView?: SchematicToSymbolChallengeView;
  private schematicToSymbolChargeView?: SchematicToSymbolChallengeView;
  private schematicToSymbolMassNumberView?: SchematicToSymbolChallengeView;
  private schematicToSymbolProtonCountView?: SchematicToSymbolChallengeView;
  private symbolToCountsView?: SymbolToCountsChallengeView;
  private symbolToSchematicView?: SymbolToSchematicChallengeView;

  public constructor( challengeSet: BAAGameChallenge[], layoutBounds: Bounds2, parentTandem: Tandem ) {
    challengeSet.forEach( challenge => {
      if ( challenge instanceof CountsToElementChallenge ) {
        this.countsToElementView = new CountsToElementChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToElementChallengeView' ) );
      }
      else if ( challenge instanceof CountsToChargeChallenge ) {
        this.countsToChargeView = new CountsToChargeChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToChargeChallengeView' ) );
      }
      else if ( challenge instanceof CountsToMassNumberChallenge ) {
        this.countsToMassNumberView = new CountsToMassNumberChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToMassNumberChallengeView' ) );
      }
      else if ( challenge instanceof CountsToSymbolAllChallenge ) {
        this.countsToSymbolAllView = new CountsToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToSymbolAllChallengeView' ) );
      }
      else if ( challenge instanceof CountsToSymbolChargeChallenge ) {
        this.countsToSymbolChargeView = new CountsToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToSymbolChargeChallengeView' ) );
      }
      else if ( challenge instanceof CountsToSymbolMassNumberChallenge ) {
        this.countsToSymbolMassNumberView = new CountsToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'countsToSymbolMassNumberChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToElementChallenge ) {
        this.schematicToElementView = new SchematicToElementChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToElementChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToChargeChallenge ) {
        this.schematicToChargeView = new SchematicToChargeChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToChargeChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToMassNumberChallenge ) {
        this.schematicToMassNumberView = new SchematicToMassNumberChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToMassNumberChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToSymbolAllChallenge ) {
        this.schematicToSymbolAllView = new SchematicToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToSymbolAllChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToSymbolChargeChallenge ) {
        this.schematicToSymbolChargeView = new SchematicToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToSymbolChargeChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToSymbolMassNumberChallenge ) {
        this.schematicToSymbolMassNumberView = new SchematicToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToSymbolMassNumberChallengeView' ) );
      }
      else if ( challenge instanceof SchematicToSymbolProtonCountChallenge ) {
        this.schematicToSymbolProtonCountView = new SchematicToSymbolChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'schematicToSymbolProtonCountChallengeView' ) );
      }
      else if ( challenge instanceof SymbolToCountsChallenge ) {
        this.symbolToCountsView = new SymbolToCountsChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'symbolToCountsChallengeView' ) );
      }
      else if ( challenge instanceof SymbolToSchematicChallenge ) {
        this.symbolToSchematicView = new SymbolToSchematicChallengeView( challenge, layoutBounds, parentTandem.createTandem( 'symbolToSchematicChallengeView' ) );
      }
      else {
        affirm( false, 'ChallengeViewSet: Unknown challenge type: ' + challenge.constructor.name );
      }
    } );
  }

  public get( challenge: BAAGameChallenge ): ChallengeView {
    return challenge instanceof CountsToElementChallenge ? this.countsToElementView! :
           challenge instanceof CountsToChargeChallenge ? this.countsToChargeView! :
           challenge instanceof CountsToMassNumberChallenge ? this.countsToMassNumberView! :
           challenge instanceof CountsToSymbolAllChallenge ? this.countsToSymbolAllView! :
           challenge instanceof CountsToSymbolChargeChallenge ? this.countsToSymbolChargeView! :
           challenge instanceof CountsToSymbolMassNumberChallenge ? this.countsToSymbolMassNumberView! :
           challenge instanceof SchematicToElementChallenge ? this.schematicToElementView! :
           challenge instanceof SchematicToChargeChallenge ? this.schematicToChargeView! :
           challenge instanceof SchematicToMassNumberChallenge ? this.schematicToMassNumberView! :
           challenge instanceof SchematicToSymbolAllChallenge ? this.schematicToSymbolAllView! :
           challenge instanceof SchematicToSymbolChargeChallenge ? this.schematicToSymbolChargeView! :
           challenge instanceof SchematicToSymbolMassNumberChallenge ? this.schematicToSymbolMassNumberView! :
           challenge instanceof SchematicToSymbolProtonCountChallenge ? this.schematicToSymbolProtonCountView! :
           challenge instanceof SymbolToCountsChallenge ? this.symbolToCountsView! :
           challenge instanceof SymbolToSchematicChallenge ? this.symbolToSchematicView! :
           ( () => { throw new Error( `Unknown challenge type: ${challenge.constructor.name}` ); } )();
  }
}


buildAnAtom.register( 'ChallengeViewSet', ChallengeViewSet );
export default ChallengeViewSet;