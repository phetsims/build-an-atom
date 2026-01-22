// Copyright 2013-2016, University of Colorado Boulder

/**
 * Visual representation of a problem where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var ToElementProblemView = require( 'BUILD_AN_ATOM/game/view/ToElementProblemView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {SchematicToElementProblem} schematicToElementProblem
   * @param {Bounds2} layoutBounds
   * @param {Tandem} tandem
   * @constructor
   */
  function SchematicToElementProblemView( schematicToElementProblem, layoutBounds, tandem ) {
    ToElementProblemView.call( this, schematicToElementProblem, layoutBounds, tandem ); // Call super constructor.

    // Create the model-view transform used by the schematic atom.
    var modelViewTransform = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.5 ),
      0.8 );

    // Add the schematic representation of the atom.
    var nonInteractiveSchematicNode = new NonInteractiveSchematicAtomNode(
      schematicToElementProblem.answerAtom,
      modelViewTransform,
      tandem.createTandem( 'noninteractiveSchematicAtomNode' )
    );
    this.problemPresentationNode.addChild( nonInteractiveSchematicNode );

    this.disposeSchematicToElementProblemView = function(){
      nonInteractiveSchematicNode.dispose();
    };
  }

  buildAnAtom.register( 'SchematicToElementProblemView', SchematicToElementProblemView );

  // Inherit from ToElementProblemView.
  return inherit( ToElementProblemView, SchematicToElementProblemView, {

    // @public
    dispose: function(){
      ToElementProblemView.prototype.dispose.call(this);
      this.disposeSchematicToElementProblemView();
    }
  } );
} );
