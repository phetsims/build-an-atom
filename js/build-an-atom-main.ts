// Copyright 2013-2024, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import AtomScreen from './atom/AtomScreen.js';
import BuildAnAtomStrings from './BuildAnAtomStrings.js';
import BAAGlobalPreferences from './common/BAAGlobalPreferences.js';
import VisualPreferencesNode from './common/view/VisualPreferencesNode.js';
import GameScreen from './game/GameScreen.js';
import SymbolScreen from './symbol/SymbolScreen.js';

const buildAnAtomTitleStringProperty = BuildAnAtomStrings[ 'build-an-atom' ].titleStringProperty;

// root tandem
const tandem = Tandem.ROOT;

simLauncher.launch( () => {
  const screens = [
    new AtomScreen( tandem.createTandem( 'atomScreen' ) ),
    new SymbolScreen( tandem.createTandem( 'symbolScreen' ) )
  ];

  const options: SimOptions = {

    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, ' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson, ' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, ' +
                        'Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    },

    preferencesModel: new PreferencesModel( {
      visualOptions: {
        customPreferences: [ {
          createContent: tandem => new VisualPreferencesNode( BAAGlobalPreferences.highContrastParticlesProperty,
            tandem.createTandem( 'simPreferences' ) )
        } ]
      }
    } )
  };

  // PhET-iO does not support the game screen (yet), see https://github.com/phetsims/build-an-atom/issues/156
  if ( !Tandem.PHET_IO_ENABLED ) {
    screens.push( new GameScreen( tandem.createTandem( 'gameScreen' ) ) );
  }
  new Sim( buildAnAtomTitleStringProperty, screens, options ).start();
} );