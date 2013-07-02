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
  var assert = require( "ASSERT/assert" )( "build-an-atom" );
  var BAAFont = require( 'common/view/BAAFont' );
  var Button = require( 'SUN/Button' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberAtom = require( 'common/model/NumberAtom' );
  var PeriodicTableNode = require( 'common/view/PeriodicTableNode' );
  var RadioButton = require( "SUN/RadioButton" );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // Constants
  var TITLE_FONT = new BAAFont( 30 );
  var PARTICLE_COUNTS_FONT = new BAAFont( 24 );
  var BUTTON_FONT = new BAAFont( 20 );
  var INSET = 10;

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( gameModel, countsToElementProblem, layoutBounds ) {
    Node.call( this ); // Call super constructor.
    var thisNode = this;

    // Layout assumes that bounds start at (0,0), so verify that this is true.
    // TODO: Replace this with an assert.
    if ( layoutBounds.minX !== 0 || layoutBounds.minY !== 0 ) {
      console.log( "Error: Layout bounds must start at 0, 0" );
    }

    //--------------- Creation and addition of nodes -------------------------

    // Particle counts
    var protonCountTitle = new Text( "Protons:", PARTICLE_COUNTS_FONT );
    this.addChild( protonCountTitle );
    var protonCountText = new Text( countsToElementProblem.answerAtom.protonCount, PARTICLE_COUNTS_FONT );
    this.addChild( protonCountText );
    var neutronCountTitle = new Text( "Neutrons:", PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountTitle );
    var neutronCountText = new Text( countsToElementProblem.answerAtom.neutronCount, PARTICLE_COUNTS_FONT );
    this.addChild( neutronCountText );
    var electronCountTitle = new Text( "Electrons:", PARTICLE_COUNTS_FONT );
    this.addChild( electronCountTitle );
    var electronCountText = new Text( countsToElementProblem.answerAtom.electronCount, PARTICLE_COUNTS_FONT );
    this.addChild( electronCountText );

    // Problem title
    var problemTitle = new Text( "Find the element:", { font: TITLE_FONT } ); // TODO: i18n
    this.addChild( problemTitle );

    // Periodic table
    var periodicTableAtom = new NumberAtom();
    var periodicTable = new PeriodicTableNode( periodicTableAtom, 100 );
    periodicTable.scale( 0.85 );
    this.addChild( periodicTable );

    // Neutron atom versus ion question. TODO i18n of this section.
    var neutralVersusIonPrompt = new Text( "Is it:", { font: new BAAFont( 24 )} );
    var neutralAtomButton = new RadioButton( countsToElementProblem.neutralOrIon, 'neutral', new Text( "Neutral Atom", {font: new BAAFont( 18 )} ), { radius: 8 } );
    var ionButton = new RadioButton( countsToElementProblem.neutralOrIon, 'ion', new Text( "Ion", {font: new BAAFont( 18 )} ), { radius: 8 } );
    var neutralAtomVersusIonQuestion = new Node();
    neutralAtomVersusIonQuestion.addChild( neutralVersusIonPrompt );
    neutralAtomButton.left = neutralVersusIonPrompt.right + 10;
    neutralAtomButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( neutralAtomButton );
    ionButton.left = neutralAtomVersusIonQuestion.right + 10;
    ionButton.centerY = neutralVersusIonPrompt.centerY;
    neutralAtomVersusIonQuestion.addChild( ionButton );
    this.addChild( neutralAtomVersusIonQuestion );

    // Face node used to signal correct/incorrect answers.
    var faceNode = new FaceNode( layoutBounds.width * 0.4, { visible: false } );
    this.addChild( faceNode );

    // Buttons.
    var attempts = 0;
    this._checkAnswerButton = new Button( new Text( "Check", {font: BUTTON_FONT} ),
                                         function() {
                                           attempts++;
                                           if ( periodicTableAtom.protonCount === countsToElementProblem.answerAtom.protonCount &&
                                                periodicTableAtom.neutronCount === countsToElementProblem.answerAtom.neutronCount &&
                                                ( ( countsToElementProblem.neutralOrIon.value === 'neutral' && countsToElementProblem.answerAtom.charge === 0 ) ||
                                                  ( countsToElementProblem.neutralOrIon.value === 'ion' && countsToElementProblem.answerAtom.charge !== 0 ) ) ) {
                                             faceNode.smile();
                                           }
                                           else {
                                             faceNode.frown();
                                           }
                                           faceNode.visible = true;
                                           thisNode._checkAnswerButton.visible = false;
                                           thisNode._nextButton.visible = true;
                                         },
                                         { fill: 'rgb( 0, 255, 153 )' } );
    this.addChild( this._checkAnswerButton );
    this._nextButton = new Button( new Text( "Next", {font: BUTTON_FONT} ),
                                  function() {
                                    gameModel.next();
                                  },
                                  { fill: 'rgb( 0, 255, 153 )' } );
    this._nextButton.visible = false; // TODO: Remove when state stuff is closer to working.
    this.addChild( this._nextButton );

    //-------------------- Dynamic behavior -----------------------------------

    periodicTableAtom.protonCountProperty.link( function( protonCount ) {
      neutralAtomVersusIonQuestion.visible = protonCount > 0;
    } );

    countsToElementProblem.neutralOrIon.link( function( neutralOrIon ) {
      // TODO: Make this control enabled state instead of visibility once the button supports it.
      thisNode._checkAnswerButton.visible = neutralOrIon != 'noSelection';
    } );

    //-------------------- Layout --------------------------------------------

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

    this._checkAnswerButton.centerX = periodicTable.centerX;
    this._checkAnswerButton.top = neutralAtomVersusIonQuestion.bottom + 20;
    this._nextButton.centerX = this._checkAnswerButton.centerX;
    this._nextButton.centerY = this._checkAnswerButton.centerY;

    faceNode.centerX = layoutBounds.width / 2;
    faceNode.centerY = layoutBounds.height / 2;

  }

  // Inherit from Node.
  inherit( Node, CountsToElementProblemView );

  return CountsToElementProblemView;
} );
