// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import atomIcon from '../../images/atom_icon_png.js';
import atomIconSmall from '../../images/atom_icon_small_png.js';
import buildAnAtomStrings from '../build-an-atom-strings.js';
import buildAnAtom from '../buildAnAtom.js';
import BuildAnAtomModel from '../common/model/BuildAnAtomModel.js';
import BuildAnAtomView from './view/BuildAnAtomView.js';

const atomString = buildAnAtomStrings.atom;


/**
 * @constructor
 * @param {Tandem} tandem
 */
function BuildAnAtomScreen( tandem ) {
  Screen.call(
    this,
    function() { return new BuildAnAtomModel( tandem.createTandem( 'model' ) ); },
    function( model ) { return new BuildAnAtomView( model, tandem.createTandem( 'view' ) ); },
    {
      name: atomString,
      homeScreenIcon: new Image( atomIcon ),
      navigationBarIcon: new Image( atomIconSmall ),
      tandem: tandem
    }
  );
}

buildAnAtom.register( 'BuildAnAtomScreen', BuildAnAtomScreen );

inherit( Screen, BuildAnAtomScreen );
export default BuildAnAtomScreen;