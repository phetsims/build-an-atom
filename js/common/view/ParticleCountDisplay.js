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

    Node.call( this, { pickable: false } ); // Call super constructor.

    var panelContents = new Node();

    //TODO: i18n
    var titleOptions = { font: new PhetFont( 14 ) };
    var protonTitle = new Text( 'Protons:', titleOptions );
    panelContents.addChild( protonTitle );
    var neutronTitle = new Text( 'Neutrons:', titleOptions );
    panelContents.addChild( neutronTitle );
    var electronTitle = new Text( 'Electrons:', titleOptions );
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

    // Add an invisible spacer that will keep the control panel at a min width.
    var spacer = new Rectangle( maxLabelWidth, 0, interParticleSpacing * 3, 1 );

    // Add the layer where the particles will live.
    var particleLayer = new Node( { children: [spacer] } );
    panelContents.addChild( particleLayer );

    // stored ParticleNode instances that are positioned correctly, so we just have to add/remove the changed ones (faster than full rebuild)
    var protons = [];
    var neutrons = [];
    var electrons = [];

    // counts of the displayed number of particles
    var protonDisplayCount = 0;
    var neutronDisplayCount = 0;
    var electronDisplayCount = 0;

    // increase the particle count by 1, and return the currently displayed quantity array should be protons, neutrons, or electrons
    function incrementParticle( array, currentQuantity, particleType, radius, startX, startY ) {
      var newIndex = currentQuantity;
      if ( newIndex === array.length ) {
        // we need to create a new particle
        array.push( new ParticleNode( particleType, radius, {
          x: startX + newIndex * interParticleSpacing,
          y: startY
        } ) );
      }
      particleLayer.addChild( array[newIndex] );
      currentQuantity += 1;
      return currentQuantity;
    }

    // decrease the particle count by 1, and return the currently displayed quantity. array should be protons, neutrons, or electrons
    function decrementParticle( array, currentQuantity ) {
      currentQuantity -= 1;
      particleLayer.removeChild( array[currentQuantity] );
      return currentQuantity;
    }

    // Function that updates that displayed particles.
    var updateParticles = function( atom ) {
      // feel free to refactor this, although we'd need to get a passable reference to the counts (that's why there is duplication now)
      while ( atom.protonCount > protonDisplayCount ) {
        protonDisplayCount = incrementParticle( protons, protonDisplayCount, 'proton', nucleonRadius,
          protonTitle.right + interParticleSpacing, protonTitle.center.y );
      }
      while ( atom.protonCount < protonDisplayCount ) {
        protonDisplayCount = decrementParticle( protons, protonDisplayCount );
      }

      while ( atom.neutronCount > neutronDisplayCount ) {
        neutronDisplayCount = incrementParticle( neutrons, neutronDisplayCount, 'neutron', nucleonRadius,
          neutronTitle.right + interParticleSpacing, neutronTitle.center.y );
      }
      while ( atom.neutronCount < neutronDisplayCount ) {
        neutronDisplayCount = decrementParticle( neutrons, neutronDisplayCount );
      }

      while ( atom.electronCount > electronDisplayCount ) {
        electronDisplayCount = incrementParticle( electrons, electronDisplayCount, 'electron', electronRadius,
          electronTitle.right + interParticleSpacing, electronTitle.center.y );
      }
      while ( atom.electronCount < electronDisplayCount ) {
        electronDisplayCount = decrementParticle( electrons, electronDisplayCount );
      }
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
