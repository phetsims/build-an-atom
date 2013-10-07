// Copyright 2002-2013, University of Colorado Boulder

/**
 * This type defines an animated screen which is displayed as a sort of
 * 'reward' when the user gets a perfect score on a game level.  It animates
 * a set of chemical symbols falling from the sky.
 */
define( function( require ) {
  'use strict';

  // Imports
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var InteractiveSymbolNode = require( 'game/view/InteractiveSymbolNode' );

  /**
   * @param options
   * @constructor
   */
  function RewardNode( options ) {
    Node.call( this );

    options = _.extend( { size: new Dimension2( 1000, 750 ) }, options );

    // Make the intended size visible externally for use in positioning this node.
    this.size = options.size;

    // TODO: Temp
    var numberAtom = new NumberAtom();
    numberAtom.protonCount = 2;
    numberAtom.neutronCount = 2;
    numberAtom.electronCount = 2;
    this.addChild( new InteractiveSymbolNode( numberAtom, { centerX: this.size.width * 0.25, centerY: this.size.height * 0.25 } ) );
  }

  return inherit( Node, RewardNode, {
    //TODO prototypes
  } );
} );