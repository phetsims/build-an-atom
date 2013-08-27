// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 */
define( function( require ) {
  'use strict';

  // Imports
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var NumberEntryNode = require( 'game/view/NumberEntryNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );

  function InteractiveParticleCountsNode( options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 )}, options );

    this.numberAtom = new NumberAtom();

    // TODO: i18n
    var protonCountPrompt = new Text( 'Protons:', options.font );
    this.addChild( protonCountPrompt );
    var protonCountEntry = new NumberEntryNode( this.numberAtom.protonCountProperty );
    this.addChild( protonCountEntry );

    var neutronCountPrompt = new Text( 'Neutrons:', options.font );
    this.addChild( neutronCountPrompt );
    var neutronCountEntry = new NumberEntryNode( this.numberAtom.neutronCountProperty );
    this.addChild( neutronCountEntry );

    var electronCountPrompt = new Text( 'Electrons:', options.font );
    this.addChild( electronCountPrompt );
    var electronCountEntry = new NumberEntryNode( this.numberAtom.electronCountProperty );
    this.addChild( electronCountEntry );

    // Layout
    var maxParticleLabelWidth = Math.max( Math.max( protonCountPrompt.width, neutronCountPrompt.width ), electronCountPrompt.width );
    var interLineSpacing = protonCountPrompt.height * 1.3; // Multiplier empirically determined.
    protonCountPrompt.left = 0;
    protonCountPrompt.top = 0;
    protonCountEntry.centerY = protonCountPrompt.centerY;
    protonCountEntry.left = maxParticleLabelWidth + protonCountPrompt.height;
    neutronCountPrompt.left = 0;
    neutronCountPrompt.top = protonCountPrompt.bottom + interLineSpacing;
    neutronCountEntry.centerY = neutronCountPrompt.centerY;
    neutronCountEntry.left = protonCountEntry.left;
    electronCountPrompt.left = 0;
    electronCountPrompt.top = neutronCountPrompt.bottom + interLineSpacing;
    electronCountEntry.centerY = electronCountPrompt.centerY;
    electronCountEntry.left = protonCountEntry.left;
  }

  // Inherit from Node.
  inherit( Node, InteractiveParticleCountsNode );

  return InteractiveParticleCountsNode;
} );
