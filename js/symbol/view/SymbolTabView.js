// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  // Imports
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var NumberAtom = require( 'symbol/model/NumberAtom' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Button = require( 'SUN/Button' );
  var TabView = require( "JOIST/TabView" );
  var SymbolNode = require( "symbol/view/SymbolNode" );
  var BAAImages = require( "common/BAAImages" );
  var PeriodicTableNode = require( "buildanatom/view/PeriodicTableNode" );
  var AtomWithParticleStacks = require( "symbol/view/AtomWithParticleStacks" );
  var ParticleCountDisplay = require( "common/view/ParticleCountDisplay" );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );

  // Constants
  var _TOP_INSET = 30;
  var _SIDE_INSET = 10;

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {
    TabView.call( this ); // Call super constructor.

    // Add the node that shows the interactive symbol.
    var symbolNode = new SymbolNode( model.numberAtom );
    this.addChild( symbolNode );

    // Add the scale image - just an image with no functionality.
    var scaleImage = new Image( BAAImages.getImage( "scale.svg" ) );
    scaleImage.scale( 0.20 ); // Scale empirically determined to match design layout.
    this.addChild( scaleImage );

    // Add the periodic table.
    var periodicTable = new PeriodicTableNode( model.numberAtom );
    this.addChild( periodicTable );

    // Add a node that will be used to make the periodic table appear to fade
    // out at the bottom.
    var fadeGradient = new LinearGradient( 0, 0, 0, periodicTable.height ).addColorStop( 0, 'rgba( 255, 254, 223, 0)' ).addColorStop( 0.5, 'rgba( 255, 254, 223, 0)' ).addColorStop( 0.68, 'rgba( 255, 254, 223, 1 )' );
    var periodicTableFadeOutNode = new Rectangle( 0, 0, periodicTable.width * 1.01, periodicTable.height * 1.01,
      {fill: fadeGradient, pickable: false} );

    this.addChild( periodicTableFadeOutNode );

    // Add the charge meter.
    var chargeMeter = new ChargeMeter( model.numberAtom );
    this.addChild( chargeMeter );

    // Add the atom display.
    var atomView = new AtomWithParticleStacks( model, model.protons.length, model.neutrons.length, model.electrons.length );
    this.addChild( atomView );

    // Add the particle count display.
    var maxParticles = Math.max( Math.max( model.protons.length, model.neutrons.length ), model.electrons.length );
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom, maxParticles, atomView.width );
    this.addChild( particleCountDisplay );

    // Add the reset button. TODO: i18n
    var resetButton = new Button( new Text( "Reset", { font: 'bold 16px Arial'} ),
      function() {
        model.reset();
      },
      {
        fill: 'orange',
        xMargin: 10,
        lineWidth: 1.5
      } );
    this.addChild( resetButton );

    // Do the layout.
    symbolNode.top = _TOP_INSET;
    periodicTable.left = _SIDE_INSET;
    periodicTable.top = symbolNode.bottom;
    periodicTableFadeOutNode.center = periodicTable.center;
    symbolNode.centerX = periodicTable.center.x;
    scaleImage.x = _SIDE_INSET;
    scaleImage.y = symbolNode.top;
    chargeMeter.left = symbolNode.right + 10;
    chargeMeter.top = symbolNode.top;
    particleCountDisplay.left = periodicTable.right + 30;
    particleCountDisplay.top = _TOP_INSET;
    atomView.left = particleCountDisplay.left;
    atomView.top = particleCountDisplay.bottom + 10;
    resetButton.center = new Vector2( atomView.centerX, atomView.bottom + 40 );
  }

  // Inherit from TabView.
  inherit( SymbolTabView, TabView );

  return SymbolTabView;
} );