// Copyright 2002-2013, University of Colorado Boulder

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

  // Imports
  var AtomNode = require( 'BUILD_AN_ATOM/common/view/AtomNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NonInteractiveSchematicAtomNode = require( 'BUILD_AN_ATOM/game/view/NonInteractiveSchematicAtomNode' );
  var ToElementProblemView = require( 'BUILD_AN_ATOM/game/view/ToElementProblemView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToElementProblemView( schematicToElementProblem, layoutBounds ) {
    ToElementProblemView.call( this, schematicToElementProblem, layoutBounds ); // Call super constructor.

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      Vector2.ZERO,
      new Vector2( layoutBounds.width * 0.275, layoutBounds.height * 0.45 ),
      0.8 );

    // Add the schematic representation of the atom.
    this.problemPresentationNode.addChild( new NonInteractiveSchematicAtomNode( schematicToElementProblem.answerAtom, mvt ) );
  }

  // Inherit from ToElementProblemView.
  return inherit( ToElementProblemView, SchematicToElementProblemView );
} );
