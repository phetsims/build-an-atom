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
  var NumberAtom = require( 'common/model/NumberAtom' );
  var Vector2 = require( 'DOT/Vector2' );
  var Button = require( 'SUN/Button' );
  var TabView = require( "JOIST/TabView" );
  var SymbolNode = require( "symbol/view/SymbolNode" );
  var imageLoader = require( "imageLoader" );
  var PeriodicTableNode = require( "common/view/PeriodicTableNode" );
  var AtomWithParticleStacks = require( "symbol/view/AtomWithParticleStacks" );
  var ParticleCountDisplay = require( "common/view/ParticleCountDisplay" );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var ChargeMeter = require( 'common/view/ChargeMeter' );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function GameTabView( gameModel ) {
    TabView.call( this ); // Call super constructor.

    // Test node.
    this.addChild( new Rectangle( 0, 0, 100, 100, 0, 0,
                                  {
                                    fill : 'pink'

    } ));
  }

  // Inherit from TabView.
  inherit( TabView, GameTabView );

  return GameTabView;
} );