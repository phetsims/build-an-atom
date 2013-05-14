define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var periodicTableTemplate = require( 'tpl!templates/periodic-table.html' );

  // Constants that define the table structure.
  var ELEMENT_COLUMNS = 18;
//  var ELEMENT_ROWS = 7;
//  var POPULATED_CELLS_IN_FIRST_ROW = [0, 17];
//  var POPULATED_CELLS_IN_SECOND_ROW = [0, 1, 12, 13, 14, 15, 16, 17];
//  var POPULATED_CELLS_IN_THIRD_ROW = [0, 1, 12, 13, 14, 15, 16, 17];
  var POPULATED_CELLS = [
    [ 0, 17 ],
    [0, 1, 12, 13, 14, 15, 16, 17],
    [0, 1, 12, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  ];
  var CELL_SIZE = new Dimension2( 40, 40 );

  function PeriodicTableNode( atom ) {
    Node.call( this ); // Call super constructor.
    this.atom = atom;

    if ( !this.atom ) {
      throw new Error( 'Periodic table must be constructed with an atom.' );
    }

    // Add the bounding box, which is also the root node for everything else
    // that comprises this node.
    var boundingBox = new Rectangle( 0, 0, CELL_SIZE.width, CELL_SIZE.height, 0, 0,
                                     {
                                       stroke: 'black',
                                       lineWidth: 2,
                                       fill: 'white'
                                     } );
    this.addChild( boundingBox );

    this.addChild( new HTMLText( periodicTableTemplate ) );

    var numProtons = this.atom.protonCount;

//    this.atom.protons( 'configurationChanged', function () {
//      var newNumProtons = self.atom.getNumProtons();
//
//      if ( numProtons !== newNumProtons ) {
//        numProtons = newNumProtons;
//        self.render();
//      }
//    } );
//
//    this.$el.html( periodicTableTemplate( {} ) );
//    this.render();
  }

//  PeriodicTableNode.prototype.render = function () {
//    var symbol = AtomIdentifier.getSymbol( this.atom.getNumProtons() );
//    this.$el.find( '.active' ).removeClass( 'active' );
//    this.$el.find( '[data-symbol="' + symbol + '"]' ).addClass( 'active' );
//  };

  // Inherit from Node.
  inherit( PeriodicTableNode, Node );

  return PeriodicTableNode;

} );
