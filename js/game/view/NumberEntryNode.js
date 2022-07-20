// Copyright 2013-2022, University of Colorado Boulder

/**
 * Node that allows a user to enter a numerical value using up/down arrow
 * buttons.
 *
 * @author John Blanco
 */

import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import ArrowButton from '../../../../sun/js/buttons/ArrowButton.js';
import buildAnAtom from '../../buildAnAtom.js';

// constants
const NUMBER_BOX_SIZE = { width: 55, height: 48 }; // Size empirically determined.
const NUMBER_FONT = new PhetFont( 28 );

class NumberEntryNode extends Node {

  /**
   * @param {Property.<number>} numberProperty
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberProperty, tandem, options ) {

    super();

    options = merge( {
      prependPlusSign: false, // Generally set to true when depicting charge.
      getTextColor: () => 'black',
      minValue: Number.NEGATIVE_INFINITY,
      maxValue: Number.POSITIVE_INFINITY
    }, options );

    // Node creation
    const arrowButtonOptions = { arrowHeight: 12, arrowWidth: 15, fireOnHoldDelay: 200 };
    const upArrowButton = new ArrowButton( 'up', () => {
      numberProperty.value = numberProperty.value + 1;
    }, merge( {
      tandem: tandem.createTandem( 'upArrowButton' )
    }, arrowButtonOptions ) );
    this.addChild( upArrowButton );
    const downArrowButton = new ArrowButton( 'down', () => {
      numberProperty.value = numberProperty.value - 1;
    }, merge( {
      tandem: tandem.createTandem( 'downArrowButton' )
    }, arrowButtonOptions ) );
    this.addChild( downArrowButton );
    const answerValueBackground = new Rectangle( 0, 0, NUMBER_BOX_SIZE.width, NUMBER_BOX_SIZE.height, 4, 4, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1
    } );
    this.addChild( answerValueBackground );

    const numberPropertyListener = newValue => {
      answerValueBackground.removeAllChildren();
      const prepend = options.prependPlusSign && newValue > 0 ? '+' : '';
      const textNode = new Text( prepend + newValue, {
        font: NUMBER_FONT,
        fill: options.getTextColor( newValue )
      } );
      textNode.scale( Math.min( 1, Math.min( ( answerValueBackground.width * 0.8 ) / textNode.width, ( answerValueBackground.height * 0.9 ) / textNode.height ) ) );
      textNode.centerX = answerValueBackground.width / 2;
      textNode.centerY = answerValueBackground.height / 2;
      answerValueBackground.addChild( textNode );
      upArrowButton.enabled = ( newValue < options.maxValue );
      downArrowButton.enabled = ( newValue > options.minValue );
    };
    numberProperty.link( numberPropertyListener );

    // Layout.  Upper left corner of overall node will be at (0,0).
    const interNodeSpacing = upArrowButton.height * 0.2;
    const totalHeight = Math.max( answerValueBackground.height, upArrowButton.height + downArrowButton.height + interNodeSpacing );
    answerValueBackground.left = 0;
    answerValueBackground.centerY = totalHeight / 2;
    upArrowButton.left = answerValueBackground.right + interNodeSpacing;
    upArrowButton.bottom = totalHeight / 2 - interNodeSpacing / 2;
    downArrowButton.top = totalHeight / 2 + interNodeSpacing / 2;
    downArrowButton.left = answerValueBackground.right + interNodeSpacing;

    // Set up extended touch areas for the up/down buttons.  The areas are
    // set up such that they don't overlap with one another.
    const touchAreaXDilation = upArrowButton.width * 2.5;
    const touchAreaYDilation = upArrowButton.height * 1.45; // Tweaked for minimal overlap in most layouts that use this.
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

    // @private called by dispose
    this.disposeNumberEntryNode = () => {
      numberProperty.unlink( numberPropertyListener );
      upArrowButton.dispose();
      downArrowButton.dispose();
    };

    this.mutate( options );
  }

  /**
   * release references
   * @public
   */
  dispose() {
    this.disposeNumberEntryNode();

    super.dispose();
  }
}

buildAnAtom.register( 'NumberEntryNode', NumberEntryNode );

export default NumberEntryNode;