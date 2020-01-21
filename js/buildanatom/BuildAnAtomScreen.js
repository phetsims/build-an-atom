// Copyright 2017-2019, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */
define( require => {
  'use strict';

  // modules
  const buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  const BuildAnAtomModel = require( 'BUILD_AN_ATOM/common/model/BuildAnAtomModel' );
  const BuildAnAtomView = require( 'BUILD_AN_ATOM/buildanatom/view/BuildAnAtomView' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const atomString = require( 'string!BUILD_AN_ATOM/atom' );

  // images
  const atomIcon = require( 'image!BUILD_AN_ATOM/atom_icon.png' );
  const atomIconSmall = require( 'image!BUILD_AN_ATOM/atom_icon_small.png' );

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