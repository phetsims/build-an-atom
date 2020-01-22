// Copyright 2017-2020, University of Colorado Boulder

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
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const SymbolView = require( 'BUILD_AN_ATOM/symbol/view/SymbolView' );

  // strings
  const symbolString = require( 'string!BUILD_AN_ATOM/symbol' );

  // images
  const elementIcon = require( 'image!BUILD_AN_ATOM/element_icon.png' );
  const elementIconSmall = require( 'image!BUILD_AN_ATOM/element_icon_small.png' );

  /**
   * @constructor
   * @param {Tandem} tandem
   */
  function SymbolScreen( tandem ) {
    Screen.call(
      this,
      function() { return new BuildAnAtomModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new SymbolView( model, tandem.createTandem( 'view' ) ); },
      {
        name: symbolString,
        backgroundColorProperty: new Property( 'rgb( 242, 255, 204 )' ), /* Light yellow-green */
        homeScreenIcon: new Image( elementIcon ),
        navigationBarIcon: new Image( elementIconSmall ),
        tandem: tandem
      }
    );
  }

  buildAnAtom.register( 'SymbolScreen', SymbolScreen );

  return inherit( Screen, SymbolScreen );
} );