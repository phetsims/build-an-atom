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
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var FONT = new BAAFont( 30 );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( gameModel, answerAtom ) {
    Node.call( this ); // Call super constructor.
    this.addChild( new Rectangle( 0, 0, 1000, 1000, 5, 5, { fill: 'pink'} ) );
  }

  // Inherit from Node.
  inherit( Node, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
