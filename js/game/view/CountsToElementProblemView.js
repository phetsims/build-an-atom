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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ParticleCountsNode = require( 'game/view/ParticleCountsNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ToElementProblemView = require( 'game/view/ToElementProblemView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( countsToElementProblem, layoutBounds ) {
    ToElementProblemView.call( this, countsToElementProblem, layoutBounds ); // Call super constructor.

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToElementProblem.answerAtom );
    this.problemPresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = layoutBounds.width * 0.25;
    particleCountsNode.centerY = this.periodicTable.centerY;
  }

  // Inherit from ProblemView.
  inherit( ToElementProblemView, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
