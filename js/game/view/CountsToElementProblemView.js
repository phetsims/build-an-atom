// Copyright 2002-2013, University of Colorado

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
  var CountsToElementProblem = require( 'game/model/CountsToElementProblem' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Text = require( 'SCENERY/nodes/Text' );
  var BAAFont = require( 'common/view/BAAFont' );

  // Constants
  var FONT = new BAAFont( 30 );

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function CountsToElementProblemView( gameModel, answerAtom, scene ) {
    this.gameModel = gameModel;
    this.answerAtom = answerAtom;
    this.scene = scene;
    this.viewRoot = new Node();
  }

  CountsToElementProblemView.prototype.init = function() {
    this.viewRoot.addChild( new Text( "Here is some text!", { font: FONT } ) );
    this.scene.addChild( this.viewRoot );
  }

  CountsToElementProblemView.prototype.tearDown = function() {
    this.scene.removeChild( this.viewRoot );
  }

  return CountsToElementProblemView;
} );
