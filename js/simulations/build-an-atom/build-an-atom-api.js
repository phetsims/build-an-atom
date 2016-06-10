// Copyright 2015-2016, University of Colorado Boulder

/**
 * This is the public API for the concentration sim.  It can be used in concert with phetio.js and phetioEvents.js for API
 * simulation features.
 *
 * Conventions:
 * 1. Property names should start with the screen name. This will enable usage in sims where screens are mixed and matced
 * 2. Most components will be top level within the screen.  Sometime nested structure is valuable for composite items
 * 3. UI components have the component type as the suffix, such as showTimerButton.  Model components do not have a suffix
 *      such as concentrationScreen.solute
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var assertInstanceOf = require( 'PHET_IO/assertions/assertInstanceOf' );
  var PhETIOCommon = require( 'PHET_IO/api/PhETIOCommon' );
  var phetio = require( 'PHET_IO/phetio' );
  var phetioInherit = require( 'PHET_IO/phetioInherit' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TArray = require( 'PHET_IO/api/TArray' );
  var TBoolean = require( 'PHET_IO/api/TBoolean' );
  var TButton = require( 'PHET_IO/api/sun/buttons/TButton' );
  var TGroup = require( 'PHET_IO/api/TGroup' );
  var TNode = require( 'PHET_IO/api/scenery/nodes/TNode' );
  var TProperty = require( 'PHET_IO/api/axon/TProperty' );
  var TRadioButton = require( 'PHET_IO/api/sun/buttons/TRadioButton' );
  var TNumber = require( 'PHET_IO/api/TNumber' );
  var TObject = require( 'PHET_IO/api/TObject' );
  var TResetAllButton = require( 'PHET_IO/api/sun/buttons/TResetAllButton' );
  var TString = require( 'PHET_IO/api/TString' );
  var TTandemDragHandler = require( 'PHET_IO/api/tandem/scenery/input/TTandemDragHandler' );
  var TTandemEmitter = require( 'PHET_IO/api/tandem/axon/TTandemEmitter' );
  var TToggleButton = require( 'PHET_IO/api/sun/buttons/TToggleButton' );
  var TVector2 = require( 'PHET_IO/api/dot/TVector2' );
  var TVoid = require( 'PHET_IO/api/TVoid' );

  var TPeriodicTableCell = phetioInherit( TObject, 'TPeriodicTableCell', function( periodicTableCell, phetioID ) {
    assertInstanceOf( periodicTableCell, phet.shred.PeriodicTableCell ); // TODO: Move to PhETIOCommon.js?
    TObject.call( this, periodicTableCell, phetioID );

    var index = null;
    periodicTableCell.startedCallbacksForPressedEmitter.addListener( function() {
      index = phetioEvents.start( 'user', phetioID, 'fired' );
    } );
    periodicTableCell.endedCallbacksForPressedEmitter.addListener( function() {
      phetioEvents.end( index );
    } );
  }, {}, {
    events: [ 'fired' ],

    fromStateObject: function( stateObject ) {
      return new phet.dot.Vector2( stateObject.x, stateObject.y );
    },

    toStateObject: function( instance ) {
      return { x: instance.x, y: instance.y };
    }
  } );

  var TParticle = phetioInherit( TObject, 'TParticle', function( particle, phetioID ) {
    assertInstanceOf( particle, phet.shred.Particle ); // TODO: Move to PhETIOCommon.js?
    TObject.call( this, particle, phetioID );
  }, {}, {
    api: {
      positionProperty: TProperty( TVector2 )
    }
  } );

  // Use explicit names for id keys so they will match what researchers see in data files
  // Use id and type instead of phetioID and typeID to simplify things for researchers
  // Use a map so that JS will help us check that there are no duplicate names.
  var PeriodicTable = {
    row: TGroup( TObject.extend( {
      column: TGroup( TPeriodicTableCell )
    } ) )
  };

  var TBAAGameModel = phetioInherit( TObject, 'TBAAGameModel', function( gameModel, phetioID ) {
    TObject.call( this, gameModel, phetioID );
    assertInstanceOf( gameModel, phet.buildAnAtom.BAAGameModel );
  }, {
    startGameLevel: {
      returnType: TVoid,
      parameterTypes: [ TString ],
      implementation: function( levelType ) {
        this.instance.startGameLevel( levelType );
      },
      documentation: 'Start one of the following games: periodic-table-game, mass-and-charge-game, symbol-game, advanced-symbol-game'
    },
    setAllowedProblemTypesByLevel: {
      returnType: TVoid,
      parameterTypes: [ TArray( TArray( TString ) ) ],
      implementation: function( allowedProblemTypesByLevel ) {
        this.instance.setAllowedProblemTypesByLevel( allowedProblemTypesByLevel );
      },
      documentation: 'Specify which problem types may be presented to the user for each level.'
        // The default value is [
        //    [ 'schematic-to-element', 'counts-to-element' ],
        //    [ 'counts-to-charge', 'counts-to-mass', 'schematic-to-charge', 'schematic-to-mass' ],
        //    [ 'schematic-to-symbol-charge', 'schematic-to-symbol-mass-number', 'schematic-to-symbol-proton-count', 'counts-to-symbol-charge', 'counts-to-symbol-mass' ],
        //    [ 'schematic-to-symbol-all', 'symbol-to-schematic', 'symbol-to-counts', 'counts-to-symbol-all' ]
        //  ]
    }
  }, {
    events: 'levelCompleted'
  } );

  var levelButtons = {
    checkAnswerButton: TButton,
    nextButton: TButton,
    tryAgainButton: TButton,
    displayCorrectAnswerButton: TButton
  };
  var ToElementProblemView = _.extend( {
    neutralOrIonProperty: TProperty( TString ),
    periodicTableAtom: {
      protonCountProperty: TProperty( TNumber ),
      neutronCountProperty: TProperty( TNumber ),
      electronCountProperty: TProperty( TNumber )
    },
    periodicTable: PeriodicTable,
    neutralAtomRadioButton: TRadioButton( TString ),
    ionRadioButton: TRadioButton( TString )
  }, levelButtons );
  var UpAndDownButtons = {
    upArrowButton: TButton,
    downArrowButton: TButton
  };
  var SymbolNodeWithContents = TNode.extend( {
    chargeEntryNode: UpAndDownButtons,
    massNumberEntryNode: UpAndDownButtons,
    protonCountEntryNode: UpAndDownButtons,
    protonCountProperty: TProperty( TNumber ),
    massNumberProperty: TProperty( TNumber ),
    chargeProperty: TProperty( TNumber )
  } );
  var buildAnAtomAPI = PhETIOCommon.createAPI( {
    buildAnAtom: PhETIOCommon.createSim( {
      atomScreen: {
        model: {
          protons: TGroup( TParticle ),
          neutrons: TGroup( TParticle ),
          electrons: TGroup( TParticle )
        },
        view: {
          periodicTableAndSymbol: {
            periodicTable: PeriodicTable
          },
          nucleons: TGroup( TParticle.extend( {
            inputListener: TTandemDragHandler
          } ) ),
          electrons: TGroup( TParticle.extend( {
            inputListener: TTandemDragHandler
          } ) )
        }
      },
      symbolScreen: {
        model: {
          protons: TGroup( TParticle ),
          neutrons: TGroup( TParticle ),
          electrons: TGroup( TParticle )
        },
        view: {
          periodicTableAndSymbol: {
            periodicTable: PeriodicTable
          },
          nucleons: TGroup( TParticle.extend( {
            inputListener: TTandemDragHandler
          } ) ),
          electrons: TGroup( TParticle.extend( {
            inputListener: TTandemDragHandler
          } ) )
        }
      },
      gameScreen: {
        model: TBAAGameModel.extend( {
          levelCompletedEmitter: TTandemEmitter( [ TObject ] ),
          checkAnswerEmitter: TTandemEmitter( [ TObject ] ),
          stateProperty: TProperty( TString ),
          soundEnabledProperty: TProperty( TBoolean ),
          timerEnabledProperty: TProperty( TBoolean ),
          levelProperty: TProperty( TNumber ),
          problemIndexProperty: TProperty( TNumber ),
          scoreProperty: TProperty( TNumber ),
          problemSets: TGroup( TObject.extend( {
            problems: TGroup( TObject.extend( {
              buildAnAtomModel: {
                protons: TGroup( TParticle ),
                neutrons: TGroup( TParticle ),
                electrons: TGroup( TParticle )
              }
            } ) )
          } ) )
        } ),
        view: {
          startGameLevelNode: {
            periodicTableGameButton: TButton,
            resetAllButton: TResetAllButton,
            timerToggleButton: TToggleButton( TBoolean ),
            soundToggleButton: TToggleButton( TBoolean )
          },
          levelCompletedNode: {
            continueButton: TButton
          },
          rewardNode: {
            interactiveSymbolNodes: TGroup( {
              protonCountProperty: TProperty( TNumber ),
              massNumberProperty: TProperty( TNumber ),
              chargeProperty: TProperty( TNumber )
            } )
          },
          scoreboard: {
            startOverButton: TButton
          },
          problemView: TGroup( TObject.extend( {
            countsToElementProblemView: ToElementProblemView,
            schematicToElementProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) )
              }
            }, ToElementProblemView ),
            schematicToChargeProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) )
              },
              chargeAnswerProperty: TProperty( TNumber ),
              chargeEntryNode: UpAndDownButtons
            }, levelButtons ),
            schematicToMassNumberProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) )
              },
              massNumberAnswerProperty: TProperty( TNumber ),
              massEntryNode: UpAndDownButtons
            }, levelButtons ),
            countsToMassNumberProblemView: _.extend( {
              massNumberAnswerProperty: TProperty( TNumber ),
              numberEntryNode: UpAndDownButtons
            }, levelButtons ),
            countsToChargeProblemView: _.extend( {
              chargeAnswerProperty: TProperty( TNumber ),
              numberEntryNode: UpAndDownButtons
            }, levelButtons ),
            schematicToSymbolProblemView: _.extend( {
              interactiveSymbolNode: SymbolNodeWithContents,
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) )
              }
            }, levelButtons ),
            countsToSymbolProblemView: _.extend( {
              interactiveSymbolNode: SymbolNodeWithContents
            }, levelButtons ),
            symbolToCountsProblemView: _.extend( {
              numberAtom: {
                protonCountProperty: TProperty( TNumber ),
                neutronCountProperty: TProperty( TNumber ),
                electronCountProperty: TProperty( TNumber )
              },
              interactiveSymbolNode: {
                protonCountProperty: TProperty( TNumber ),
                massNumberProperty: TProperty( TNumber ),
                chargeProperty: TProperty( TNumber )
              },
              protonCountEntryNode: UpAndDownButtons,
              neutronCountEntryNode: UpAndDownButtons,
              electronCountEntryNode: UpAndDownButtons
            }, levelButtons ),
            symbolToSchematicProblemView: _.extend( {
              interactiveSchematicAtom: {
                protonBucketDragHandler: TTandemDragHandler,
                neutronBucketDragHandler: TTandemDragHandler,
                electronBucketDragHandler: TTandemDragHandler,
                nucleons: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) ),
                electrons: TGroup( TParticle.extend( {
                  inputListener: TTandemDragHandler
                } ) )
              },
              interactiveSymbolNode: TNode.extend( {
                protonCountProperty: TProperty( TNumber ),
                massNumberProperty: TProperty( TNumber ),
                chargeProperty: TProperty( TNumber )
              } )
            }, levelButtons )
          } ) )
        }
      }
    } )
  } );

  phetioNamespace.register( 'build-an-atom-api', buildAnAtomAPI );

  // Set the phetio.api after it was declared
  phetio.api = buildAnAtomAPI;

  // Register phetio as a tandem instance after API assigned
  new Tandem( 'phetio' ).addInstance( phetio );

  return buildAnAtomAPI;
} );

