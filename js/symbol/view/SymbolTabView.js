// Copyright 2002-2013, University of Colorado

/**
 * Main view for the second tab of the Build an Atom simulation.
 */
define( function( require ) {
  "use strict";

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var SymbolModel = require( 'symbol/model/SymbolModel' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Button = require( 'SUN/Button' );
  var TabView = require( "JOIST/TabView" );
  var SymbolNode = require( "symbol/view/SymbolNode" );
  var PeriodicTableNode = require( "buildanatom/view/PeriodicTableNode" );
  var AtomWithParticleStacks = require( "symbol/view/AtomWithParticleStacks" );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function SymbolTabView( model ) {
    TabView.call( this ); // Call super constructor.

    // Add the node that shows the interactive symbol
    var symbolNode = new SymbolNode( model ).mutate( { left: 120, top: 10 } );
    this.addChild( symbolNode );

    // Add the periodic table
    var periodicTable = new PeriodicTableNode( model ).mutate( {
                                                                 top: symbolNode.bottom + 40,
                                                                 centerX: symbolNode.centerX
                                                               } );
    this.addChild( periodicTable );

    // Add the atom display.
    console.log( "periodicTableNode.maxX + 20 = " + periodicTable.right + 20 );
    this.addChild( new AtomWithParticleStacks( model ).mutate( {
                                                                 left: periodicTable.right + 40,
                                                                 top: symbolNode.minY
                                                               } ) );

    // Add the reset button. TODO: i18n
    this.addChild( new Button( new Text( "Reset", { font: 'bold 24px Arial'} ),
                               function() {
                                 model.reset();
                               },
                               {
                                 fill: 'orange',
                                 xMargin: 10,
                                 lineWidth: 1.5
                               } ).mutate( {center: new Vector2( 900, 650 )} ) );
  }

  // Inherit from TabView.
  inherit( SymbolTabView, TabView );

  return SymbolTabView;
} );