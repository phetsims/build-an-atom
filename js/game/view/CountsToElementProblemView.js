// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var assert = require( "ASSERT/assert" )( "build-an-atom" );
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var TITLE_FONT = new BAAFont( 30 );
  var PARTICLE_COUNTS_FONT = new BAAFont( 24 );
  var INSET = 10;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( gameModel, answerAtom, layoutBounds ) {
    Node.call( this ); // Call super constructor.

    // Layout assumes that bounds start at 0, 0 - so verify that this is true.
    // TODO: Replace this with an assert.
    if ( layoutBounds.minX !== 0 || layoutBounds.minY !== 0 ) {
      console.log( "Error: Layout bounds must start at 0, 0" );
    }

    // Particle counts
    var protonCountTitle = new Text( "Protons:", PARTICLE_COUNTS_FONT );
    this.addChild( protonCountTitle );
    var protonCountText = new Text( answerAtom.protonCount, PARTICLE_COUNTS_FONT );
    this.addChild( protonCountText );
    var neutronCountTitle = new Text( "Neutrons:", PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountTitle );
    var neutronCountText = new Text( answerAtom.neutronCount, PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountText );
    var electronCountTitle = new Text( "Electrons:", PARTICLE_COUNTS_FONT );
    this.addChild( electronCountTitle );
    var electronCountText = new Text( answerAtom.electronCount, PARTICLE_COUNTS_FONT );
    this.addChild( electronCountText );

    // Periodic table
    var periodicTableAtom = new NumberAtom();
    var periodicTable = new PeriodicTableNode( periodicTableAtom, 100 );
    this.addChild( periodicTable );

    // Problem title
    var problemTitle = new Text( "Find the element:", { font: TITLE_FONT } ); // TODO: i18n
    this.addChild( problemTitle );

    // Layout
    periodicTable.right = layoutBounds.width - INSET;
    periodicTable.centerY = layoutBounds.height / 2;
    var maxTitleWidth = periodicTable.width * 0.9;
    if ( problemTitle.width > maxTitleWidth ) {
      problemTitle.scale( maxTitleWidth / problemTitle.width );
    }
    problemTitle.centerX = periodicTable.centerX;
    problemTitle.bottom = periodicTable.top - 30; // Offset empirically determined.

    var countIndicatorRightEdge = layoutBounds.width * 0.25; // Controls horizontal position of count indicators, adjust as needed.
    protonCountText.right = countIndicatorRightEdge;
    neutronCountText.right = protonCountText.right;
    electronCountText.right = protonCountText.right;
    protonCountText.centerY = periodicTable.top + periodicTable.height * 0.25;
    neutronCountText.centerY = periodicTable.centerY;
    electronCountText.centerY = periodicTable.top + periodicTable.height * 0.75;
    var maxNumberWidth = new Text( "99", { font: PARTICLE_COUNTS_FONT } ).width;
    var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var countTitleLeftEdge = countIndicatorRightEdge - maxNumberWidth - maxParticleLabelWidth - 10;
    protonCountTitle.left = countTitleLeftEdge;
    neutronCountTitle.left = countTitleLeftEdge;
    electronCountTitle.left = countTitleLeftEdge;
    protonCountTitle.centerY = protonCountText.centerY;
    neutronCountTitle.centerY = neutronCountText.centerY;
    electronCountTitle.centerY = electronCountText.centerY;
  }

  // Inherit from Node.
  inherit( Node, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
