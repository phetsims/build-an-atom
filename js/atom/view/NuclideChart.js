// Copyright 2013-2020, University of Colorado Boulder

/**
 * The partial Nuclide Chart at the bottom right.
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import NuclideChartNode from '../../../../shred/js/view/NuclideChartNode.js';
import buildAnAtom from '../../buildAnAtom.js';


class NuclideChart extends Node {

  /**
   * @param {NumberAtom} numberAtom
   * @param {Tandem} tandem
   * @param {Object} [options]
   */
  constructor( numberAtom, tandem, options ) {

    options.tandem = tandem;
    super();

    // Create and add the Nuclide Chart.
    const nuclideChart = new NuclideChartNode( numberAtom, {
      interactiveMax: 0,
      disabledCellColor: 'white',
      tandem: tandem.createTandem( 'nuclideChart' )
    } );
    this.addChild( nuclideChart );

    // Do the layout.
    nuclideChart.top = 0;
    nuclideChart.left = 0;

    this.mutate( options );
  }
}

buildAnAtom.register( 'NuclideChart', NuclideChart );
export default NuclideChart;