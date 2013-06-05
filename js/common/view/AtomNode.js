// Copyright 2002-2013, University of Colorado

/**
 * View representation of the atom.  Mostly, this is responsible for displaying
 * and updating the labels, since the atom itself is represented by particles,
 * which take care of themselves in the view.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  var Vector2 = require( 'DOT/Vector2' );
  var AtomIdentifier = require( 'common/view/AtomIdentifier' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ElectronShellView = require( 'common/view/ElectronShellView' );

  /**
   * @param atom Model representation of the atom
   * @param mvt Model-View transform
   * @param options
   * @constructor
   */
  var AtomNode = function( atom, mvt, options ) {

    options = _.extend(
      {
        showCenterX: true,
        showElementName: true,
        showStability: true,
        showIonIndicator: true},
      options
    );

    Node.call( this, options ); // Call super constructor.
    var thisAtomView = this;

    this.atom = atom;
    this.mvt = mvt;

    // Create the X where the nucleus goes.
    if ( options.showCenterX ) {
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
      atom.on( "reconfigureNucleus", function() {
        atomCenterMarker.visible = atom.getWeight() === 0;
      } );
      atom.neutrons.on( "reset", function() {
        atomCenterMarker.visible = atom.getWeight() === 0;
      } );
      atom.protons.on( "reset", function() {
        atomCenterMarker.visible = atom.getWeight() === 0;
      } );
    }

    // Add the electron shells.
    var electronShell = new ElectronShellView( atom, mvt );
    this.addChild( electronShell );

    // Create the textual readout for the element name.
    if ( options.showElementName ) {
      var elementNameCenterPos = mvt.modelToViewPosition( atom.position.plus( new Vector2( 0, atom.innerElectronShellRadius / 2 ) ) );
      var elementNameFontSize = mvt.modelToViewDeltaX( atom.innerElectronShellRadius ) * 0.35 + "px";
      this.elementName = new Text( "",
        {
          font: "Arial",
          fontSize: elementNameFontSize,
          fill: "red",
          center: elementNameCenterPos
        } );
      this.addChild( this.elementName );

      // Define the update function for the element name.
      var updateElementName = function() {
        var name = AtomIdentifier.getName( thisAtomView.atom.protons.length );
        if ( name.length === 0 ) {
          name = '';
        }
        thisAtomView.elementName.text = name;
        thisAtomView.elementName.setScaleMagnitude( 1 );
        var maxLabelWidth = mvt.modelToViewDeltaX( atom.innerElectronShellRadius * 1.4 );
        thisAtomView.elementName.setScaleMagnitude( Math.min( maxLabelWidth / thisAtomView.elementName.width, 1 ) );
        thisAtomView.elementName.center = elementNameCenterPos;
      };
      updateElementName(); // Do the initial update.

      // Hook up update listeners.
      atom.protons.on( 'add remove reset', function() {
        updateElementName();
      } );
    }

    // Create the textual readout for the ion indicator.
    if ( options.showIonIndicator ) {
      var ionIndicatorTranslation = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 140, -140 ) );
      this.ionIndicator = new Text( "",
        {
          font: "24px Arial",
          fill: "black",
          translation: ionIndicatorTranslation
        } );
      this.addChild( this.ionIndicator );

      // Define the update function for the ion indicator.
      var updateIonIndicator = function() {
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
      };
      updateIonIndicator(); // Do the initial update.

      atom.protons.on( 'add remove reset', function() {
        updateIonIndicator();
      } );
      atom.electrons.on( 'add remove reset', function() {
        updateIonIndicator();
      } );
    }

    // Create the textual readout for the stability indicator.
    if ( options.showStability ) {
      var stabilityIndicatorCenterPos = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, 40 ) );
      this.stabilityIndicator = new Text( "",
        {
          font: "24px Arial",
          fill: "black",
          center: stabilityIndicatorCenterPos
        } );
      this.addChild( this.stabilityIndicator );

      // Define the update function for the stability indicator.
      var updateStabilityIndicator = function() {
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
          thisAtomView.stabilityIndicator.text = "";
        }
        thisAtomView.stabilityIndicator.center = stabilityIndicatorCenterPos;
      };
      updateStabilityIndicator(); // Do initial update.

      // Bind the update function to atom events.
      atom.protons.on( 'add remove reset', function() {
        updateElementName();
        updateIonIndicator();
        updateStabilityIndicator();
      } );
      atom.electrons.on( 'add remove reset', function() {
        updateIonIndicator();
      } );
      atom.neutrons.on( 'add remove reset', function() {
        updateStabilityIndicator();
      } );
    }
  };

  // Inherit from Node.
  inherit( AtomNode, Node );

  return AtomNode;
} );
