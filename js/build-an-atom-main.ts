// Copyright 2013-2025, University of Colorado Boulder

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
import BAAPreferences from './common/model/BAAPreferences.js';
import BAAPreferencesNode from './common/view/BAAPreferencesNode.js';
import GameScreen from './game/GameScreen.js';
import SymbolScreen from './symbol/SymbolScreen.js';

const buildAnAtomTitleStringProperty = BuildAnAtomStrings[ 'build-an-atom' ].titleStringProperty;

// root tandem
const tandem = Tandem.ROOT;

simLauncher.launch( () => {
  const screens: ( AtomScreen | SymbolScreen | GameScreen )[] = [
    new AtomScreen( tandem.createTandem( 'atomScreen' ) ),
    new SymbolScreen( tandem.createTandem( 'symbolScreen' ) ),
    new GameScreen( tandem.createTandem( 'gameScreen' ) )
  ];

  const options: SimOptions = {

    credits: {
      leadDesign: 'Kelly Lancaster',
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid, Agust\u00edn Vallejo',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, Kelly Lancaster, ' +
            'Patricia Loeblein, Emily B. Moore, Robert Parson, Ariel Paul, Kathy Perkins, Amy Rouinfar,<br>' +
            'Nancy Salpepi, Sharon Siman-Tov, Taliesin Smith',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, ' +
                        'Matthew Moore, Elise Morgan, Valentina P\u00e9rez, Ben Roberts, Kathryn Woessner',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    },

    // Preferences
    preferencesModel: new PreferencesModel( {
      simulationOptions: {
        customPreferences: [ {
          createContent: tandem => new BAAPreferencesNode( BAAPreferences.instance, tandem )
        } ]
      }
    } ),

    phetioDesigned: true
  };

  new Sim( buildAnAtomTitleStringProperty, screens, options ).start();
} );