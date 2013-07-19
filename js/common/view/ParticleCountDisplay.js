// Copyright 2002-2013, University of Colorado Boulder

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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ParticleNode = require( 'common/view/ParticleNode' );
  var Panel = require( 'SUN/Panel' );
  var SharedConstants = require( 'common/SharedConstants' );

  // Constants
  var FONT = new PhetFont( 14 );

  /**
   * @param numberAtom Model representation of the atom
   * @param maxParticles The maximum number of particles to display
   * @param maxWidth The maximum width that this display should reach
   * @constructor
   */
  var ParticleCountDisplay = function ParticleCountDisplay( numberAtom, maxParticles, maxWidth ) {

    Node.call( this ); // Call super constructor.

    var panelContents = new Node();

    //TODO: i18n
    var protonTitle = new Text( 'Protons:', { font: FONT } );
    panelContents.addChild( protonTitle );
    var neutronTitle = new Text( 'Neutrons:', { font: FONT } );
    panelContents.addChild( neutronTitle );
    var electronTitle = new Text( 'Electrons:', { font: FONT } );
    panelContents.addChild( electronTitle );

    // Lay out the labels.
    var maxLabelWidth = Math.max( Math.max( protonTitle.width, neutronTitle.width ), electronTitle.width );
    protonTitle.right = maxLabelWidth;
    protonTitle.top = 0;
    neutronTitle.right = maxLabelWidth;
    neutronTitle.top = protonTitle.bottom;
    electronTitle.right = maxLabelWidth;
    electronTitle.top = neutronTitle.bottom;

    // Figure out the sizes of the particles and the inter-particle
    // spacing based on the max width.
    var totalParticleSpace = maxWidth - protonTitle.right - 10; // TODO: The value of 10 comes from something hard-coded into Panel, fix when Panel is finalized.
    var nucleonRadius = totalParticleSpace / ( (maxParticles * 2) + ( maxParticles - 1) + 2);
    var electronRadius = nucleonRadius * 0.6; // Arbitrarily chosen.
    var interParticleSpacing = nucleonRadius * 3;

    // Add the layer where the particles will live.
    var particleLayer = new Node();
    panelContents.addChild( particleLayer );

    // Add an invisible spacer that will keep the control panel at a min width.
    var spacer = new Rectangle( maxLabelWidth, 0, interParticleSpacing * 3, 1 );

    // Function that updates that displayed particles.
    var updateParticles = function( atom ) {
      particleLayer.removeAllChildren();
      particleLayer.addChild( spacer );
      var addParticles = function( particleType, numParticles, radius, startX, startY ) {
        for ( var i = 0; i < numParticles; i++ ) {
          var particle = new ParticleNode( particleType, radius ).mutate( { pickable: false } );
          particle.y = startY;
          particle.x = startX + i * interParticleSpacing;
          particleLayer.addChild( particle );
        }
      };
      addParticles( 'proton', atom.protonCount, nucleonRadius, protonTitle.right + interParticleSpacing, protonTitle.center.y );
      addParticles( 'neutron', atom.neutronCount, nucleonRadius, neutronTitle.right + interParticleSpacing, neutronTitle.center.y );
      addParticles( 'electron', atom.electronCount, electronRadius, electronTitle.right + interParticleSpacing, electronTitle.center.y );
    };

    // Hook up the update function.
    numberAtom.particleCountProperty.link( function() {
      updateParticles( numberAtom );
    } );

    // Initial update.
    updateParticles( numberAtom );

    // Add it all to a panel.
    this.addChild( new Panel( panelContents, {fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR} ) );
  };

  // Inherit from Node.
  inherit( Node, ParticleCountDisplay );

  return ParticleCountDisplay;
} );