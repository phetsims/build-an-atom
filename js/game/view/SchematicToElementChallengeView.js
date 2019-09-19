// Copyright 2013-2019, University of Colorado Boulder

/**
 * Visual representation of a challenge where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  const NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  const ToElementChallengeView = require( 'BUILD_AN_ATOM/game/view/ToElementChallengeView' );
  const Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {SchematicToElementChallenge} schematicToElementChallenge
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToElementChallengeView( schematicToElementChallenge, layoutBounds, tandem ) {
    ToElementChallengeView.call( this, schematicToElementChallenge, layoutBounds, tandem );

    // Create the model-view transform used by the schematic atom.
    const modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    const nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode(
      schematicToElementChallenge.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );
    this.challengePresentationNode.addChild( nonInteractiveSchematicNode );

    nonInteractiveSchematicNode.centerX = this.periodicTable.left / 2;
    nonInteractiveSchematicNode.centerY = this.periodicTable.centerY;

    this.disposeSchematicToElementChallengeView = function(){
      nonInteractiveSchematicNode.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToElementChallengeView', SchematicToElementChallengeView );

  // Inherit from ToElementChallengeView.
  return inherit( ToElementChallengeView, SchematicToElementChallengeView, {

    // @public
    dispose: function(){
      this.disposeSchematicToElementChallengeView();
      ToElementChallengeView.prototype.dispose.call(this);
    }
  } );
} );
