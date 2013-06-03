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

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ParticleNode = require( 'common/view/ParticleNode' );
  var PanelNode = require( 'SUN/PanelNode' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var _FONT = '20px Arial bold';
  var _PROTON_RADIUS = 5;
  var _NEUTRON_RADIUS = 5;
  var _ELECTRON_RADIUS = 3;
  var _INTER_PARTICLE_SPACING = _PROTON_RADIUS * 2.5;

  /**
   * @param numberAtom Model representation of the atom
   * @constructor
   */
  var ParticleCountDisplay = function( numberAtom ) {

    Node.call( this ); // Call super constructor.

    var panelContents = new Node();

    //TODO: i18n
    var protonTitle = new Text( "Protons:", { font: _FONT } );
    panelContents.addChild( protonTitle );
    var neutronTitle = new Text( "Neutrons:", { font: _FONT } );
    panelContents.addChild( neutronTitle );
    var electronTitle = new Text( "Electrons:", { font: _FONT } );
    panelContents.addChild( electronTitle );

    // Lay out the labels.
    var maxLabelWidth = Math.max( Math.max( protonTitle.width, neutronTitle.width ), electronTitle.width );
    protonTitle.right = maxLabelWidth;
    protonTitle.top = 0;
    neutronTitle.right = maxLabelWidth;
    neutronTitle.top = protonTitle.bottom;
    electronTitle.right = maxLabelWidth;
    electronTitle.top = neutronTitle.bottom;

    // Add the layer where the particles will live.
    var particleLayer = new Node();
    panelContents.addChild( particleLayer );

    // Add an invisible spacer that will keep the control panel at a min width.
    var spacer = new Rectangle( maxLabelWidth, 0, _INTER_PARTICLE_SPACING * 3, 1 );

    // Function that updates that displayed particles.
    var updateParticles = function( atom ) {
      particleLayer.removeAllChildren();
      particleLayer.addChild( spacer );
      var addParticles = function( particleType, numParticles, radius, startX, startY ) {
        for ( var i = 0; i < numParticles; i++ ) {
          var particle = new ParticleNode( particleType, radius );
          particle.y = startY;
          particle.x = startX + i * _INTER_PARTICLE_SPACING;
          particleLayer.addChild( particle );
        }
      };
      addParticles( 'proton', atom.protonCount, _PROTON_RADIUS, protonTitle.right + _INTER_PARTICLE_SPACING, protonTitle.center.y );
      addParticles( 'neutron', atom.neutronCount, _NEUTRON_RADIUS, neutronTitle.right + _INTER_PARTICLE_SPACING, neutronTitle.center.y );
      addParticles( 'electron', atom.electronCount, _ELECTRON_RADIUS, electronTitle.right + _INTER_PARTICLE_SPACING, electronTitle.center.y );
    };

    // Hook up the update function.
    numberAtom.on( 'change:protonCount change:neutronCount change:electronCount', function() {
      updateParticles( numberAtom );
    } );

    // Initial update.
    updateParticles( numberAtom );

    // Add it all to a panel.
    this.addChild( new PanelNode( panelContents, {fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR} ) );
  };

  // Inherit from Node.
  inherit( ParticleCountDisplay, Node );

  return ParticleCountDisplay;
} );