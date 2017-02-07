// Copyright 2013-2015, University of Colorado Boulder

/**
 * Combination of a periodic table and an enlarged, dynamic, element symbol
 * sitting above the table.
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PeriodicTableNode = require( 'SHRED/view/PeriodicTableNode' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var SYMBOL_WIDTH_PROPORTION = 0.2;
  var SYMBOL_ASPECT_RATIO = 1.0; // Width/height.

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} options
   * @constructor
   */
  function PeriodicTableAndSymbol( numberAtom, tandem, options ) {

    Node.call( this ); // Call super constructor.

    // Create and add the periodic table.
    var periodicTable = new PeriodicTableNode( numberAtom, {
      tandem: tandem.createTandem( 'periodicTable' ),
      interactiveMax: 0,
      disabledCellColor: 'white'
    } );
    this.addChild( periodicTable );

    // Create and add the symbol, which only shows a bigger version of the selected element symbol.
    var symbolRectangle = new Rectangle( 0, 0, periodicTable.width * SYMBOL_WIDTH_PROPORTION, periodicTable.width * SYMBOL_WIDTH_PROPORTION / SYMBOL_ASPECT_RATIO, {
      fill: 'white',
      stroke: 'black',
      lineWidth: 2
    } );
    this.addChild( symbolRectangle );

    // Add the text that represents the chosen element.
    numberAtom.protonCountProperty.link( function( protonCount ) {
      symbolRectangle.removeAllChildren();
      var symbolText = new Text( AtomIdentifier.getSymbol( protonCount ), {
        font: new PhetFont( { size: 48, weight: 'bold' } )
      } );
      symbolText.scale( Math.min( Math.min( symbolRectangle.width * 0.8 / symbolText.width, symbolRectangle.height * 0.8 / symbolText.height ), 1 ) );
      symbolText.center = new Vector2( symbolRectangle.width / 2, symbolRectangle.height / 2 );
      symbolRectangle.addChild( symbolText );
    } );

    // Do the layout.  This positions the symbol to fit into the top portion
    // of the table.  The periodic table is 18 cells wide, and this needs
    // to be centered over the 8th column to be in the right place.
    symbolRectangle.centerX = (7.5 / 18 ) * periodicTable.width;
    symbolRectangle.top = 0;
    periodicTable.top = symbolRectangle.bottom - ( periodicTable.height / 7 * 2.5);
    periodicTable.left = 0;

    options.tandem = tandem;
    this.mutate( options );
  }

  buildAnAtom.register( 'PeriodicTableAndSymbol', PeriodicTableAndSymbol );

  // Inherit from Node.
  return inherit( Node, PeriodicTableAndSymbol );
} );
