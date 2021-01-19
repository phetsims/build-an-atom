// Copyright 2013-2015, University of Colorado Boulder

/**
 * Global options shown in the "Options" dialog from the PhET Menu
 *
 * @author John Blanco
 * @author Siddhartha Chinthapally (Actual Concepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var highContrastParticlesString = require( 'string!BUILD_AN_ATOM/highContrastParticles' );

  /**
   * @param {BooleanProperty} highContrastParticlesProperty
   * @param {Tandem} tandem
   */
  function GlobalOptionsNode( highContrastParticlesProperty, tandem ) {

    // Add support for turning on high-contrast particles.
    var highContrastParticlesCheckbox = new CheckBox(
      new Text( highContrastParticlesString, { font: OptionsDialog.DEFAULT_FONT } ),
      highContrastParticlesProperty,
      {
        tandem: tandem.createTandem( 'highContrastParticlesCheckbox' )
      }
    );

    // VBox is used to make it easy to add additional options
    VBox.call( this, {
      children: [ highContrastParticlesCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } );

    // @private
    this.disposeGlobalOptionsNode = function() {
      highContrastParticlesCheckbox.dispose();
    };
  }

  buildAnAtom.register( 'GlobalOptionsNode', GlobalOptionsNode );

  return inherit( VBox, GlobalOptionsNode, {

    /**
     * @public
     * @override
     */
    dispose: function() {
      this.disposeGlobalOptionsNode();
      VBox.prototype.dispose.call( this );
    }
  } );
} );
