// Copyright 2013-2015, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'problem'
 * for the game.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var protonsColonPatternString = require( 'string!BUILD_AN_ATOM/protonsColonPattern' );
  var neutronsColonPatternString = require( 'string!BUILD_AN_ATOM/neutronsColonPattern' );
  var electronsColonPatternString = require( 'string!BUILD_AN_ATOM/electronsColonPattern' );

  // constants
  var MAX_WIDTH = 280;

  function ParticleCountsNode( numberAtom, options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 ) }, options );

    var protonCountTitle = new Text( StringUtils.format( protonsColonPatternString, numberAtom.protonCount ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountTitle );
    //var protonCountText = new Text( numberAtom.protonCount, options.font );
    //this.addChild( protonCountText );
    var neutronCountTitle = new Text( StringUtils.format( neutronsColonPatternString, numberAtom.neutronCount ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountTitle );
    //var neutronCountText = new Text( numberAtom.neutronCount, options.font );
    //this.addChild( neutronCountText );
    var electronCountTitle = new Text( StringUtils.format( electronsColonPatternString, numberAtom.electronCount ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountTitle );
    //var electronCountText = new Text( numberAtom.electronCount, options.font );
    //this.addChild( electronCountText );

    // Layout - Line labels up on left edge, numbers on right edge.
    //var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var interLineSpacing = protonCountTitle.height * 0.9; // Multiplier empirically determined.
    //var numberAreaWidth = new Text( '000', { font: options.font } ).width;
    protonCountTitle.left = 0;
    protonCountTitle.top = 0;
    //protonCountText.bottom = protonCountTitle.bottom;
    //protonCountText.right = maxParticleLabelWidth + numberAreaWidth;
    neutronCountTitle.left = 0;
    neutronCountTitle.top = protonCountTitle.bottom + interLineSpacing;
    //neutronCountText.bottom = neutronCountTitle.bottom;
    //neutronCountText.right = maxParticleLabelWidth + numberAreaWidth;
    electronCountTitle.left = 0;
    electronCountTitle.top = neutronCountTitle.bottom + interLineSpacing;
    //electronCountText.bottom = electronCountTitle.bottom;
    //electronCountText.right = maxParticleLabelWidth + numberAreaWidth;
  }

  // Inherit from Node.
  return inherit( Node, ParticleCountsNode );
} );
