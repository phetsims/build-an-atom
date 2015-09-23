// Copyright 2002-2013, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'BUILD_AN_ATOM/common/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var protonsString = require( 'string!BUILD_AN_ATOM/protons.readout' );
  var neutronsString = require( 'string!BUILD_AN_ATOM/neutrons.readout' );
  var electronsString = require( 'string!BUILD_AN_ATOM/electrons.readout' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function InteractiveParticleCountsNode( options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 ) }, options );

    this.numberAtom = new NumberAtom();

    var protonCountPrompt = new Text( protonsString, options.font );
    this.addChild( protonCountPrompt );
    var protonCountEntry = new NumberEntryNode( this.numberAtom.protonCountProperty, { minValue: 0, maxValue: 99 } );
    this.addChild( protonCountEntry );

    var neutronCountPrompt = new Text( neutronsString, options.font );
    this.addChild( neutronCountPrompt );
    var neutronCountEntry = new NumberEntryNode( this.numberAtom.neutronCountProperty, { minValue: 0, maxValue: 99 } );
    this.addChild( neutronCountEntry );

    var electronCountPrompt = new Text( electronsString, options.font );
    this.addChild( electronCountPrompt );
    var electronCountEntry = new NumberEntryNode( this.numberAtom.electronCountProperty, { minValue: 0, maxValue: 99 } );
    this.addChild( electronCountEntry );

    // Layout
    var maxParticleLabelWidth = Math.max( Math.max( protonCountPrompt.width, neutronCountPrompt.width ), electronCountPrompt.width );

    var interLineSpacing = protonCountPrompt.height * 2; // Multiplier empirically determined.
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
  return inherit( Node, InteractiveParticleCountsNode );
} );
