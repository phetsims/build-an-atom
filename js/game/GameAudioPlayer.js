// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Sound = require( 'VIBE/Sound' );
  var correctAnswerSound = require( 'audio!BUILD_AN_ATOM/../audio/correctAnswer.mp3' );
  var wrongAnswerSound = require( 'audio!BUILD_AN_ATOM/../audio/wrongAnswer.mp3' );
  var imperfectScoreSound = require( 'audio!BUILD_AN_ATOM/../audio/gameOver-imperfectScore.mp3' );
  var perfectScoreSound = require( 'audio!BUILD_AN_ATOM/../audio/gameOver-imperfectScore.mp3' );

  // Constants
  var CORRECT_ANSWER = new Sound( correctAnswerSound ); // TODO: Add correct sounds when available.
  var WRONG_ANSWER = new Sound( wrongAnswerSound ); // TODO: Add correct sounds when available.
  var IMPERFECT_SCORE = new Sound( imperfectScoreSound ); // TODO: Add correct sounds when available.
  var PERFECT_SCORE = new Sound( perfectScoreSound ); // TODO: Add correct sounds when available.

  /**
   * @param soundEnabledProperty
   * @constructor
   */
  function GameAudioPlayer( soundEnabledProperty ) {
    this.soundEnabledProperty = soundEnabledProperty;
  }

  GameAudioPlayer.prototype.correctAnswer = function() {
    if ( this.soundEnabledProperty.value ) {
      CORRECT_ANSWER.play();
    }
  };

  GameAudioPlayer.prototype.wrongAnswer = function() {
    if ( this.soundEnabledProperty.value ) {
      WRONG_ANSWER.play();
    }
  };

  GameAudioPlayer.prototype.gameOverZeroScore = function() {
    if ( this.soundEnabledProperty.value ) {
      WRONG_ANSWER.play();
    }
  };

  GameAudioPlayer.prototype.gameOverImperfectScore = function() {
    if ( this.soundEnabledProperty.value ) {
      IMPERFECT_SCORE.play();
    }
  };

  GameAudioPlayer.prototype.gameOverPerfectScore = function() {
    if ( this.soundEnabledProperty.value ) {
      PERFECT_SCORE.play();
    }
  };

  return GameAudioPlayer;
} );