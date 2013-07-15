// Copyright 2002-2013, University of Colorado Boulder

/**
 * Standard game scoreboard.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var BAAFont = require( 'common/view/BAAFont' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function GameScoreboardNode( gameModel, options ) {

    Node.call( this ); // Call super constructor.

    options = _.extend(
      {
        // Defaults
        backgroundFillColor: 'rgb( 180, 205, 255 )',
        backgroundStroke: 'black',
        backgroundLineWidth: 1
      }, options );

    // Add background.  This is added last since it's sized to fit the child nodes above.
    var background = new Rectangle( 0, 0, 700, 50, 4, 4,
                                    {
                                      fill: options.backgroundFillColor,
                                      stroke: options.backgroundStroke,
                                      lineWidth: options.backgroundLineWidth } );
    this.addChild( background );
    background.moveToBack();
  }

  // Inherit from Node.
  inherit( Node, GameScoreboardNode );

  return GameScoreboardNode;
} );
