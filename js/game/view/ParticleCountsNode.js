// Copyright 2013-2017, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'challenge'
 * for the game.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var electronsColonPatternString = require( 'string!BUILD_AN_ATOM/electronsColonPattern' );
  var neutronsColonPatternString = require( 'string!BUILD_AN_ATOM/neutronsColonPattern' );
  var protonsColonPatternString = require( 'string!BUILD_AN_ATOM/protonsColonPattern' );

  // constants
  var MAX_WIDTH = 280;

  /**
   * @param {NumberAtom} numberAtom
   * @param {Object} [options]
   * @constructor
   */
  function ParticleCountsNode( numberAtom, options ) {

    Node.call( this, options ); // Call super constructor.

    options = _.extend( { font: new PhetFont( 24 ) }, options );

    var protonCountTitle = new Text( StringUtils.format( protonsColonPatternString, numberAtom.protonCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountTitle );
    var neutronCountTitle = new Text( StringUtils.format( neutronsColonPatternString, numberAtom.neutronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountTitle );
    var electronCountTitle = new Text( StringUtils.format( electronsColonPatternString, numberAtom.electronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountTitle );

    // Layout - Line labels up on left edge, numbers on right edge.
    var interLineSpacing = protonCountTitle.height * 0.9; // Multiplier empirically determined.
    protonCountTitle.left = 0;
    protonCountTitle.top = 0;
    neutronCountTitle.left = 0;
    neutronCountTitle.top = protonCountTitle.bottom + interLineSpacing;
    electronCountTitle.left = 0;
    electronCountTitle.top = neutronCountTitle.bottom + interLineSpacing;
  }

  buildAnAtom.register( 'ParticleCountsNode', ParticleCountsNode );

  // Inherit from Node.
  return inherit( Node, ParticleCountsNode );
} );
