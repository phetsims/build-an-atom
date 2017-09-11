// Copyright 2013-2015, University of Colorado Boulder

/**
 * Type that generates a list of challenges for use in a sub-game.
 *
 * @author John Blanco
 * @author Sam Reid
 */
define( function( require ) {
  'use strict';

  // modules
  var AtomValuePool = require( 'BUILD_AN_ATOM/game/model/AtomValuePool' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var CountsToChargeChallenge = require( 'BUILD_AN_ATOM/game/model/CountsToChargeChallenge' );
  var CountsToElementChallenge = require( 'BUILD_AN_ATOM/game/model/CountsToElementChallenge' );
  var CountsToMassNumberChallenge = require( 'BUILD_AN_ATOM/game/model/CountsToMassNumberChallenge' );
  var CountsToSymbolChallenge = require( 'BUILD_AN_ATOM/game/model/CountsToSymbolChallenge' );
  var SchematicToChargeChallenge = require( 'BUILD_AN_ATOM/game/model/SchematicToChargeChallenge' );
  var SchematicToElementChallenge = require( 'BUILD_AN_ATOM/game/model/SchematicToElementChallenge' );
  var SchematicToMassNumberChallenge = require( 'BUILD_AN_ATOM/game/model/SchematicToMassNumberChallenge' );
  var SchematicToSymbolChallenge = require( 'BUILD_AN_ATOM/game/model/SchematicToSymbolChallenge' );
  var SymbolToCountsChallenge = require( 'BUILD_AN_ATOM/game/model/SymbolToCountsChallenge' );
  var SymbolToSchematicChallenge = require( 'BUILD_AN_ATOM/game/model/SymbolToSchematicChallenge' );

  // constants
  var MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS = 3; // Disallow schematic (Bohr model) probs above this size.

  // No constructor, not meant to be instantiated.
  var ChallengeSetFactory = {};

  /**
   * Generate a challenge set based on the specified criteria.
   *
   * @param {number} level
   * @param {number} numChallenges
   * @param {BAAGameModel} model
   * @param {string[][]} allowedChallengeTypesByLevel
   */
  ChallengeSetFactory.generate = function( level, numChallenges, model, allowedChallengeTypesByLevel, tandem ) {
    this.challenges = [];
    this._previousChallengeType = null;
    this._availableChallengeTypes = [];
    var groupTandem = tandem.createGroupTandem( 'challenges' );

    // Create a pool of all atom values that can be used to create challenges
    // for the challenge set.
    var atomValueList = new AtomValuePool( level );

    // Now add challenges to the challenge set based on the atom values and the
    // challenge types associated with this level.
    for ( var i = 0; i < numChallenges; i++ ) {
      var challenge = this._generateChallenge( level, atomValueList, model, allowedChallengeTypesByLevel, groupTandem.createNextTandem() );
      if ( challenge !== null ) {
        this.challenges.push( challenge );
      }
    }

    return this.challenges;
  };

  /**
   * Generate a single challenge given the level and a pool of atom values that
   * can be used for the challenge.
   *
   * @param {number} level
   * @param {AtomValuePool} availableAtomValues
   * @param {BAAGameModel} model
   * @param {String[][]} allowedChallengeTypesByLevel
   * @return
   */
  ChallengeSetFactory._generateChallenge = function( level, availableAtomValues, model, allowedChallengeTypesByLevel, tandem ) {

    if ( this._availableChallengeTypes.length === 0 ) {
      // Reload the list of available challenges with all possible challenge
      // types for the current level.
      this._availableChallengeTypes = allowedChallengeTypesByLevel[ level ].slice();
    }

    // Randomly pick a challenge type, but make sure that it isn't the same
    // as the previous challenge type.
    var index = Math.floor( phet.joist.random.nextDouble() * ( this._availableChallengeTypes.length ) );
    if ( this._previousChallengeType !== null && this._availableChallengeTypes.get( index ) === this._previousChallengeType ) {
      // This is the same as the previous prob type, so choose a different one.
      index = ( index + 1 ) % this._availableChallengeTypes.length;
    }
    var challengeType = this._availableChallengeTypes[ index ];
    this.previousChallengeType = challengeType;

    // Remove the chosen type from the list.  By doing this, we present
    // the user with all different challenge types before starting again.
    this._availableChallengeTypes = _.without( this._availableChallengeTypes, challengeType );

    // Pick an atom value from the list of those remaining.  This is where
    // constraints between challenge types and atom values are handled.
    var minProtonCount = 0;
    var maxProtonCount = Number.POSITIVE_INFINITY;
    var requireCharged = false;
    if ( this._isSchematicProbType( challengeType ) ) {
      maxProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS;
    }
    else {
      minProtonCount = MAX_PROTON_NUMBER_FOR_SCHEMATIC_PROBS + 1;
    }
    if ( this._isChargeProbType( challengeType ) ) {

      // If the challenge is asking about the charge, at least 50% of the
      // time we want a charged atom.
      requireCharged = phet.joist.random.nextBoolean();
    }
    var atomValue = availableAtomValues.getRandomAtomValue( minProtonCount, maxProtonCount, requireCharged );
    availableAtomValues.markAtomAsUsed( atomValue );
    return this._createChallenge( model, challengeType, atomValue, tandem );
  };

  /**
   * Create a single challenge given a challenge type (e.g. Schematic to
   * Element) and an atom value that defines that atom configuration.
   */
  ChallengeSetFactory._createChallenge = function( model, challengeType, atomValue, tandem ) {
    var challenge = null;
    switch( challengeType ) {
      case 'counts-to-element':
        challenge = new CountsToElementChallenge( model, atomValue );
        break;
      case 'counts-to-charge':
        challenge = new CountsToChargeChallenge( model, atomValue );
        break;
      case 'counts-to-mass':
        challenge = new CountsToMassNumberChallenge( model, atomValue );
        break;
      case 'counts-to-symbol-all':
        challenge = new CountsToSymbolChallenge( model, atomValue, true, true, true );
        break;
      case 'counts-to-symbol-charge':
        challenge = new CountsToSymbolChallenge( model, atomValue, false, false, true );
        break;
      case 'counts-to-symbol-mass':
        challenge = new CountsToSymbolChallenge( model, atomValue, false, true, false );
        break;
      case 'counts-to-symbol-proton-count':
        challenge = new CountsToSymbolChallenge( model, atomValue, true, false, false );
        break;
      case 'schematic-to-element':
        challenge = new SchematicToElementChallenge( model, atomValue );
        break;
      case 'schematic-to-charge':
        challenge = new SchematicToChargeChallenge( model, atomValue );
        break;
      case 'schematic-to-mass':
        challenge = new SchematicToMassNumberChallenge( model, atomValue );
        break;
      case 'schematic-to-symbol-all':
        challenge = new SchematicToSymbolChallenge( model, atomValue, true, true, true );
        break;
      case 'schematic-to-symbol-charge':
        challenge = new SchematicToSymbolChallenge( model, atomValue, false, false, true );
        break;
      case 'schematic-to-symbol-mass-number':
        challenge = new SchematicToSymbolChallenge( model, atomValue, false, true, false );
        break;
      case 'schematic-to-symbol-proton-count':
        challenge = new SchematicToSymbolChallenge( model, atomValue, true, false, false );
        break;
      case 'symbol-to-counts':
        challenge = new SymbolToCountsChallenge( model, atomValue );
        break;
      case 'symbol-to-schematic':
        challenge = new SymbolToSchematicChallenge( model, atomValue, tandem );
        break;
      default:
        throw new Error( 'Error: Request to create unknown challenge type, type = ' + challengeType );
    }
    return challenge;
  };

  /**
   * Helper function to determine whether a given challenge type has a
   * schematic atom representation on either either side of the challenge.
   *
   * @param challengeType
   * @return
   */
  ChallengeSetFactory._isSchematicProbType = function( challengeType ) {
    return ( challengeType === 'schematic-to-element' ||
             challengeType === 'schematic-to-charge' ||
             challengeType === 'schematic-to-mass' ||
             challengeType === 'schematic-to-symbol-all' ||
             challengeType === 'schematic-to-symbol-proton-count' ||
             challengeType === 'schematic-to-symbol-charge' ||
             challengeType === 'schematic-to-symbol-mass-number' ||
             challengeType === 'symbol-to-schematic' );
  };

  /**
   * Helper function to determine whether a given challenge is requesting an
   * answer about an atom's charge on the right side of the challenge.
   *
   * @param challengeType
   * @return
   */
  ChallengeSetFactory._isChargeProbType = function( challengeType ) {
    return ( challengeType === 'schematic-to-charge' ||
             challengeType === 'counts-to-charge' ||
             challengeType === 'counts-to-symbol-charge' ||
             challengeType === 'schematic-to-symbol-charge'
    );
  };

  buildAnAtom.register( 'ChallengeSetFactory', ChallengeSetFactory );
  return ChallengeSetFactory;
} );
