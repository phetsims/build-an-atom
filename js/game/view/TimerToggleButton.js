// Copyright 2002-2013, University of Colorado Boulder

/**
 * Button for toggling timer on and off.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var FontAwesomeNode = require( 'SUN/FontAwesomeNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var imageLoader = require( 'imageLoader' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var SoundToggleButton = require( 'SCENERY_PHET/SoundToggleButton' );
  var ToggleButton = require( 'SUN/ToggleButton' );

  // Constants
  var X_STROKE_WIDTH = 4;

  /**
   * @param {property} property
   * @param {*} options
   * @constructor
   */
  function TimerToggleButton( property, options ) {

    // This node's size needs to match the size of SoundToggleButton, so the
    // largest icon used in that node is created as a reference.
    var tempSoundToggleButton = new FontAwesomeNode( 'volume_up' );

    // Create the node that represents the timer being on.
    var timerOnNode = new Image( imageLoader.getImage( 'blue-stopwatch.png' ) );
    var timerNodeScale = Math.min( tempSoundToggleButton.width / timerOnNode.width, tempSoundToggleButton.height / timerOnNode.height );
    timerOnNode.scale( timerNodeScale );

    // Create the node that represents the timer being off.
    var timerOffNode = new Node();
    timerOffNode.addChild( timerOnNode );
    var xNode = new Shape();
    xNode.moveTo( 0, 0 );
    xNode.lineTo( tempSoundToggleButton.width - X_STROKE_WIDTH / 2, tempSoundToggleButton.height );
    xNode.moveTo( 0, tempSoundToggleButton.height );
    xNode.lineTo( tempSoundToggleButton.width - X_STROKE_WIDTH / 2, 0 );
    timerOffNode.addChild( new Path( xNode,
      {
        stroke: 'black',
        lineWidth: X_STROKE_WIDTH,
        centerX: timerOffNode.width / 2,
        centerY: timerOffNode.height / 2
      } ) );

    // Create the toggle button.
    ToggleButton.call( this,
      timerOnNode,
      timerOffNode,
      property,
      _.extend( { addRectangle: true, label: 'Timer' }, options ) ); // TODO: i18n
  }

  inherit( ToggleButton, TimerToggleButton );

  return TimerToggleButton;
} );