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
  var FONT = new BAAFont( 30 );
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

    // Periodic table
    var periodicTableAtom = new NumberAtom();
    var periodicTable = new PeriodicTableNode( periodicTableAtom, 100 );
    this.addChild( periodicTable );

    // Problem title
    var problemTitle = new Text( "Find the element:", { font: FONT } ); // TODO: i18n
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

  }

  // Inherit from Node.
  inherit( Node, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
