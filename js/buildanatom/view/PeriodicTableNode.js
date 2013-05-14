define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );

  // 2D array that defines the table structure.
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

  /**
   * Constructor.
   *
   * @param atom - Atom that defines which element is currently highlighted.
   * @constructor
   */
  function PeriodicTableNode( atom ) {
    Node.call( this, { renderer: 'svg' } ); // Call super constructor.
    this.atom = atom;

    if ( !this.atom ) {
      throw new Error( 'Periodic table must be constructed with an atom.' );
    }

    // Add the cells of the table.
    var elementIndex = 1;
    for ( var i = 0; i < POPULATED_CELLS.length; i++ ) {
      var populatedCellsInRow = POPULATED_CELLS[i];
      for ( var j = 0; j < populatedCellsInRow.length; j++ ) {
        var cell = new Rectangle( 0, 0, CELL_SIZE.width, CELL_SIZE.height, 0, 0,
                                  {
                                    stroke: 'black',
                                    lineWidth: 2,
                                    fill: 'white',
                                    translation: new Vector2( populatedCellsInRow[j] * CELL_SIZE.width, i * CELL_SIZE.height )
                                  } );
        cell.addChild( new Text( AtomIdentifier.getSymbol( elementIndex ), {
          font: "24px Arial",
          center: new Vector2( CELL_SIZE.width / 2, CELL_SIZE.height / 2 )
        } ) );
        this.addChild( cell );
        if ( elementIndex === 2 ){
          cell.fill = 'yellow';
        }
        elementIndex++;
      }
    }

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
