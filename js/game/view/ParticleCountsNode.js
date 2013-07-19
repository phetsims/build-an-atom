// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'problem'
 * for the game.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );

  function ParticleCountsNode( numberAtom, options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 )}, options );

    // TODO: i18n
    var protonCountTitle = new Text( 'Protons:', options.font );
    this.addChild( protonCountTitle );
    var protonCountText = new Text( numberAtom.protonCount, options.font );
    this.addChild( protonCountText );
    var neutronCountTitle = new Text( 'Neutrons:', options.font );
    this.addChild( neutronCountTitle );
    var neutronCountText = new Text( numberAtom.neutronCount, options.font );
    this.addChild( neutronCountText );
    var electronCountTitle = new Text( 'Electrons:', options.font );
    this.addChild( electronCountTitle );
    var electronCountText = new Text( numberAtom.electronCount, options.font );
    this.addChild( electronCountText );

    // Layout - Line labels up on left edge, numbers on right edge.
    var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var interLineSpacing = protonCountTitle.height * 0.7; // Multiplier empirically determined.
    var numberAreaWidth = new Text( '000', { font: options.font } ).width;
    protonCountTitle.left = 0;
    protonCountTitle.top = 0;
    protonCountText.bottom = protonCountTitle.bottom;
    protonCountText.right = maxParticleLabelWidth + numberAreaWidth;
    neutronCountTitle.left = 0;
    neutronCountTitle.top = protonCountTitle.bottom + interLineSpacing;
    neutronCountText.bottom = neutronCountTitle.bottom;
    neutronCountText.right = maxParticleLabelWidth + numberAreaWidth;
    electronCountTitle.left = 0;
    electronCountTitle.top = neutronCountTitle.bottom + interLineSpacing;
    electronCountText.bottom = electronCountTitle.bottom;
    electronCountText.right = maxParticleLabelWidth + numberAreaWidth;
  }

  // Inherit from Node.
  inherit( Node, ParticleCountsNode );

  return ParticleCountsNode;
} );
