// Copyright 2025, University of Colorado Boulder

/**
 * View-specific Properties for how the atom is displayed.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import { ElectronShellDepiction, electronShellDepictionValues } from '../../../../shred/js/view/AtomNode.js';
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
    this.electronModelProperty = new Property<ElectronShellDepiction>( 'orbits', {
      tandem: tandem.createTandem( 'electronModelProperty' ),
      phetioValueType: StringUnionIO( electronShellDepictionValues ),
      validValues: electronShellDepictionValues,
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

buildAnAtom.register( 'AtomViewProperties', AtomViewProperties );

export default AtomViewProperties;