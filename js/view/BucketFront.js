// Copyright 2002-2012, University of Colorado
define(
    [ 'lodash', 'SCENERY/main', 'common/Point2D' ],
        function ( _, scenery, Point2D ) {

  var _ = require("lodash");
  var scenery = require("SCENERY/main");

  /**
   * @class BucketFront
   * @param bucket The model of the bucket.
   * @constructor
   **/
  var BucketFront = function ( bucket, mvt ) {
    scenery.Node.call( this );
    this.initialize( bucket, mvt );
  };

  BucketFront.prototype = scenery.Util.objectCreate( scenery.Node.prototype );
  var p = BucketFront.prototype;

  p.initialize = function ( bucket, mvt ) {

    this.bucket = bucket;
    var width = mvt.modelToView( this.bucket.width );
    var height = width * 0.5; // Determined empirically for best look.

    // Create the basic shape of the front of the bucket.
    var shape = new scenery.Shape();
    shape
      //        .beginLinearGradientFill( ["white", bucket.color, "gray" ], [.05, .9, 1], 0, 0, width, 0 ) TODO: Put this back in when Scenery supports it.
        .moveTo( 0, 0 )
        .lineTo( width * 0.1, height * 0.8 )
        .quadraticCurveTo( width / 2, height * 1.0, width * 0.9, height * 0.8 )
        .lineTo( width, 0 )
        .quadraticCurveTo( width / 2, height * 0.2, 0, 0 )
        .close()
    this.addChild( new scenery.Path( {
                                       stroke: "black",
                                       lineWidth: 2,
                                       fill: bucket.color,
                                       shape: shape
                                     } ) );

    // Create and add the label, centered on the front.
    var label = new scenery.Text(
        this.bucket.labelText,
        {
          font: "bold 24px Helvetica",
          fill: "white",
          centerX: width / 2,
          centerY: height / 2
        } );
    this.addChild( label );

    // Set the position.
    var topCenter = mvt.modelToView( new Point2D( this.bucket.x, this.bucket.y ) );
    this.x = topCenter.x;
    this.y = topCenter.y;
  };

  return BucketFront;
} );
