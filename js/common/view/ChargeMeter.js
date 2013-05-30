// Copyright 2002-2013, University of Colorado

/**
 * Type that represents a change meter that displays the charge of the
 * provided atom.
 */
define( function( require ) {

  // Imports
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var BAAImages = require( "common/BAAImages" );

  // Constants
  var _WIDTH = 70; // In screen coords, which are roughly pixels.

  var ChargeMeter = function( atom ) {

    Node.call( this ); // Call super constructor.
    var thisChargeMeter = this;

    // Add the background image.
    var scaleImage = new Image( BAAImages.getImage( "charge_meter_short_background.svg" ) );
    scaleImage.scale( _WIDTH / scaleImage.width ); // Scale to the targeted width.
    this.addChild( scaleImage );

    // Function that updates the meter when the atom changes.
    var update = function(){
      console.log( "atom.getCharge = " + atom.getCharge );
    }

    // Add the listeners that will call the update function.
    atom.link( 'protonCount', function() {
      update();
    } );
    atom.link( 'electronCount', function() {
      update();
    } );
  };

  // Inherit from Node.
  inherit( ChargeMeter, Node );

  return ChargeMeter;
} );
