// Copyright 2016, University of Colorado Boulder
/**
 * The reward that is displayed when a game is completed with a perfect score. For testing, the simulation can be run
 * with the 'reward' query parameter to show the reward at the end of every game, regardless of score.
 *
 * @author Aadish Gupta
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomIdentifier = require( 'SHRED/AtomIdentifier' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var FaceNode = require( 'SCENERY_PHET/FaceNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var InteractiveSymbolNode = require( 'BUILD_AN_ATOM/game/view/InteractiveSymbolNode' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var RewardNode = require( 'VEGAS/RewardNode' );

  // constants
  var NUMBER_OF_NODES = 75;
  var NUMBER_OF_SYMBOL_NODES = 5;
  var FACE_DIAMETER = 40;
  var MIN_CHILD_NODE_WIDTH = 40;
  var MAX_CHILD_NODE_WIDTH = MIN_CHILD_NODE_WIDTH * 2;

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function BAARewardNode( tandem ) {
    var nodes = this.createNodes( tandem );
    RewardNode.call( this, { nodes: nodes } );
  }

  buildAnAtom.register( 'BAARewardNode', BAARewardNode );

  return inherit( RewardNode, BAARewardNode, {

    _createRandomStableAtom: function() {
      var atomicNumber = 1 + Math.floor( Math.random() * 18 ); // Limit to Argon, since that's as high as translations go.
      return new NumberAtom( {
        protonCount: atomicNumber,
        neutronCount: AtomIdentifier.getNumNeutronsInMostCommonIsotope( atomicNumber ),
        electronCount: atomicNumber
      } );
    },

    createNodes: function( tandem ) {
      var self = this;
      var nodes = [];
      var groupTandem = tandem.createGroupTandem( 'interactiveSymbolNodes' );
      for ( var i = 0; i < NUMBER_OF_SYMBOL_NODES; i++ ){
        var interactiveSymbolNode = new InteractiveSymbolNode( self._createRandomStableAtom(), groupTandem.createNextTandem() );
        interactiveSymbolNode.scale( ( MIN_CHILD_NODE_WIDTH + Math.random() * ( MAX_CHILD_NODE_WIDTH - MIN_CHILD_NODE_WIDTH ) ) / interactiveSymbolNode.width );
        nodes.push( interactiveSymbolNode );
      }
      var faceNode = new FaceNode( FACE_DIAMETER );
      nodes.push( faceNode );
      return RewardNode.createRandomNodes( nodes, NUMBER_OF_NODES );
    }
  } );
} );
