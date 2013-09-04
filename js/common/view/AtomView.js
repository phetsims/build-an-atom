// Copyright 2002-2013, University of Colorado Boulder

/**
 * ScreenView that presents an interactive atom on the left side, buckets of
 * particles underneath, and controls for label visibility and reset.  A
 * periodic table is included on the right side.  This is intended to be used
 * as a base type for screens with similar views.
 */
define( function( require ) {
  'use strict';

  // Imports
  var AccordionBox = require( 'SUN/AccordionBox' );
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractiveSchematicAtom = require( 'common/view/InteractiveSchematicAtom' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Panel = require( 'SUN/Panel' );
  var ParticleCountDisplay = require( 'common/view/ParticleCountDisplay' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PeriodicTableAndSymbol = require( 'buildanatom/view/PeriodicTableAndSymbol' );
  var ResetAllButton = require( 'common/view/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var SharedConstants = require( 'common/SharedConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VerticalCheckBoxGroup = require( 'SUN/VerticalCheckBoxGroup' );

  // Constants
  var CONTROLS_INSET = 10;
  var LABEL_CONTROL_FONT = new PhetFont( 32 );
  var ELECTRON_VIEW_CONTROL_FONT = new PhetFont( 14 );
  var ACCORDION_BOX_FONT = new PhetFont( 18 );

  /**
   * Constructor.
   *
   * @param model Build an Atom model object.
   * @constructor
   */
  function AtomView( model ) {
    ScreenView.call( this, { renderer: 'svg' } ); // Call super constructor.
    var thisView = this;
    this.model = model;
    this.resetFunctions = [];

    // Create the model-view transform.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: thisView.layoutBounds.width * 0.275, y: thisView.layoutBounds.height * 0.45 },
      1.0 );

    // Add the interactive atom, which include the buckets and particles.
    var atomNode = new InteractiveSchematicAtom( model, mvt );
    this.addChild( atomNode );

    // Add the particle count indicator.
    var particleCountDisplay = new ParticleCountDisplay( model.numberAtom, 13, 250 );  // Width arbitrarily chosen.
    this.addChild( particleCountDisplay );

    // Add the periodic table display inside of an accordion box.
    var periodicTable = new PeriodicTableAndSymbol( model.numberAtom ).mutate( { pickable: false } );
    periodicTable.scale( 0.55 ); // Scale empirically determined to match layout in design doc.
    this.periodicTableBox = new AccordionBox( periodicTable,
      {
        title: 'Element', // TODO: i18n
        fill: SharedConstants.DISPLAY_PANEL_BACKGROUND_COLOR,
        contentPosition: 'left',
        titlePosition: 'left',
        buttonPosition: 'right',
        font: ACCORDION_BOX_FONT
      } );
    this.addChild( this.periodicTableBox );

    // Add the control panel for label visibility. TODO: i18n
    var labelVizControlPanel = new Panel( new VerticalCheckBoxGroup(
      [
        { content: new Text( 'Element Name', {font: LABEL_CONTROL_FONT} ), property: model.showElementNameProperty, label: 'Element Name' },
        { content: new Text( 'Neutral/Ion', {font: LABEL_CONTROL_FONT} ), property: model.showNeutralOrIonProperty, label: 'Neutral/Ion' },
        { content: new Text( 'Stable/Unstable', {font: LABEL_CONTROL_FONT} ), property: model.showStableOrUnstableProperty, label: 'Stable/Unstable' }
      ] ), { fill: 'rgb( 245, 245, 245 )', xMargin: 15 } );
    var numDividerLines = 2;
    var dividerLineShape = new Shape().moveTo( 0, 0 ).lineTo( labelVizControlPanel.width, 0 );
    for ( var dividerLines = 0; dividerLines < numDividerLines; dividerLines++ ) {
      var dividerLine1 = new Path( dividerLineShape,
        {
          lineWidth: 1,
          stroke: 'gray',
          centerY: labelVizControlPanel.height * ( dividerLines + 1 ) / ( numDividerLines + 1 )
        } );
      labelVizControlPanel.addChild( dividerLine1 );
    }

    labelVizControlPanel.scale( 0.55 );  // Use a large font, then scale down to get smaller checkboxes.
    this.addChild( labelVizControlPanel );
    var labelVizControlPanelTitle = new Text( 'Show', new PhetFont( { size: 16, weight: 'bold' } ) ); // TODO: i18n
    this.addChild( labelVizControlPanelTitle );

    // Add the radio buttons that control the electron representation in the atom. TODO: i18n
    var radioButtonRadius = 6;
    var orbitsButton = new AquaRadioButton( model.electronShellDepictionProperty, 'orbits', new Text( 'Orbits', ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var cloudButton = new AquaRadioButton( model.electronShellDepictionProperty, 'cloud', new Text( 'Cloud', ELECTRON_VIEW_CONTROL_FONT ), { radius: radioButtonRadius } );
    var electronViewButtonGroup = new Node();
    electronViewButtonGroup.addChild( new Text( 'Model:', { font: new PhetFont( { size: 18, weight: 'bold' } ) } ) );
    orbitsButton.top = electronViewButtonGroup.bottom;
    orbitsButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( orbitsButton );
    cloudButton.top = electronViewButtonGroup.bottom + 3;
    cloudButton.left = electronViewButtonGroup.left + 5;
    electronViewButtonGroup.addChild( cloudButton );
    this.addChild( electronViewButtonGroup );

    // Add the reset button.
    this.resetFunctions.push( function() {
        thisView.model.reset();
        thisView.periodicTableBox.open.reset();
      }
    );
    var resetButton = new ResetAllButton( function() {
      thisView.resetFunctions.forEach( function( resetFunction ) {
        resetFunction();
      } );
    } );
    resetButton.scale( 0.8 ); // Empirically determined scale factor.
    this.addChild( resetButton );

    // Do the layout.
    particleCountDisplay.top = CONTROLS_INSET;
    particleCountDisplay.left = CONTROLS_INSET;
    this.periodicTableBox.top = CONTROLS_INSET;
    this.periodicTableBox.right = this.layoutBounds.width - CONTROLS_INSET;
    labelVizControlPanel.left = this.periodicTableBox.left + 10;
    labelVizControlPanel.bottom = this.layoutBounds.height - CONTROLS_INSET;
    labelVizControlPanelTitle.bottom = labelVizControlPanel.top;
    labelVizControlPanelTitle.centerX = labelVizControlPanel.centerX;
    resetButton.centerX = ( labelVizControlPanel.right + this.periodicTableBox.right ) / 2;
    resetButton.centerY = labelVizControlPanel.centerY;
    electronViewButtonGroup.right = this.periodicTableBox.left - 30;
    electronViewButtonGroup.top = atomNode.centerY + 45;
  }

  // Inherit from ScreenView.
  inherit( ScreenView, AtomView );

  return AtomView;
} );
