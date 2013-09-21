// Copyright 2002-2013, University of Colorado Boulder

define( function( require ) {
  'use strict';

  // Imports
  var Sound = require( 'VIBE/Sound' );

  // Constants
  var CORRECT_ANSWER = new Sound( 'audio/remove-battery.mp3' ); // TODO: Add correct sounds when available.

  /**
   * @param soundEnabledProperty
   * @constructor
   */
  function GameAudioPlayer( soundEnabledProperty ) {
    this.soundEnabledProperty = soundEnabledProperty;
  };

  GameAudioPlayer.prototype.correctAnswer = function() {
    if ( this.soundEnabledProperty.value ) {
      CORRECT_ANSWER.play();
    }
  }

  return GameAudioPlayer;
} );