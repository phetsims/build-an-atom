define( function( require ) {

  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );
  var Vector2 = require( 'DOT/Vector2' );

  var NOMINAL_CELL_DIMENSION = 25;
  var NOMINAL_FONT_SIZE = 14;

  /**
   * Constructor.
   *
   * @param atomicNumber - Atomic number of atom represented by this cell.
   * @constructor
   */
  function PeriodicTableCell( atomicNumber, dimension, interactive ) {
    Node.call( this, { renderer: 'svg' } ); // Call super constructor.

    this.normalFill = interactive ? new LinearGradient( 0, 0, 0, dimension ).addColorStop(0, 'white' ).addColorStop( 1, 'gray' ) : 'white';
    this.highlightedFill = 'yellow';

    this.cell = new Rectangle( 0, 0, dimension, dimension, 0, 0,
                               {
                                 stroke: 'black',
                                 lineWidth: 1,
                                 fill: this.normalFill
                               } );
    this.label = new Text( AtomIdentifier.getSymbol( atomicNumber ), {
      font: "Arial",
      center: new Vector2( dimension / 2, dimension / 2 )
    } );
    this.label.fontSize = NOMINAL_FONT_SIZE * (dimension / NOMINAL_CELL_DIMENSION);
    this.cell.addChild( this.label );
    this.addChild( this.cell );
  };

  // Inherit from Node.
  inherit( PeriodicTableCell, Node );

  PeriodicTableCell.prototype.setHighlighted = function( highLighted ) {
    this.cell.fill = highLighted ? this.highlightedFill : this.normalFill;
    this.label.fontWeight = highLighted ? 'bold' : 'normal';
  }

  return PeriodicTableCell;
} );
