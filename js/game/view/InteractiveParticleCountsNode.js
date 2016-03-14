// Copyright 2013-2015, University of Colorado Boulder

/**
 * Node for entering numbers of protons, neutrons, electrons.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberEntryNode = require( 'BUILD_AN_ATOM/game/view/NumberEntryNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );

  // strings
  var protonsColonString = require( 'string!BUILD_AN_ATOM/protonsColon' );
  var neutronsColonString = require( 'string!BUILD_AN_ATOM/neutronsColon' );
  var electronsColonString = require( 'string!BUILD_AN_ATOM/electronsColon' );

  // constants
  var MAX_WIDTH = 200;

  /**
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function InteractiveParticleCountsNode( tandem, options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 ) }, options );

    this.numberAtom = new NumberAtom( { tandem: tandem.createTandem( 'numberAtom' ) } );

    var protonCountPrompt = new Text( protonsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountPrompt );
    var protonCountEntryNode = new NumberEntryNode(
      this.numberAtom.protonCountProperty,
      tandem.createTandem( 'protonCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( protonCountEntryNode );

    var neutronCountPrompt = new Text( neutronsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountPrompt );
    var neutronCountEntryNode = new NumberEntryNode( this.numberAtom.neutronCountProperty,
      tandem.createTandem( 'neutronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( neutronCountEntryNode );

    var electronCountPrompt = new Text( electronsColonString, {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountPrompt );
    var electronCountEntryNode = new NumberEntryNode(
      this.numberAtom.electronCountProperty,
      tandem.createTandem( 'electronCountEntryNode' ), {
        minValue: 0,
        maxValue: 99
      } );
    this.addChild( electronCountEntryNode );

    // Layout
    var maxParticleLabelWidth = Math.max( Math.max( protonCountPrompt.width, neutronCountPrompt.width ), electronCountPrompt.width );

    var interLineSpacing = protonCountEntryNode.height; // Multiplier empirically determined.
    protonCountPrompt.left = 0;
    neutronCountPrompt.left = 0;
    electronCountPrompt.left = 0;
    protonCountEntryNode.top = 0;
    neutronCountEntryNode.top = protonCountEntryNode.centerY + interLineSpacing;
    electronCountEntryNode.top = neutronCountEntryNode.centerY + interLineSpacing;
    protonCountPrompt.centerY = protonCountEntryNode.centerY;
    neutronCountPrompt.centerY = neutronCountEntryNode.centerY;
    electronCountPrompt.centerY = electronCountEntryNode.centerY;
    protonCountEntryNode.left = maxParticleLabelWidth + protonCountPrompt.height;
    neutronCountEntryNode.left = protonCountEntryNode.left;
    electronCountEntryNode.left = protonCountEntryNode.left;
    //protonCountPrompt.top = 0;
    //protonCountEntryNode.centerY = protonCountPrompt.centerY;
    //protonCountEntryNode.left = maxParticleLabelWidth + protonCountPrompt.height;
    //neutronCountPrompt.left = 0;
    //neutronCountPrompt.top = protonCountPrompt.bottom + interLineSpacing;
    //neutronCountEntryNode.centerY = neutronCountPrompt.centerY;
    //neutronCountEntryNode.left = protonCountEntryNode.left;
    //electronCountPrompt.left = 0;
    //electronCountPrompt.top = neutronCountPrompt.bottom + interLineSpacing;
    //electronCountEntryNode.centerY = electronCountPrompt.centerY;
    //electronCountEntryNode.left = protonCountEntryNode.left;
  }

  buildAnAtom.register( 'InteractiveParticleCountsNode', InteractiveParticleCountsNode );

  // Inherit from Node.
  return inherit( Node, InteractiveParticleCountsNode );
} );
