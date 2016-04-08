// Copyright 2013-2015, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ToElementProblemView = require( 'BUILD_AN_ATOM/game/view/ToElementProblemView' );

  /**
   * @param {CountsToElementProblem} countsToElementProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToElementProblemView( countsToElementProblem, layoutBounds, tandem ) {
    ToElementProblemView.call( this, countsToElementProblem, layoutBounds, tandem ); // Call super constructor.

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToElementProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = this.periodicTable.centerY;
  }

  buildAnAtom.register( 'CountsToElementProblemView', CountsToElementProblemView );

  // Inherit from ProblemView.
  return inherit( ToElementProblemView, CountsToElementProblemView );
} );
