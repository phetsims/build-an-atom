// Copyright 2013-2017, University of Colorado Boulder

/**
 * Type that portrays the current mass number in the view.  It consists of
 * a graphical representation of a scale with a numerical display on it.
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const scaleIcon = require( 'image!BUILD_AN_ATOM/scale.png' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const WIDTH = 122; // In screen coords, which are roughly pixels, empirically determined.
  const READOUT_SIZE = new Dimension2( WIDTH * 0.25, WIDTH * 0.165 ); // In screen coords, which are roughly pixels.

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function MassNumberDisplay( numberAtom, tandem, options ) {

    Node.call( this, { tandem: tandem } );

    // Add the background image, i.e. the scale.
    const scaleImage = new Image( scaleIcon, { tandem: tandem.createTandem( 'scaleImage' ) } );
    scaleImage.scale( WIDTH / scaleImage.width ); // Scale to the targeted width.
    this.addChild( scaleImage );

    // Add the numerical readout window.
    const readoutBackground = new Rectangle( 0, 0, READOUT_SIZE.width, READOUT_SIZE.height, 4, 4, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 1,
      // Position is based on the background image, and may need tweaking if the image is changed.
      bottom: scaleImage.bottom - 6,
      centerX: scaleImage.centerX,
      tandem: tandem.createTandem( 'readoutBackground' )
    } );
    this.addChild( readoutBackground );

    // placeholder text value, will be changed later
    const numericalText = new Text( ' ', {
      font: new PhetFont( { size: 24, weight: 'bold' } ),
      tandem: tandem.createTandem( 'numericalText' )
    } );
    readoutBackground.addChild( numericalText );

    // Add the listeners that will update the numerical display when the charge changes.
    numberAtom.massNumberProperty.link( function( massNumber ) {
      const newText = '' + massNumber; // cast to a string explicitly just in case
      if ( newText !== numericalText.text ) {
        numericalText.text = newText;

        numericalText.resetTransform();
        numericalText.scale( Math.min( READOUT_SIZE.height * 0.9 / numericalText.height,
          READOUT_SIZE.width * 0.9 / numericalText.width ) );
        numericalText.center = new Vector2( READOUT_SIZE.width / 2, READOUT_SIZE.height / 2 );
      }
    } );

    this.mutate( options );
  }

  buildAnAtom.register( 'MassNumberDisplay', MassNumberDisplay );

  // Inherit from Node.
  return inherit( Node, MassNumberDisplay );
} );
