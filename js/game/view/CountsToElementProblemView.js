// Copyright 2002-2013, University of Colorado Boulder

/**
 * Problem where the user is presented with a set of counts for protons,
 * neutrons, and electrons, and must find the represented element on a
 * periodic table.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var AquaRadioButton = require( "SUN/AquaRadioButton" );
  var BAAFont = require( 'common/view/BAAFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var ProblemView = require( 'game/view/ProblemView' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var TITLE_FONT = new BAAFont( 30 );
  var PARTICLE_COUNTS_FONT = new BAAFont( 24 );
  var INSET = 10;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( countsToElementProblem, layoutBounds ) {
    ProblemView.call( this, countsToElementProblem, layoutBounds ); // Call super constructor.
    var thisNode = this;

    // Particle counts
    var protonCountTitle = new Text( "Protons:", PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( protonCountTitle );
    var protonCountText = new Text( countsToElementProblem.answerAtom.protonCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( protonCountText );
    var neutronCountTitle = new Text( "Neutrons:", PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( neutronCountTitle );
    var neutronCountText = new Text( countsToElementProblem.answerAtom.neutronCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( neutronCountText );
    var electronCountTitle = new Text( "Electrons:", PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( electronCountTitle );
    var electronCountText = new Text( countsToElementProblem.answerAtom.electronCount, PARTICLE_COUNTS_FONT );
    this.problemPresentationNode.addChild( electronCountText );

    // Problem title
    var problemTitle = new Text( "Find the element:", { font: TITLE_FONT } ); // TODO: i18n
    this.problemPresentationNode.addChild( problemTitle );

    // Periodic table
    var periodicTable = new PeriodicTableNode( this.periodicTableAtom, 100 );
    periodicTable.scale( 0.85 );
    this.interactiveAnswerNode.addChild( periodicTable );

    // Neutral atom versus ion question. TODO i18n of this section.
    var neutralVersusIonPrompt = new Text( "Is it:", { font: new BAAFont( 24 )} );
    var neutralAtomButton = new AquaRadioButton( this.neutralOrIon, 'neutral', new Text( "Neutral Atom", {font: new BAAFont( 18 )} ), { radius: 8 } );
    var ionButton = new AquaRadioButton( this.neutralOrIon, 'ion', new Text( "Ion", {font: new BAAFont( 18 )} ), { radius: 8 } );
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

    var countIndicatorRightEdge = layoutBounds.width * 0.35; // Controls horizontal position of count indicators, adjust as needed.
    protonCountText.right = countIndicatorRightEdge;
    neutronCountText.right = protonCountText.right;
    electronCountText.right = protonCountText.right;
    protonCountText.centerY = periodicTable.top + periodicTable.height * 0.25;
    neutronCountText.centerY = periodicTable.centerY;
    electronCountText.centerY = periodicTable.top + periodicTable.height * 0.75;
    var maxNumberWidth = new Text( "99", { font: PARTICLE_COUNTS_FONT } ).width;
    var maxParticleLabelWidth = Math.max( Math.max( protonCountTitle.width, neutronCountTitle.width ), electronCountTitle.width );
    var countTitleLeftEdge = countIndicatorRightEdge - maxNumberWidth - maxParticleLabelWidth - 10;
    protonCountTitle.left = countTitleLeftEdge;
    neutronCountTitle.left = countTitleLeftEdge;
    electronCountTitle.left = countTitleLeftEdge;
    protonCountTitle.centerY = protonCountText.centerY;
    neutronCountTitle.centerY = neutronCountText.centerY;
    electronCountTitle.centerY = electronCountText.centerY;

    neutralAtomVersusIonQuestion.centerX = periodicTable.centerX;
    neutralAtomVersusIonQuestion.top = periodicTable.bottom + 20;

    this.setButtonCenter( periodicTable.centerX, neutralAtomVersusIonQuestion.bottom + 40 );
  }

  // Inherit from ProblemView.
  inherit( ProblemView,
           CountsToElementProblemView,
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

  return CountsToElementProblemView;
} );
