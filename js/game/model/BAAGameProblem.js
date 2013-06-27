// Copyright 2002-2013, University of Colorado

/**
 * Base class (or base type) for the problems used in the Build an Atom game.
 * The general approach is that an atom is presented in some way to the user,
 * and the user must submit a correct guess about the atom's configuration.
 *
 * @author John Blanco
 */
define( function( require ) {
  "use strict";

  // Imports
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );


  // Constants

  /**
   * Main constructor function.
   *
   * @constructor
   */
  function BAAGameProblem( buildAnAtomGameModel, answerAtom ) {
    PropertySet.call( this,
                      {
                        state: 'presentingProblem',
                        answerAtom: answerAtom,
                        numSubmissions: 0,
                        score: 0,
                        solvedCorrectly: false
                      } );
    this.answerAtom = answerAtom;
    this.model = buildAnAtomGameModel;
  }

  // Inherit from base class and define the methods for this object.
  inherit( PropertySet, BAAGameProblem, {
    // Process answer submitted by the user.
    processSubmission: function( submittedAtom ) {
      this.numSubmissions++;
      if ( this.this.answerAtom.equals( submittedAtom) ){
        this.solvedCorrectly = true;
        if ( this.numSubmissions === 1 ){
          this.score = 2;
        }
        else{
          this.score = 1;
        }
      }
    }
  } );

  return BAAGameProblem;
} );
