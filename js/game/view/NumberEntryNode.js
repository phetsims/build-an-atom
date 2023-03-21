// Copyright 2013-2015, University of Colorado Boulder

/**
 * Node that allows a user to enter a numerical value using up/down arrow
 * buttons.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SUN/buttons/ArrowButton' );
  var BAASharedConstants = require( 'BUILD_AN_ATOM/common/BAASharedConstants' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var NUMBER_BOX_SIZE = { width: 55, height: 48 }; // Size empirically determined.
  var NUMBER_FONT = new PhetFont( 28 );

  /**
   * @param {Property.<number>} numberProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   * @constructor
   */
  function NumberEntryNode( numberProperty, tandem, options ) {

    Node.call( this ); // Call super constructor.
    var self = this;

    options = _.extend( {

      // {boolean} - A flag that controls whether the plus sign is shown for positive numbers.  This is generally on
      // when depicting charge, off for other things like mass number or atomic number.  Off (false) means that no sign
      // is depicted.
      showPlusForPositive: false,

      // {boolean} - Controls whether the sign (i.e. +/-) is shown before or after the numeric value.  For charge, the
      // sign is generally shown after, which is the most common use case for this, and hence the default.
      signAfterValue: true,

      // {function} - A function that can be used to change the color used to depict the value based on the value.
      getTextColor: function() { return 'black'; },

      // {number} - min and max supported values
      minValue: Number.NEGATIVE_INFINITY,
      maxValue: Number.POSITIVE_INFINITY
    }, options );

    // Node creation
    var arrowButtonOptions = { arrowHeight: 12, arrowWidth: 15, fireOnHoldDelay: 200 };
    var upArrowButton = new ArrowButton( 'up', function() {
      numberProperty.value = numberProperty.value + 1;
    }, _.extend( {
      tandem: tandem.createTandem( 'upArrowButton' )
    }, arrowButtonOptions ) );
    self.addChild( upArrowButton );
    var downArrowButton = new ArrowButton( 'down', function() {
      numberProperty.value = numberProperty.value - 1;
    }, _.extend( {
      tandem: tandem.createTandem( 'downArrowButton' )
    }, arrowButtonOptions ) );
    self.addChild( downArrowButton );
    var answerValueBackground = new Rectangle( 0, 0, NUMBER_BOX_SIZE.width, NUMBER_BOX_SIZE.height, 4, 4, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1
    } );
    self.addChild( answerValueBackground );
    numberProperty.link( function( newValue ) {
      answerValueBackground.removeAllChildren();

      var minusSign = options.signAfterValue ? BAASharedConstants.MINUS_SIGN : '-';
      var sign = newValue < 0 ? minusSign :
                 newValue > 0 && options.showPlusForPositive ? '+' :
                 '';
      var absoluteValueString = Math.abs( newValue ).toString();
      var valueText = options.signAfterValue ? absoluteValueString + sign : sign + absoluteValueString;
      var textNode = new Text( valueText, {
        font: NUMBER_FONT,
        fill: options.getTextColor( newValue )
      } );
      textNode.scale( Math.min( 1, Math.min( ( answerValueBackground.width * 0.8 ) / textNode.width, ( answerValueBackground.height * 0.9 ) / textNode.height ) ) );
      textNode.centerX = answerValueBackground.width / 2;
      textNode.centerY = answerValueBackground.height / 2;
      answerValueBackground.addChild( textNode );
      upArrowButton.enabled = ( newValue < options.maxValue );
      downArrowButton.enabled = ( newValue > options.minValue );
    } );

    // Layout.  Upper left corner of overall node will be at (0,0).
    var interNodeSpacing = upArrowButton.height * 0.2;
    var totalHeight = Math.max( answerValueBackground.height, upArrowButton.height + downArrowButton.height + interNodeSpacing );
    answerValueBackground.left = 0;
    answerValueBackground.centerY = totalHeight / 2;
    upArrowButton.left = answerValueBackground.right + interNodeSpacing;
    upArrowButton.bottom = totalHeight / 2 - interNodeSpacing / 2;
    downArrowButton.top = totalHeight / 2 + interNodeSpacing / 2;
    downArrowButton.left = answerValueBackground.right + interNodeSpacing;

    // Set up extended touch areas for the up/down buttons.  The areas are
    // set up such that they don't overlap with one another.
    var touchAreaXDilation = upArrowButton.width * 2.5;
    var touchAreaYDilation = upArrowButton.height * 1.45; // Tweaked for minimal overlap in most layouts that use this.
    upArrowButton.touchArea = Shape.rectangle(
      -touchAreaXDilation / 2 + upArrowButton.width / 2,
      -touchAreaYDilation + upArrowButton.height,
      touchAreaXDilation,
      touchAreaYDilation
    );
    downArrowButton.touchArea = Shape.rectangle(
      -touchAreaXDilation / 2 + upArrowButton.width / 2,
      0,
      touchAreaXDilation,
      touchAreaYDilation
    );

    self.mutate( options );
  }

  buildAnAtom.register( 'NumberEntryNode', NumberEntryNode );

  // Inherit from Node.
  return inherit( Node, NumberEntryNode );
} );
