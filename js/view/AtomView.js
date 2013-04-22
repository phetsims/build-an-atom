// Copyright 2002-2012, University of Colorado

/**
 * View representation of the atom.
 *
 * @author John Blanco
 */
define( function ( require ) {

  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var Atom = require( 'model/Atom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param atom Model representation of the atom
   * @param mvt Model-View transform
   * @constructor
   */
  var AtomView = function ( atom, mvt ) {

    Node.call( this ); // Call super constructor.
    var atomView = this;

    this.atom = atom;
    this.mvt = mvt;

    // Create the X where the nucleus goes.
    var sizeInPixels = mvt.modelToViewDeltaX( 20 );
    var center = mvt.modelToViewPosition( atom.position );
    var centerMarker = new Shape();
    centerMarker.moveTo( center.x - sizeInPixels / 2, center.y - sizeInPixels / 2 );
    centerMarker.lineTo( center.x + sizeInPixels / 2, center.y + sizeInPixels / 2 );
    centerMarker.moveTo( center.x - sizeInPixels / 2, center.y + sizeInPixels / 2 );
    centerMarker.lineTo( center.x + sizeInPixels / 2, center.y - sizeInPixels / 2 );

    this.addChild( new Path( {
                               shape: centerMarker,
                               stroke: 'orange',
                               lineWidth: 5
                             } ) );

    // Create the textual readouts for element name, stability, and charge.
    this.elementName = new Text( "-",
                                 {
                                   font: "24px Arial",
                                   fill: "red",
                                   center: mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, -40 ) )
                                 } );
    this.addChild( this.elementName );

    var updateElementName = function(){
      var name = AtomIdentifier.getName( atomView.atom.protons.length );
      if ( name.length === 0 ){
        name = 'Nuthin\'';
      }
      atomView.elementName.text = name;
      atomView.elementName.center = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, -40 ) );
    }

    atom.protons.bind('add', function( proton ){
      updateElementName();
    })
    atom.protons.bind('remove', function( proton ){
      updateElementName();
    })
  };

  // Inherit from Node.
  inherit( AtomView, Node );

  // TODO: This is old, but keep until the atom view is fully working, since there is code in here that will be useful.
  var initialize = function ( atom, mvt ) {
    this.atom = atom;
    this.mvt = mvt;

    // Create the textual readouts for element name, stability, and charge.
    this.elementName = new Easel.Text( "", 'bold 36px Arial', 'red' );
    this.elementName.y = 50;
    this.addChild( this.elementName );
    this.stabilityIndicator = new Easel.Text( "", 'bold 26px Arial', 'black' );
    this.stabilityIndicator.y = 420;
    this.addChild( this.stabilityIndicator );
    this.ionIndicator = new Easel.Text( "", 'bold 26px Arial', 'black' );
    this.ionIndicator.x = 450;
    this.ionIndicator.y = 150;
    this.addChild( this.ionIndicator );

    // Update the textual indicators.
    var self = this;
    atom.events.on( Atom.CONFIG_CHANGE_EVENT, function () {
      debugger;

      // Update element name.
      self.elementName.text = AtomIdentifier.getName( self.atom.getNumProtons() );
      self.elementName.x = self.mvt.modelToView( new Point2D( 0, 0 ) ).x - self.elementName.getMeasuredWidth() / 2;

      // Update stability indicator.
      if ( self.atom.getNumProtons() == 0 ) {
        self.stabilityIndicator.text = "";
      }
      else if ( AtomIdentifier.isStable( self.atom.getNumProtons(), self.atom.getNumNeutrons() ) ) {
        self.stabilityIndicator.text = "Stable";
      }
      else {
        self.stabilityIndicator.text = "Unstable";
      }
      self.stabilityIndicator.x = self.mvt.modelToView( new Point2D( 0, 0 ) ).x - self.stabilityIndicator.getMeasuredWidth() / 2;

      // Update charge indicator.
      if ( self.atom.getNumProtons() == 0 ) {
        self.ionIndicator.text = "";
      }
      else if ( self.atom.getCharge() == 0 ) {
        self.ionIndicator.text = "Neutral Atom";
        self.ionIndicator.color = "black";
      }
      else if ( self.atom.getCharge() < 0 ) {
        self.ionIndicator.text = "-Ion";
        self.ionIndicator.color = "blue";
      }
      else {
        self.ionIndicator.text = "+Ion";
        self.ionIndicator.color = "red";
      }
      self.ionIndicator.x = 180 - self.ionIndicator.getMeasuredWidth();
    } );
  };

  return AtomView;
} );
