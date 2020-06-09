// Copyright 2017-2020, University of Colorado Boulder

/**
 * The 'Build an Atom' screen in the 'Build an Atom' simulation. Conforms to the contract specified in joist/Screen.
 *
 * @author John Blanco
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import elementIcon from '../../images/element_icon_png.js';
import elementIconSmall from '../../images/element_icon_small_png.js';
import buildAnAtom from '../buildAnAtom.js';
import buildAnAtomStrings from '../buildAnAtomStrings.js';
import BuildAnAtomModel from '../common/model/BuildAnAtomModel.js';
import SymbolView from './view/SymbolView.js';

const symbolString = buildAnAtomStrings.symbol;


/**
 * @constructor
 * @param {Tandem} tandem
 */
function SymbolScreen( tandem ) {
  Screen.call(
    this,
    function() { return new BuildAnAtomModel( tandem.createTandem( 'model' ) ); },
    function( model ) { return new SymbolView( model, tandem.createTandem( 'view' ) ); },
    {
      name: symbolString,
      backgroundColorProperty: new Property( 'rgb( 242, 255, 204 )' ), /* Light yellow-green */
      homeScreenIcon: new ScreenIcon( new Image( elementIcon ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      navigationBarIcon: new ScreenIcon( new Image( elementIconSmall ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1
      } ),
      tandem: tandem
    }
  );
}

buildAnAtom.register( 'SymbolScreen', SymbolScreen );

inherit( Screen, SymbolScreen );
export default SymbolScreen;