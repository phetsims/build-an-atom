// Copyright 2013-2019, University of Colorado Boulder

/**
 * Challenge where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ParticleCountsNode = require( 'BUILD_AN_ATOM/game/view/ParticleCountsNode' );
  const ToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/ToElementChallengeView' );

  /**
   * @param {CountsToElementChallenge} countsToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function CountsToElementChallengeView( countsToElementChallenge, layoutBounds, tandem ) {
    ToElementChallengeView.call( this, countsToElementChallenge, layoutBounds, tandem );

    // Particle counts
    var particleCountsNode = new ParticleCountsNode( countsToElementChallenge.answerAtom );
    this.challengePresentationNode.addChild( particleCountsNode );

    // Layout
    particleCountsNode.centerX = this.periodicTable.left / 2;
    particleCountsNode.centerY = this.periodicTable.centerY;
  }

  buildAnAtom.register( 'CountsToElementChallengeView', CountsToElementChallengeView );

  // Inherit from ChallengeView.
  return inherit( ToElementChallengeView, CountsToElementChallengeView );
} );
