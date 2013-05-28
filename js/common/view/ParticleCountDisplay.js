// Copyright 2002-2013, University of Colorado

/**
 * A node that presents a graphical representation of an atom's configuration.
 * It looks somewhat like a bar graph that grows to the right except that the
 * "bars" are actually a line of particles.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ParticleView = require( 'common/view/ParticleView' );
  var PanelNode = require( 'SUN/PanelNode' );

  /**
   * @param numberAtom Model representation of the atom
   * @constructor
   */
  var ParticleCountDisplay = function( numberAtom ) {

    Node.call( this ); // Call super constructor.
    var thisParticleCountDisplay = this;

    //TODO: i18n
    var protonTitle = new Text( "Protons:" );
    this.addChild( protonTitle );
  }

  // Inherit from Node.
  inherit( ParticleCountDisplay, Node );

  return ParticleCountDisplay;
} );