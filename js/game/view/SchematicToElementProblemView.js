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
  var AtomNode = require( 'common/view/AtomNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NonInteractiveSchematicAtomNode = require( 'game/view/NonInteractiveSchematicAtomNode' );
  var ToElementProblemView = require( 'game/view/ToElementProblemView' );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToElementProblemView( schematicToElementProblem, layoutBounds ) {
    ToElementProblemView.call( this, schematicToElementProblem, layoutBounds ); // Call super constructor.

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: layoutBounds.width * 0.275, y: layoutBounds.height * 0.45 },
      0.8 );

    // Add the schematic representation of the atom.
    this.addChild( new NonInteractiveSchematicAtomNode( schematicToElementProblem.answerAtom, mvt ) );
  }

  // Inherit from ToElementProblemView.
  inherit( ToElementProblemView, SchematicToElementProblemView );

  return SchematicToElementProblemView;
} );
