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
  var TCheckBox = require( 'PHET_IO/types/sun/TCheckBox' );
  var phetio = require( 'PHET_IO/phetio' );
  var phetioNamespace = require( 'PHET_IO/phetioNamespace' );
  var Tandem = require( 'TANDEM/Tandem' );
  var TBAAGameModel = require( 'PHET_IO/simulations/build-an-atom/TBAAGameModel' );
  var TBoolean = require( 'PHET_IO/types/TBoolean' );
  var TPushButton = require( 'PHET_IO/types/sun/buttons/TPushButton' );
  var TGroup = require( 'PHET_IO/types/TGroup' );
  var TNode = require( 'PHET_IO/types/scenery/nodes/TNode' );
  var TNumber = require( 'PHET_IO/types/TNumber' );
  var TProperty = require( 'PHET_IO/types/axon/TProperty' );
  var TRadioButton = require( 'PHET_IO/types/sun/TRadioButton' );
  var TRandom = require( 'PHET_IO/types/dot/TRandom' );
  var TObject = require( 'PHET_IO/types/TObject' );
  var TParticle = require( 'PHET_IO/types/shred/TParticle' );
  var TPeriodicTableCell = require( 'PHET_IO/simulations/build-an-atom/TPeriodicTableCell' );
  var TResetAllButton = require( 'PHET_IO/types/sun/buttons/TResetAllButton' );
  var TString = require( 'PHET_IO/types/TString' );
  var TTandemSimpleDragHandler = require( 'PHET_IO/types/tandem/scenery/input/TTandemSimpleDragHandler' );
  var TTandemEmitter = require( 'PHET_IO/types/tandem/axon/TTandemEmitter' );
  var TToggleButton = require( 'PHET_IO/types/sun/buttons/TToggleButton' );
  var TVerticalCheckBoxGroup = require( 'PHET_IO/types/sun/TVerticalCheckBoxGroup' );

  // Use explicit names for id keys so they will match what researchers see in data files
  // Use id and type instead of phetioID and typeID to simplify things for researchers
  // Use a map so that JS will help us check that there are no duplicate names.
  var PeriodicTable = {
    row: TGroup( TObject.extend( {
      column: TGroup( TPeriodicTableCell )
    } ) )
  };

  var levelButtons = {
    checkAnswerButton: TPushButton,
    nextButton: TPushButton,
    tryAgainButton: TPushButton,
    displayCorrectAnswerButton: TPushButton
  };
  var ToElementProblemView = _.extend( {
    neutralOrIonProperty: TProperty( TString ),
    periodicTableAtom: {
      protonCountProperty: TProperty( TNumber() ),
      neutronCountProperty: TProperty( TNumber() ),
      electronCountProperty: TProperty( TNumber() )
    },
    periodicTable: PeriodicTable,
    neutralAtomRadioButton: TRadioButton( TString ),
    ionRadioButton: TRadioButton( TString )
  }, levelButtons );
  var UpAndDownButtons = {
    upArrowButton: TPushButton,
    downArrowButton: TPushButton
  };
  var SymbolNodeWithContents = TNode.extend( {
    chargeEntryNode: UpAndDownButtons,
    massNumberEntryNode: UpAndDownButtons,
    protonCountEntryNode: UpAndDownButtons,
    protonCountProperty: TProperty( TNumber() ),
    massNumberProperty: TProperty( TNumber() ),
    chargeProperty: TProperty( TNumber() )
  } );
  var buildAnAtomAPI = ( {
    buildAnAtom: ( {
      problemSetFactory: {
        random: TRandom
      },
      atomScreen: {
        model: {
          protons: TGroup( TParticle ),
          neutrons: TGroup( TParticle ),
          electrons: TGroup( TParticle )
        },
        view: {
          bucket: TGroup( TObject ),
          labelVisualizationControlPanel: TVerticalCheckBoxGroup.extend( {
            showElementNameCheckBox: TCheckBox,
            showNeutralOrIonCheckBox: TCheckBox,
            showStableOrUnstableCheckBox: TCheckBox
          } ),
          orbitsRadioButton: TRadioButton( TString ),
          cloudRadioButton: TRadioButton( TString ),
          periodicTableAndSymbol: {
            periodicTable: PeriodicTable
          },
          resetAllButton: TResetAllButton,
          nucleons: TGroup( TParticle.extend( {
            inputListener: TTandemSimpleDragHandler
          } ) ),
          electrons: TGroup( TParticle.extend( {
            inputListener: TTandemSimpleDragHandler
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
          bucket: TGroup( TObject ),
          labelVisualizationControlPanel: TVerticalCheckBoxGroup.extend( {
            showElementNameCheckBox: TCheckBox,
            showNeutralOrIonCheckBox: TCheckBox,
            showStableOrUnstableCheckBox: TCheckBox
          } ),
          orbitsRadioButton: TRadioButton( TString ),
          cloudRadioButton: TRadioButton( TString ),
          resetAllButton: TResetAllButton,
          periodicTableAndSymbol: {
            periodicTable: PeriodicTable
          },
          nucleons: TGroup( TParticle.extend( {
            inputListener: TTandemSimpleDragHandler
          } ) ),
          electrons: TGroup( TParticle.extend( {
            inputListener: TTandemSimpleDragHandler
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
          levelProperty: TProperty( TNumber() ),
          problemIndexProperty: TProperty( TNumber() ),
          scoreProperty: TProperty( TNumber() ),
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
            periodicTableGameButton: TPushButton,
            resetAllButton: TResetAllButton,
            timerToggleButton: TToggleButton( TBoolean ),
            soundToggleButton: TToggleButton( TBoolean ),
            massAndChargeGameButton: TPushButton,
            symbolGameButton: TPushButton,
            advancedSymbolGameButton: TPushButton
          },
          levelCompletedNode: {
            continueButton: TPushButton
          },
          rewardNode: {
            interactiveSymbolNodes: TGroup( {
              protonCountProperty: TProperty( TNumber() ),
              massNumberProperty: TProperty( TNumber() ),
              chargeProperty: TProperty( TNumber() )
            } )
          },
          scoreboard: {
            startOverButton: TPushButton
          },
          problemView: TGroup( TObject.extend( {
            countsToElementProblemView: ToElementProblemView,
            schematicToElementProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) )
              }
            }, ToElementProblemView ),
            schematicToChargeProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) )
              },
              chargeAnswerProperty: TProperty( TNumber() ),
              chargeEntryNode: UpAndDownButtons
            }, levelButtons ),
            schematicToMassNumberProblemView: _.extend( {
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) )
              },
              massNumberAnswerProperty: TProperty( TNumber() ),
              massEntryNode: UpAndDownButtons
            }, levelButtons ),
            countsToMassNumberProblemView: _.extend( {
              massNumberAnswerProperty: TProperty( TNumber() ),
              numberEntryNode: UpAndDownButtons
            }, levelButtons ),
            countsToChargeProblemView: _.extend( {
              chargeAnswerProperty: TProperty( TNumber() ),
              numberEntryNode: UpAndDownButtons
            }, levelButtons ),
            schematicToSymbolProblemView: _.extend( {
              interactiveSymbolNode: SymbolNodeWithContents,
              noninteractiveSchematicAtomNode: {
                particle: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) )
              }
            }, levelButtons ),
            countsToSymbolProblemView: _.extend( {
              interactiveSymbolNode: SymbolNodeWithContents
            }, levelButtons ),
            symbolToCountsProblemView: _.extend( {
              numberAtom: {
                protonCountProperty: TProperty( TNumber() ),
                neutronCountProperty: TProperty( TNumber() ),
                electronCountProperty: TProperty( TNumber() )
              },
              interactiveSymbolNode: {
                protonCountProperty: TProperty( TNumber() ),
                massNumberProperty: TProperty( TNumber() ),
                chargeProperty: TProperty( TNumber() )
              },
              protonCountEntryNode: UpAndDownButtons,
              neutronCountEntryNode: UpAndDownButtons,
              electronCountEntryNode: UpAndDownButtons
            }, levelButtons ),
            symbolToSchematicProblemView: _.extend( {
              interactiveSchematicAtom: {
                protonBucketDragHandler: TTandemSimpleDragHandler,
                neutronBucketDragHandler: TTandemSimpleDragHandler,
                electronBucketDragHandler: TTandemSimpleDragHandler,
                nucleons: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) ),
                electrons: TGroup( TParticle.extend( {
                  inputListener: TTandemSimpleDragHandler
                } ) )
              },
              interactiveSymbolNode: TNode.extend( {
                protonCountProperty: TProperty( TNumber() ),
                massNumberProperty: TProperty( TNumber() ),
                chargeProperty: TProperty( TNumber() )
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

