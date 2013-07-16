// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ToElementProblemView = require( 'game/view/ToElementProblemView' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var PARTICLE_COUNTS_FONT = new BAAFont( 24 );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( countsToElementProblem, layoutBounds ) {
    ToElementProblemView.call( this, countsToElementProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var protonCountTitle = new Text( 'Protons:', PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( protonCountTitle );
    var protonCountText = new Text( countsToElementProblem.answerAtom.protonCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( protonCountText );
    var neutronCountTitle = new Text( 'Neutrons:', PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( neutronCountTitle );
    var neutronCountText = new Text( countsToElementProblem.answerAtom.neutronCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( neutronCountText );
    var electronCountTitle = new Text( 'Electrons:', PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( electronCountTitle );
    var electronCountText = new Text( countsToElementProblem.answerAtom.electronCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( electronCountText );

    //--------------------------- Layout -------------------------------------

    var countIndicatorRightEdge = layoutBounds.width * 0.35; // Controls horizontal position of count indicators, adjust as needed.
    protonCountText.right = countIndicatorRightEdge;
    neutronCountText.right = protonCountText.right;
    electronCountText.right = protonCountText.right;
    protonCountText.centerY = this.periodicTable.top + this.periodicTable.height * 0.25;
    neutronCountText.centerY = this.periodicTable.centerY;
    electronCountText.centerY = this.periodicTable.top + this.periodicTable.height * 0.75;
    var maxNumberWidth = new Text( '99', { font: PARTICLE_COUNTS_FONT } ).width;
    var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var countTitleLeftEdge = countIndicatorRightEdge - maxNumberWidth - maxParticleLabelWidth - 10;
    protonCountTitle.left = countTitleLeftEdge;
    neutronCountTitle.left = countTitleLeftEdge;
    electronCountTitle.left = countTitleLeftEdge;
    protonCountTitle.centerY = protonCountText.centerY;
    neutronCountTitle.centerY = neutronCountText.centerY;
    electronCountTitle.centerY = electronCountText.centerY;
  }

  // Inherit from ProblemView.
  inherit( ToElementProblemView, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
