// Copyright 2013-2017, University of Colorado Boulder

/**
 * Primary model class for the Build an Atom Game tab.
 *
 * @author John Blanco
 */
define( function( require ) {
  'use strict';

  // modules
  var BAAGameState = require( 'BUILD_AN_ATOM/game/model/BAAGameState' );
  var BAAQueryParameters = require( 'BUILD_AN_ATOM/common/BAAQueryParameters' );
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var buildAnAtom = require( 'BUILD_AN_ATOM/buildAnAtom' );
  var ChallengeSetFactory = require( 'BUILD_AN_ATOM/game/model/ChallengeSetFactory' );
  var Emitter = require( 'AXON/Emitter' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberAtom = require( 'SHRED/model/NumberAtom' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var ShredConstants = require( 'SHRED/ShredConstants' );

  // phet-io modules
  var TBAAGameModel = require( 'BUILD_AN_ATOM/game/model/TBAAGameModel' );
  var TBoolean = require( 'ifphetio!PHET_IO/types/TBoolean' );
  var TObject = require( 'ifphetio!PHET_IO/types/TObject' );

  // constants
  var CHALLENGES_PER_LEVEL = BAAQueryParameters.challengesPerLevel;
  var POSSIBLE_POINTS_PER_CHALLENGE = 2;
  var MAX_POINTS_PER_GAME_LEVEL = CHALLENGES_PER_LEVEL * POSSIBLE_POINTS_PER_CHALLENGE;

  /**
   * main constructor function for the game model
   * {Tandem} tandem
   * @constructor
   */
  function BAAGameModel( tandem ) {

    var self = this;

    // @private (phet-io), phet-io can set this value to customize which levels are presented
    this.allowedChallengeTypesByLevel = [
      [ 'schematic-to-element', 'counts-to-element' ],
      [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
      [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
      [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
    ];

    // @public {Property.<BAAGameState>} - current state, each challenge is a unique state
    this.stateProperty = new Property( BAAGameState.CHOOSING_LEVEL );

    // @public {Property.<boolean>}
    this.soundEnabledProperty = new Property( true, {
      tandem: tandem.createTandem( 'soundEnabledProperty' ),
      phetioValueType: TBoolean
    } );

    // @public {Property.<boolean>}
    this.timerEnabledProperty = new Property( false, {
      tandem: tandem.createTandem( 'timerEnabledProperty' ),
      phetioValueType: TBoolean
    } );

    // @public (read-only) {Property.<number>}
    this.levelProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'levelProperty' )
    } );

    // @public (read-only) {Property.<Array.<BAAGameChallenge>>}
    this.challengeSetProperty = new Property( [] );

    // @public (read-only) {Property.<number>}
    this.challengeIndexProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'challengeIndexProperty' )
    } );

    // @public (read-only) {NumberProperty}
    this.scoreProperty = new NumberProperty( 0, {
      tandem: tandem.createTandem( 'scoreProperty' )
    } ); // Score on current game level.

    // @public (read-only) {Property.<number>}
    this.elapsedTimeProperty = new Property( 0 );

    // @public (phet-io) {Property.<boolean>} - enables a mode where no feedback is provided during the game
    this.provideFeedbackProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'provideFeedbackProperty' )
    } );

    // @private, set of external functions that the model will step
    this.stepListeners = [];

    // @private
    this.levelCompletedEmitter = new Emitter( {
      tandem: tandem.createTandem( 'levelCompletedEmitter' ),
      phetioArgumentTypes: [ TObject ]
    } );

    this.bestScores = []; // Properties that track progress on each game level.
    this.scores = []; // Properties that track score at each game level
    this.bestTimeVisible = []; // Properties that track whether to show best time at each game level
    self.bestTimes = []; // Best times at each level.
    _.times( ShredConstants.LEVEL_NAMES.length, function() {
      self.bestScores.push( new Property( 0 ) );
      self.scores.push( new Property( 0 ) );
      self.bestTimes.push( new Property( null ) );
      self.bestTimeVisible.push( new Property( false ) );
    } );

    this.timerEnabledProperty.lazyLink( function( timerEnabled ) {
      for ( var i = 0; i < ShredConstants.LEVEL_NAMES.length; i++ ) {
        self.bestTimeVisible[ i ].value = timerEnabled && self.scores[ i ].value === MAX_POINTS_PER_GAME_LEVEL;
      }
    } );

    // Flag set to indicate new best time, cleared each time a level is started.
    this.newBestTime = false;

    this.checkAnswerEmitter = new Emitter( {
      tandem: tandem.createTandem( 'checkAnswerEmitter' ),
      phetioArgumentTypes: [ TObject ]
    } );

    this.challengeSetGroupTandem = tandem.createGroupTandem( 'challengeSets' );

    // @private {GroupTandem}
    this.numberAtomGroupTandem = tandem.createGroupTandem( 'numberAtoms' );// TODO: unify with tandem names in random challenge sets

    tandem.addInstance( this, TBAAGameModel );

    // @private (phet-io) {Array.<Array.<BAAGameChallenge>} - when set by the PhET-iO API, these challenges will
    // be used instead of randomly generated
    this.predeterminedChallenges = [];
  }

  buildAnAtom.register( 'BAAGameModel', BAAGameModel );

  // Inherit from base class and define the methods for this object.
  return inherit( Object, BAAGameModel, {

    // @public - time stepping function, called by the framework
    step: function( dt ) {

      // Increment the game timer if running.  Note that this assumes that dt is not clamped, because we want it to
      // essentially continue running if the user switches tabs or hides the browser.
      if ( this.timerEnabledProperty.get() &&
           this.stateProperty.get() !== BAAGameState.CHOOSING_LEVEL &&
           this.stateProperty.get() !== BAAGameState.LEVEL_COMPLETED ) {

        this.elapsedTimeProperty.set( this.elapsedTimeProperty.get() + dt );
      }

      // Step the current challenge if it has any time-driven behavior.
      // TODO: Is the check for whether the state exists really necessary?
      if ( this.stateProperty.get() && ( typeof( this.stateProperty.get().step ) !== 'undefined' ) ) {
        this.stateProperty.get().step( dt );
      }

      // Step any external functions that need it.
      this.stepListeners.forEach( function( stepListener ) { stepListener( dt ); } );
    },

    // Start a new game.
    // @private (StartGameLevelNode.js, phet-io)
    startGameLevel: function( levelName ) {
      this.levelProperty.set( ShredConstants.MAP_LEVEL_NAME_TO_NUMBER( levelName ) );
      this.challengeIndexProperty.set( 0 );

      // Use the predetermined challenges (if specified by phet-io) or genearte a random challenge for the given level
      var challengeSet = this.predeterminedChallenges[ this.levelProperty.get() ] || ChallengeSetFactory.generate(
        this.levelProperty.get(),
        CHALLENGES_PER_LEVEL,
        this,
        this.allowedChallengeTypesByLevel,
        this.challengeSetGroupTandem.createNextTandem()
      );
      this.challengeSetProperty.set( challengeSet );
      this.scoreProperty.set( 0 );
      this.newBestTime = false;
      this.bestTimeVisible[ this.levelProperty.get() ].value = false;
      this.elapsedTimeProperty.reset();
      if ( this.challengeSetProperty.get().length > 0 ) {
        this.stateProperty.set( this.challengeSetProperty.get()[ 0 ] );
      }
      else {
        this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
      }
    },

    // @public - go to the level selection dialog and allow the user to start a new game
    newGame: function() {
      this.stateProperty.set( BAAGameState.CHOOSING_LEVEL );
      this.scoreProperty.set( 0 );
    },

    // @public - advance to the next challenge or to the 'game over' screen if all challenges finished
    next: function() {
      var level = this.levelProperty.get();
      if ( this.challengeSetProperty.get().length > this.challengeIndexProperty.get() + 1 ) {
        // Next challenge.
        this.challengeIndexProperty.set( this.challengeIndexProperty.get() + 1 );
        this.stateProperty.set( this.challengeSetProperty.get()[ this.challengeIndexProperty.get() ] );
      }
      else {
        // Game level completed - update score and state.
        if ( this.scoreProperty.get() > this.bestScores[ level ].value ) {
          this.bestScores[ level ].value = this.scoreProperty.get();
        }
        if ( this.timerEnabledProperty.get() && this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL &&
             ( this.bestTimes[ level ].value === null || this.elapsedTimeProperty.get() < this.bestTimes[ level ].value ) ) {
          this.newBestTime = this.bestTimes[ level ].value === null ? false : true; // Don't set this flag for the first 'best time', only when the time improves.
          this.bestTimes[ level ].value = this.elapsedTimeProperty.get();
        }

        if ( this.scoreProperty.get() === MAX_POINTS_PER_GAME_LEVEL && this.timerEnabledProperty.get() ) {
          this.bestTimeVisible[ level ].value = true;
        }

        this.scores[ level ].value = this.scoreProperty.get();

        // When the game is complete, send notification that can be used by phet-io
        this.levelCompletedEmitter.emit1( {
          level: level,
          maxPoints: MAX_POINTS_PER_GAME_LEVEL,
          challenges: CHALLENGES_PER_LEVEL,
          timerEnabled: this.timerEnabledProperty.get(),
          elapsedTime: this.elapsedTimeProperty.get(),
          bestTimes: this.bestTimes[ level ],
          newBestTime: this.newBestTime
        } );

        this.stateProperty.set( BAAGameState.LEVEL_COMPLETED );
      }
    },

    // @public
    reset: function() {
      this.stateProperty.reset();
      this.soundEnabledProperty.reset();
      this.timerEnabledProperty.reset();
      this.levelProperty.reset();
      this.challengeSetProperty.reset();
      this.challengeIndexProperty.reset();
      this.scoreProperty.reset();
      this.elapsedTimeProperty.reset();
      this.bestScores.forEach( function( bestScoreProperty ) { bestScoreProperty.reset(); } );
      this.scores.forEach( function( scoreProperty ) { scoreProperty.reset(); } );
      this.bestTimes.forEach( function( bestTimeProperty ) { bestTimeProperty.reset(); } );
      this.bestTimeVisible.push( function( bestTimeVisibleProperty ) { bestTimeVisibleProperty.reset(); } );
    },

    // @public
    addStepListener: function( stepListener ) {
      this.stepListeners.push( stepListener );
    },

    // @public
    removeStepListener: function( stepListener ) {
      this.stepListeners = _.without( this.stepListeners, stepListener );
    },

    // Set the allowed challenge types to customize for phet-io
    // @private (phet-io)
    setAllowedChallengeTypesByLevel: function( allowedChallengeTypesByLevel ) {
      this.allowedChallengeTypesByLevel = allowedChallengeTypesByLevel;
    },

    /**
     * Specify exact challenges (and ordering) for each level.
     * @param {Array.<Array.<Object>>} challengeSpecsForLevels
     * @public (phet-io)
     */
    setChallenges: function( challengeSpecsForLevels ) {
      var self = this;
      this.predeterminedChallenges = challengeSpecsForLevels.map( function( levelSpec ) {
        return levelSpec.map( function( challengeSpec ) {
          return ChallengeSetFactory.createChallenge( self, challengeSpec.challengeType, new NumberAtom( {
            protonCount: challengeSpec.numberAtom.protonCount,
            neutronCount: challengeSpec.numberAtom.neutronCount,
            electronCount: challengeSpec.numberAtom.electronCount,
            tandem: self.numberAtomGroupTandem.createNextTandem()
          } ), self.challengeSetGroupTandem.createNextTandem() );
        } );
      } );
    },

    // @public
    emitCheckAnswer: function( isCorrect, points, answerAtom, submittedAtom, extension ) {
      var arg = {
        isCorrect: isCorrect,

        correctProtonCount: answerAtom.protonCountProperty.get(),
        correctNeutronCount: answerAtom.neutronCountProperty.get(),
        correctElectronCount: answerAtom.electronCountProperty.get(),

        submittedProtonCount: submittedAtom.protonCountProperty.get(),
        submittedNeutronCount: submittedAtom.neutronCountProperty.get(),
        submittedElectronCount: submittedAtom.electronCountProperty.get(),

        points: points
      };
      this.checkAnswerEmitter.emit1( _.extend( extension, arg ) );
    }
  }, {

    // statics
    MAX_POINTS_PER_GAME_LEVEL: MAX_POINTS_PER_GAME_LEVEL,
    CHALLENGES_PER_LEVEL: CHALLENGES_PER_LEVEL
  } );
} );
