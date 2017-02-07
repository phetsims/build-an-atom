// Copyright 2017, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // imports
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  var BuildAnAtomView = require( 'BUILD_AN_ATOM/buildanatom/view/BuildAnAtomView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var atomString = require( 'string!BUILD_AN_ATOM/atom' );

  // images
  var atomIcon = require( 'image!BUILD_AN_ATOM/atom_icon.png' );
  var atomIconSmall = require( 'image!BUILD_AN_ATOM/atom_icon_small.png' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function BuildAnAtomScreen( tandem ) {
    Screen.call(
      this,
      function() { return new BuildAnAtomModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new BuildAnAtomView( model, tandem.createTandem( 'view' ) ); },
      {
        name: atomString,
        homeScreenIcon: new Image( atomIcon ),
        navigationBarIcon: new Image( atomIconSmall ),
        tandem: tandem
      }
    );
  }

  buildAnAtom.register( 'BuildAnAtomScreen', BuildAnAtomScreen );

  return inherit( Screen, BuildAnAtomScreen );
} );