// Copyright 2002-2013, University of Colorado Boulder

/**
 * Visual representation of a problem where the user is presented with a
 * schematic representation of an atom (which looks much like the atoms
 * constructed on the 1st tab), and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // Imports
  var AquaRadioButton = require( 'SUN/AquaRadioButton' );
  var AtomNode = require( 'common/view/AtomNode' );
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NonInteractiveSchematicAtomNode = require( 'game/view/NonInteractiveSchematicAtomNode' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var Particle = require( 'common/model/Particle' );
  var ParticleAtom = require( 'common/model/ParticleAtom' );
  var ParticleView = require( 'common/view/ParticleView' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var ProblemView = require( 'game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var TITLE_FONT = new BAAFont( 30 );
  var INSET = 10;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function SchematicToElementProblemView( schematicToElementProblem, layoutBounds ) {
    ProblemView.call( this, schematicToElementProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Create the model-view transform used by the schematic atom.
    var mvt = ModelViewTransform2.createSinglePointScaleInvertedYMapping(
      { x: 0, y: 0 },
      { x: layoutBounds.width * 0.275, y: layoutBounds.height * 0.45 },
      0.8 );

    // Add the schematic representation of the atom.
    this.addChild( new NonInteractiveSchematicAtomNode( schematicToElementProblem.answerAtom, mvt ) );

    // Problem title
    var problemTitle = new Text( 'Find the element:', { font: TITLE_FONT } ); // TODO: i18n
    this.problemPresentationNode.addChild( problemTitle );

    // Periodic table
    var periodicTable = new PeriodicTableNode( this.periodicTableAtom, 100 );
    periodicTable.scale( 0.85 );
    this.interactiveAnswerNode.addChild( periodicTable );

    // Neutral atom versus ion question. TODO i18n of this section.
    var neutralVersusIonPrompt = new Text( 'Is it:', { font: new BAAFont( 24 )} );
    var neutralAtomButton = new AquaRadioButton( this.neutralOrIon, 'neutral', new Text( 'Neutral Atom', {font: new BAAFont( 18 )} ), { radius: 8 } );
    var ionButton = new AquaRadioButton( this.neutralOrIon, 'ion', new Text( 'Ion', {font: new BAAFont( 18 )} ), { radius: 8 } );
    var neutralAtomVersusIonQuestion = new Node();
    neutralAtomVersusIonQuestion.addChild( neutralVersusIonPrompt );
    neutralAtomButton.left = neutralVersusIonPrompt.right + 10;
    neutralAtomButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( neutralAtomButton );
    ionButton.left = neutralAtomVersusIonQuestion.right + 10;
    ionButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( ionButton );
    this.interactiveAnswerNode.addChild( neutralAtomVersusIonQuestion );

    this.periodicTableAtom.protonCountProperty.link( function( protonCount ) {
      // Once the user has selected an element, make the ion question visible.
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    } );

    // For this particular problem, don't even show the "check answer" button
    // until the user has answered the "neutral vs. ion" question.
    this.neutralOrIon.link( function( neutralOrIon ) {
      thisNode.checkAnswerButton.enabled = neutralOrIon !== 'noSelection';
      thisNode.checkAnswerButton.pickable = neutralOrIon !== 'noSelection';
    } );

    //--------------------------- Layout -------------------------------------

    periodicTable.right = layoutBounds.width - INSET;
    periodicTable.centerY = layoutBounds.height / 2;

    var maxTitleWidth = periodicTable.width * 0.9;
    if ( problemTitle.width > maxTitleWidth ) {
      problemTitle.scale( maxTitleWidth / problemTitle.width );
    }
    problemTitle.centerX = periodicTable.centerX;
    problemTitle.bottom = periodicTable.top - 30; // Offset empirically determined.

    neutralAtomVersusIonQuestion.centerX = periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = periodicTable.bottom + 20;

    this.setButtonCenter( periodicTable.centerX, neutralAtomVersusIonQuestion.bottom + 40 );
  }

  // Inherit from ProblemView.
  inherit( ProblemView,
           SchematicToElementProblemView,
           {
             periodicTableAtom: new NumberAtom(),
             neutralOrIon: new Property( 'noSelection' ),
             checkAnswer: function() {
               this.problem.checkAnswer( this.periodicTableAtom, this.neutralOrIon.value );
             },
             clearAnswer: function() {
               this.periodicTableAtom.protonCount = 0;
               this.periodicTableAtom.neutronCount = 0;
               this.periodicTableAtom.electronCount = 0;
               this.neutralOrIon.reset();
             },
             displayCorrectAnswer: function() {
               this.periodicTableAtom.protonCount = this.problem.answerAtom.protonCount;
               this.periodicTableAtom.neutronCount = this.problem.answerAtom.neutronCount;
               this.periodicTableAtom.electronCount = this.problem.answerAtom.electronCount;
               this.neutralOrIon.value = this.problem.answerAtom.charge === 0 ? 'neutral' : 'ion';
             }
           } );

  return SchematicToElementProblemView;
} );
