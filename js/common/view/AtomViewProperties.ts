// Copyright 2025, University of Colorado Boulder

/**
 * View-specific Properties for how the atom is displayed.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import { ElectronShellDepiction, ElectronShellDepictionValues } from '../../../../shred/js/view/AtomNode.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import StringUnionIO from '../../../../tandem/js/types/StringUnionIO.js';
import buildAnAtom from '../../buildAnAtom.js';

class AtomViewProperties {

  // Properties that control the visibility of labels in the view.
  public readonly elementNameVisibleProperty: BooleanProperty;
  public readonly neutralAtomOrIonVisibleProperty: BooleanProperty;
  public readonly nuclearStabilityVisibleProperty: BooleanProperty;

  // Property that controls the depiction of electron shells in the view, either particles or as a cloud.
  public readonly electronModelProperty: Property<ElectronShellDepiction>;

  public constructor( tandem: Tandem ) {

    this.elementNameVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'elementNameVisibleProperty' ),
      phetioFeatured: true
    } );
    this.neutralAtomOrIonVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'neutralAtomOrIonVisibleProperty' ),
      phetioFeatured: true
    } );
    this.nuclearStabilityVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'nuclearStabilityVisibleProperty' ),
      phetioFeatured: true
    } );
    this.electronModelProperty = new Property<ElectronShellDepiction>( 'shells', {
      tandem: tandem.createTandem( 'electronModelProperty' ),
      phetioValueType: StringUnionIO( ElectronShellDepictionValues ),
      validValues: ElectronShellDepictionValues,
      phetioFeatured: true
    } );
  }
  
  public reset(): void {
    this.elementNameVisibleProperty.reset();
    this.neutralAtomOrIonVisibleProperty.reset();
    this.nuclearStabilityVisibleProperty.reset();
    this.electronModelProperty.reset();
  }
}

/** Reduced set of AtomViewProperties for use in more constrained views, like the Game Screen. */
export class ReducedAtomViewProperties {
  public readonly elementNameVisibleProperty: BooleanProperty = new BooleanProperty( false );
  public readonly neutralAtomOrIonVisibleProperty: BooleanProperty = new BooleanProperty( false );
  public readonly nuclearStabilityVisibleProperty: BooleanProperty = new BooleanProperty( false );
  public readonly electronModelProperty: Property<ElectronShellDepiction> = new Property<ElectronShellDepiction>( 'shells' );

  public constructor() {
    // no-op
  }

  public reset(): void {
    // no-op
  }
}

buildAnAtom.register( 'AtomViewProperties', AtomViewProperties );

export default AtomViewProperties;