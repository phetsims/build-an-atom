// Copyright 2013-2025, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 *
 * @author John Blanco (PhET Interactive Simulations)
 */

import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import AtomScreen from './atom/AtomScreen.js';
import BuildAnAtomStrings from './BuildAnAtomStrings.js';
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
      softwareDevelopment: 'John Blanco, Aadish Gupta, Sam Reid',
      team: 'Jack Barbera, Suzanne Brahmia, Julia Chamberlain, Yuen-ying Carpenter, ' +
            'Kelly Lancaster, Patricia Loeblein, Emily B. Moore, Robert Parson, ' +
            'Ariel Paul, Kathy Perkins, Sharon Siman-Tov',
      qualityAssurance: 'Steele Dalton, Alex Dornan, Bryce Griebenow, Ethan Johnson, ' +
                        'Elise Morgan, Ben Roberts',
      thanks: 'Conversion of this simulation to HTML5 was funded by the Royal Society of Chemistry.'
    }
  };

  new Sim( buildAnAtomTitleStringProperty, screens, options ).start();
} );