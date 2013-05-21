// Copyright 2002-2013, University of Colorado

/**
 * View representation of the atom.  Mostly, this is responsible for displaying
 * and updating the labels, since the atom itself is represented by particles,
 * which take care of themselves in the view.
 *
 * @author John Blanco
 */
define( function ( require ) {

  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
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
    var thisAtomView = this;

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
    var atomCenterMarker = new Path( {
                                       shape: centerMarker,
                                       stroke: 'orange',
                                       lineWidth: 5
                                     } );
    this.addChild( atomCenterMarker );

    // Make the marker invisible if any nucleons are present.
    atom.on( "reconfigureNucleus", function(){
      atomCenterMarker.visible = atom.getWeight() === 0;
    })
    atom.neutrons.on( "reset", function(){
      atomCenterMarker.visible = atom.getWeight() === 0;
    } );
    atom.protons.on( "reset", function(){
      atomCenterMarker.visible = atom.getWeight() === 0;
    } );

    // Create the textual readout for the element name.
    var elementNameCenterPos = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, -40 ) );
    this.elementName = new Text( "",
                                 {
                                   font: "24px Arial",
                                   fill: "red",
                                   center: elementNameCenterPos
                                 } );
    this.addChild( this.elementName );

    // Define the update function for the element name.
    var updateElementName = function () {
      var name = AtomIdentifier.getName( thisAtomView.atom.protons.length );
      if ( name.length === 0 ) {
        name = '';
      }
      thisAtomView.elementName.text = name;
      thisAtomView.elementName.center = elementNameCenterPos;
    };
    updateElementName(); // Do the initial update.

    // Create the textual readout for the ion indicator.
    var ionIndicatorTranslation = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 140, -140 ) );
    this.ionIndicator = new Text( "",
                                  {
                                    font: "24px Arial",
                                    fill: "black",
                                    translation: ionIndicatorTranslation
                                  } );
    this.addChild( this.ionIndicator );

    // Define the update function for the ion indicator.
    var updateIonIndicator = function () {
      if ( thisAtomView.atom.protons.length > 0 ) {
        var charge = thisAtomView.atom.getCharge();
        // TODO: i18n of all labels below
        if ( charge < 0 ) {
          thisAtomView.ionIndicator.text = '- Ion';
          thisAtomView.ionIndicator.fill = "blue";
        }
        else if ( charge > 0 ) {
          thisAtomView.ionIndicator.text = '+ Ion';
          thisAtomView.ionIndicator.fill = "red";
        }
        else {
          thisAtomView.ionIndicator.text = 'Neutral Atom';
          thisAtomView.ionIndicator.fill = "black";
        }
      }
      else {
        // TODO: Make the text a zero-length string once supported.
        thisAtomView.ionIndicator.text = '';
        thisAtomView.ionIndicator.fill = "black";
      }
    }
    updateIonIndicator(); // Do the initial update.

    // Create the textual readout for the stability indicator.
    var stabilityIndicatorCenterPos = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, 40 ) );
    this.stabilityIndicator = new Text( "",
                                        {
                                          font: "24px Arial",
                                          fill: "black",
                                          center: stabilityIndicatorCenterPos
                                        } );
    this.addChild( this.stabilityIndicator );

    // Define the update function for the stability indicator.
    var updateStabilityIndicator = function () {
      if ( thisAtomView.atom.protons.length > 0 ) {
        // TODO: i18n of the indicators below.
        if ( AtomIdentifier.isStable( thisAtomView.atom.protons.length, thisAtomView.atom.neutrons.length ) ) {
          thisAtomView.stabilityIndicator.text = 'Stable';
        }
        else {
          thisAtomView.stabilityIndicator.text = 'Unstable';
        }
      }
      else {
        // TODO: Make the text a zero-length string once supported.
        thisAtomView.stabilityIndicator.text = ""
      }
      thisAtomView.stabilityIndicator.center = stabilityIndicatorCenterPos;
    }
    updateStabilityIndicator(); // Do initial update.

    // Bind the update functions to atom events.
    atom.protons.on( 'add remove reset', function ( proton ) {
      updateElementName();
      updateIonIndicator();
      updateStabilityIndicator();
    } );
    atom.electrons.on( 'add remove reset', function ( electron ) {
      updateIonIndicator();
    } );
    atom.neutrons.on( 'add remove reset', function ( neutron ) {
      updateStabilityIndicator();
    } );
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
    atom.events.on( ParticleAtom.CONFIG_CHANGE_EVENT, function () {
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
} )
;
