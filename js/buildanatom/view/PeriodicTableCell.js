define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var Vector2 = require( 'DOT/Vector2' );

  var NOMINAL_CELL_DIMENSION = 25;

  /**
   * Constructor.
   *
   * @param atomicNumber - Atomic number of atom represented by this cell.
   * @constructor
   */
  function PeriodicTableCell( atomicNumber, dimension ) {
    Node.call( this, { renderer: 'svg' } ); // Call super constructor.

    this.cell = new Rectangle( 0, 0, NOMINAL_CELL_DIMENSION, NOMINAL_CELL_DIMENSION, 0, 0,
                              {
                                stroke: 'black',
                                lineWidth: 1,
                                fill: 'white'
                              } );
    this.label = new Text( AtomIdentifier.getSymbol( atomicNumber ), {
      font: "14px Arial",
      center: new Vector2( NOMINAL_CELL_DIMENSION / 2, NOMINAL_CELL_DIMENSION / 2 )
    } );
    this.cell.addChild( this.label );
    this.addChild( this.cell );
    this.scale = dimension / NOMINAL_CELL_DIMENSION;
  };

  // Inherit from Node.
  inherit( PeriodicTableCell, Node );

  PeriodicTableCell.prototype.setHighlighted = function( highLighted ){
    this.cell.fill = highLighted ? 'yellow' : 'white';
    this.label.fill = highLighted ? 'red' : 'black';
  }

  return PeriodicTableCell;
} );
