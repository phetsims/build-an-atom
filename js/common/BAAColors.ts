// Copyright 2025, University of Colorado Boulder

/**
 * BAAColors defines the color profile for this sim.
 *
 * @author Agustín Vallejo
 */

import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import { PARTICLE_COLORS } from '../../../shred/js/model/Particle.js';
import buildAnAtom from '../buildAnAtom.js';

const BAAColors = {

  // background color for screens in this sim
  screenBackgroundColorProperty: new ProfileColorProperty( buildAnAtom, 'screenBackground', {
    default: Color.WHITE
  } ),

  symbolsScreenBackgroundColorProperty: new ProfileColorProperty( buildAnAtom, 'symbolsScreenBackgroundColor', {
    default: '#F9FFE5'
  } ),

  gameScreenBackgroundColorProperty: new ProfileColorProperty( buildAnAtom, 'gameScreenBackgroundColor', {
    default: '#FFFFDF'
  } ),

  // particle colors
  protonColorProperty: new ProfileColorProperty( buildAnAtom, 'protonColor', {
    default: PARTICLE_COLORS.proton
  } ),
  neutronColorProperty: new ProfileColorProperty( buildAnAtom, 'neutronColor', {
    default: PARTICLE_COLORS.neutron
  } ),
  electronColorProperty: new ProfileColorProperty( buildAnAtom, 'electronColor', {
    default: PARTICLE_COLORS.electron
  } ),


  // background color for panels in this sim
  panelBackgroundColorProperty: new ProfileColorProperty( buildAnAtom, 'panelBackground', {
    default: new Color( 241, 250, 254 )
  } ),
  panelStrokeColorProperty: new ProfileColorProperty( buildAnAtom, 'panelStrokeColor', {
    default: Color.GRAY
  } ),

  shellModelTextHighlightColorProperty: new ProfileColorProperty( buildAnAtom, 'shellModelTextHighlightColor', {
    default: new Color( 189, 255, 255 )
  } ),

  bucketTextBackgroundColorProperty: new ProfileColorProperty( buildAnAtom, 'bucketTextBackgroundColor', {
    default: new Color( 0, 0, 0, 0.2 )
  } ),

  facialStrokeColorProperty: new ProfileColorProperty( buildAnAtom, 'facialStrokeColor', {
    default: new Color( '#666' )
  } ),
  
  levelSelectorColorProperty: new ProfileColorProperty( buildAnAtom, 'levelSelectorColor', {
    default: new Color( '#D4AAD4' )
  } )
};

buildAnAtom.register( 'BAAColors', BAAColors );

export default BAAColors;