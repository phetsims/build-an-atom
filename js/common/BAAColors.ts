// Copyright 2025, University of Colorado Boulder

/**
 * BAAColors defines the color profile for this sim.
 *
 * @author Agustín Vallejo (PhET Interactive Simulations)
 */

import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import { PARTICLE_COLORS } from '../../../shred/js/model/Particle.js';
import buildAnAtom from '../buildAnAtom.js';

class BAAColors {

  private constructor() {
    // Not intended for instantiation.
  }

  public static readonly screenBackgroundColorProperty = new ProfileColorProperty( buildAnAtom, 'screenBackground', {
    default: Color.WHITE
  } );
  public static readonly symbolsScreenBackgroundColorProperty = new ProfileColorProperty( buildAnAtom, 'symbolsScreenBackgroundColor', {
    default: '#F9FFE5'
  } );
  public static readonly gameScreenBackgroundColorProperty = new ProfileColorProperty( buildAnAtom, 'gameScreenBackgroundColor', {
    default: '#FFFFDF'
  } );

  public static readonly protonColorProperty = new ProfileColorProperty( buildAnAtom, 'protonColor', {
    default: PARTICLE_COLORS.proton
  } );
  public static readonly neutronColorProperty = new ProfileColorProperty( buildAnAtom, 'neutronColor', {
    default: PARTICLE_COLORS.neutron
  } );
  public static readonly electronColorProperty = new ProfileColorProperty( buildAnAtom, 'electronColor', {
    default: PARTICLE_COLORS.electron
  } );

  public static readonly panelBackgroundColorProperty = new ProfileColorProperty( buildAnAtom, 'panelBackground', {
    default: new Color( 241, 250, 254 )
  } );
  public static readonly panelStrokeColorProperty = new ProfileColorProperty( buildAnAtom, 'panelStrokeColor', {
    default: Color.GRAY
  } );

  public static readonly facialStrokeColorProperty = new ProfileColorProperty( buildAnAtom, 'facialStrokeColor', {
    default: new Color( '#666' )
  } );

  public static readonly levelSelectorColorProperty = new ProfileColorProperty( buildAnAtom, 'levelSelectorColor', {
    default: new Color( '#D4AAD4' )
  } );
}

buildAnAtom.register( 'BAAColors', BAAColors );

export default BAAColors;