// Copyright 2002-2013, University of Colorado Boulder

/**
 * View representation of the atom.  Mostly, this is responsible for displaying
 * and updating the labels, since the atom itself is represented by particles,
 * which take care of themselves in the view.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  var AtomIdentifier = require( 'common/AtomIdentifier' );
  var BAAFont = require( 'common/view/BAAFont' );
  var ElectronCloudView = require( 'common/view/ElectronCloudView' );
  var ElectronShellView = require( 'common/view/ElectronShellView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param particleAtom Model that represents the atom, including particle positions
   * @param mvt Model-View transform
   * @param options
   * @constructor
   */
  var AtomNode = function AtomNode( particleAtom, mvt, options ) {

    options = _.extend(
      {
        showCenterX: true,
        showElementName: new Property( true ),
        showNeutralOrIon: new Property( true ),
        showStableOrUnstable: new Property( true ),
        electronShellDepiction: new Property( 'orbits' )
      },
      options
    );

    Node.call( this, options ); // Call super constructor.
    var thisAtomView = this;

    this.atom = particleAtom;
    this.mvt = mvt;

    // Create the X where the nucleus goes.
    if ( options.showCenterX ) {
      var sizeInPixels = mvt.modelToViewDeltaX( 20 );
      var center = mvt.modelToViewPosition( particleAtom.position );
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
      var listener = function() { atomCenterMarker.visible = particleAtom.getWeight() === 0; };
      particleAtom.electrons.addListener( listener );
      particleAtom.neutrons.addListener( listener );
      particleAtom.protons.addListener( listener );
    }

    // Add the electron shells.
    var electronShell = new ElectronShellView( particleAtom, mvt );
    this.addChild( electronShell );
    options.electronShellDepiction.link( function( depiction ){
      electronShell.visible = depiction === 'orbits';
    });

    // Add the electron cloud.
    var electronCloud = new ElectronCloudView( particleAtom, mvt );
    this.addChild( electronCloud );
    options.electronShellDepiction.link( function( depiction ){
      electronCloud.visible = depiction === 'cloud';
    });

    // Create the textual readout for the element name.
    var elementNameCenterPos = mvt.modelToViewPosition( particleAtom.position.plus( new Vector2( 0, particleAtom.innerElectronShellRadius / 2 ) ) );
    var elementNameFontSize = mvt.modelToViewDeltaX( particleAtom.innerElectronShellRadius ) * 0.35;
    this.elementName = new Text( "",
                                 {
                                   font: new BAAFont( elementNameFontSize ),
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
      var maxLabelWidth = mvt.modelToViewDeltaX( particleAtom.innerElectronShellRadius * 1.4 );
      thisAtomView.elementName.setScaleMagnitude( Math.min( maxLabelWidth / thisAtomView.elementName.width, 1 ) );
      thisAtomView.elementName.center = elementNameCenterPos;
    };
    updateElementName(); // Do the initial update.

    // Hook up update listeners.
    particleAtom.protons.addListener( function() {
      updateElementName();
    } );
    options.showElementName.link( function( visible ) {
      thisAtomView.elementName.visible = visible;
    } );

    // Create the textual readout for the ion indicator.
    var updateIonIndicator = function() {};
    var ionIndicatorTranslation = mvt.modelToViewPosition( particleAtom.position.plus( new Vector2( particleAtom.outerElectronShellRadius * 1.05, 0 ).rotated( Math.PI * 0.40 ) ) );
    this.ionIndicator = new Text( "",
                                  {
                                    font: new BAAFont( 24 ),
                                    fill: "black",
                                    translation: ionIndicatorTranslation
                                  } );
    this.addChild( this.ionIndicator );

    // Define the update function for the ion indicator.
    updateIonIndicator = function() {
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

    particleAtom.protons.addListener( updateIonIndicator );
    particleAtom.electrons.addListener( updateIonIndicator );
    options.showNeutralOrIon.link( function( visible ) {
      thisAtomView.ionIndicator.visible = visible;
    } );

    // Create the textual readout for the stability indicator.
    var stabilityIndicatorCenterPos = mvt.modelToViewPosition( Vector2.ZERO ).add( new Vector2( 0, 40 ) );
    this.stabilityIndicator = new Text( "",
                                        {
                                          font: new BAAFont( 24 ),
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

    // Add the listeners that control the label content and visibility.
    particleAtom.protons.addListener( function() {
      updateElementName();
      updateIonIndicator();
      updateStabilityIndicator();
    } );
    particleAtom.electrons.addListener( updateIonIndicator );
    particleAtom.neutrons.addListener( updateStabilityIndicator );
    options.showStableOrUnstable.link( function( visible ) {
      thisAtomView.stabilityIndicator.visible = visible;
    } );

  };

  // Inherit from Node.
  inherit( Node, AtomNode );

  return AtomNode;
} );
