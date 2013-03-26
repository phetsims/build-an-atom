// Copyright 2002-2012, University of Colorado
define( [
          'lodash',
          'SCENERY/main',
          'common/Point2D'
        ], function ( _, scenery, Point2D ) {

  var BucketHole = function ( bucket, mvt ) {
    scenery.Node.call( this );
    this.bucket = bucket;
    this.initialize( mvt );
  };

  BucketHole.prototype = scenery.Util.objectCreate( scenery.Node.prototype );
  var p = BucketHole.prototype;

  p.initialize = function ( mvt ) {
    var width = mvt.modelToView( this.bucket.width );
    var height = mvt.modelToView( width * 0.2 );
    var center = mvt.modelToView( new Point2D( this.bucket.x, this.bucket.y ) );

    var shape = new scenery.Shape();
//    shape.graphics.drawEllipse( 0, 0, width, height );
    shape.graphics.beginStroke( "black" ).beginFill( "black" ).setStrokeStyle( 2 ).drawEllipse( 0, 0, width, height ).endStroke().endFill();
    this.addChild( new scenery.Path( shape, { stroke: "black", fill: "black" }) );

    this.x = center.x - width / 2;
    this.y = center.y;
  };

  return BucketHole;
} );
