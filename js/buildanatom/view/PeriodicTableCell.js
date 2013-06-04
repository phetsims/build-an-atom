define( function( require ) {
  "use strict";

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
   * @param dimension - Width and height of cell (cells are square).
   * @param interactive - Boolean flag that determines whether cell is interactive.
   * @param numberAtom - Atom that is set if this cell is selected by the user.
   * @constructor
   */
  function PeriodicTableCell( atomicNumber, dimension, interactive, numberAtom ) {
    Node.call( this, { renderer: 'svg' } ); // Call super constructor.

    this.normalFill = interactive ? new LinearGradient( 0, 0, 0, dimension ).addColorStop( 0, 'white' ).addColorStop( 1, 'gray' ) : 'white';
    this.highlightedFill = 'yellow';

    this.cell = new Rectangle( 0, 0, dimension, dimension, 0, 0,
      {
        stroke: 'black',
        lineWidth: 1,
        fill: this.normalFill,
        cursor: interactive ? 'pointer' : null
      } );
    this.label = new Text( AtomIdentifier.getSymbol( atomicNumber ), {
      font: "Arial",
      fontSize: NOMINAL_FONT_SIZE * (dimension / NOMINAL_CELL_DIMENSION),
      center: this.cell.center
    } );
    this.cell.addChild( this.label );
    this.addChild( this.cell );

    // If interactive, add a listener to set the atom when this cell is pressed.
    if ( interactive ) {
      this.cell.addInputListener( {
        up: function() {
          numberAtom.protonCount = atomicNumber;
          numberAtom.neutronCount = AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber );
          numberAtom.electronCount = atomicNumber;
        }
      } );
    }
  }

  // Inherit from Node.
  inherit( PeriodicTableCell, Node );

  PeriodicTableCell.prototype.setHighlighted = function( highLighted ) {
    this.cell.fill = highLighted ? this.highlightedFill : this.normalFill;
    this.label.fontWeight = highLighted ? 'bold' : 'normal';
  };

  return PeriodicTableCell;
} );
