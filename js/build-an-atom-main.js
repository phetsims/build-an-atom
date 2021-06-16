// Copyright 2013-2021, University of Colorado Boulder

/**
 * Main file for the Build an Atom simulation.
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import BAAGlobalOptions from './common/BAAGlobalOptions.js';
import GlobalOptionsNode from './common/view/GlobalOptionsNode.js';
import Tandem from '../../tandem/js/Tandem.js';
import AtomScreen from './atom/AtomScreen.js';
import buildAnAtomStrings from './buildAnAtomStrings.js';
import GameScreen from './game/GameScreen.js';
import SymbolScreen from './symbol/SymbolScreen.js';

const buildAnAtomTitleString = buildAnAtomStrings[ 'build-an-atom' ].title;

// root tandem
const tandem = Tandem.ROOT;

const simOptions = {
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

  // create content for the Options dialog
  createOptionsDialogContent: tandem => new GlobalOptionsNode( BAAGlobalOptions.highContrastParticlesProperty, tandem )
};

simLauncher.launch( () => {
  const screens = [
    new AtomScreen( tandem.createTandem( 'atomScreen' ) ),
    new SymbolScreen( tandem.createTandem( 'symbolScreen' ) )
  ];

  // PhET-iO does not support the game screen (yet), see https://github.com/phetsims/build-an-atom/issues/156
  if ( !Tandem.PHET_IO_ENABLED ) {
    screens.push( new GameScreen( tandem.createTandem( 'gameScreen' ) ) );
  }
  new Sim( buildAnAtomTitleString, screens, simOptions ).start();
} );