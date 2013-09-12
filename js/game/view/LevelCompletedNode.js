// Copyright 2002-2013, University of Colorado Boulder
define( function( require ) {
  'use strict';

  // Imports
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var GameStartButton = require( 'game/view/GameStartButton' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var TextButton = require( 'SUN/TextButton' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Utils = require( 'common/Utils' );

  // Constants
  var BACKGROUND_COLOR = new Color( 128, 223, 255 );
  var SIZE = new Dimension2( 400, 500 ); // In screen coordinates (roughly pixels).

  /**
   * @param {BAAGameModel} gameModel
   * @param {Bounds2} layoutBounds
   * @constructor
   */
  var LevelCompletedNode = function StartSubGameNode( gameModel, layoutBounds ) {

    Node.call( this ); // Call super constructor.

    var rounding = SIZE.width * 0.1;
    var background = new Rectangle( 0, 0, SIZE.width, SIZE.height, rounding, rounding,
      {
        fill: BACKGROUND_COLOR,
        stroke: 'black',
        lineWidth: 2
      } );

    this.addChild( background );

    var title = new Text( 'Level Completed', {font: new PhetFont( 20 )} ); // TODO: i18n
    background.addChild( title );

    var score = new Text( 'Score: ' + gameModel.state.score, { font: new PhetFont( 20 ) } );
    background.addChild( score );

    var time = new Text( 'Time: ' + Utils.formatTime( gameModel.elapsedTime ), { font: new PhetFont( 20 ) } );
    background.addChild( time );

    var doneButton = new TextButton( 'OK',
      function() {
        gameModel.state = 'selectSubGame';
      },
      { font: new PhetFont( 24 ), rectangleFillUp: new Color( 128, 223, 255 ) } );
    background.addChild( doneButton );

    // Layout
    title.centerX = background.width / 2;
    title.center.top = 20;
    doneButton.centerX = background.width / 2;
    doneButton.bottom = background.height - 20;
    time.left = 20;
    score.left = 20;
    if ( gameModel.timerEnabled ) {
      time.centerY = background.height * 0.33;
      time.centerY = background.height * 0.67;
    }
    else {
      time.visible = false;
      time.centerY = background.height * 0.67;
    }
  };

  // Inherit from Node.
  inherit( Node, LevelCompletedNode );

  return LevelCompletedNode;
} );
