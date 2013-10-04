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
  var SimpleClockIcon = require( 'game/view/SimpleClockIcon' );
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
    var clockRadius = tempSoundToggleButton.width * 0.48; // Multiplier tweaked so that size matches.  Need to generalize if used in common code.
    var timerOnNode = new SimpleClockIcon( clockRadius );

    // Create the node that represents the timer being off.k
    var timerOffNode = new Node();
    var timerOffNodeBackground = new SimpleClockIcon( clockRadius, { opacity: 0.6 } );
    timerOffNode.addChild( timerOffNodeBackground );
    var xNode = new Shape();
    var xNodeWidth = timerOffNode.width * 0.85;
    xNode.moveTo( 0, 0 );
    xNode.lineTo( xNodeWidth, xNodeWidth );
    xNode.moveTo( 0, xNodeWidth );
    xNode.lineTo( xNodeWidth, 0 );
    timerOffNode.addChild( new Path( xNode,
      {
        stroke: 'black',
        lineWidth: X_STROKE_WIDTH,
        lineCap: 'round',
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