// Copyright 2013-2019, University of Colorado Boulder

/**
 * Node that takes a number atom and displays a set of counts for the various
 * subatomic particles.  This is generally used when presenting a 'challenge'
 * for the game.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const electronsColonPatternString = require( 'string!BUILD_AN_ATOM/electronsColonPattern' );
  const neutronsColonPatternString = require( 'string!BUILD_AN_ATOM/neutronsColonPattern' );
  const protonsColonPatternString = require( 'string!BUILD_AN_ATOM/protonsColonPattern' );

  // constants
  const MAX_WIDTH = 280;

  /**
   * @param {NumberAtom} numberAtom
   * @param {Object} [options]
   * @constructor
   */
  function ParticleCountsNode( numberAtom, options ) {

    Node.call( this, options );

    options = merge( { font: new PhetFont( 24 ) }, options );

    const protonCountTitle = new Text( StringUtils.format( protonsColonPatternString, numberAtom.protonCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( protonCountTitle );
    const neutronCountTitle = new Text( StringUtils.format( neutronsColonPatternString, numberAtom.neutronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( neutronCountTitle );
    const electronCountTitle = new Text( StringUtils.format( electronsColonPatternString, numberAtom.electronCountProperty.get() ), {
      font: options.font,
      maxWidth: MAX_WIDTH
    } );
    this.addChild( electronCountTitle );

    // Layout - Line labels up on left edge, numbers on right edge.
    const interLineSpacing = protonCountTitle.height * 0.9; // Multiplier empirically determined.
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
