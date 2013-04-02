// Copyright 2002-2012, University of Colorado
define( [
          'lodash',
          'SCENERY/nodes/Node',
          'SCENERY/nodes/Circle',
          'SCENERY/input/SimpleDragHandler',
          'PHET_CORE/inherit',
          'common/Point2D',
          'common/DragHandler'
        ], function ( _, Node, Circle, SimpleDragHandler, inherit, Point2D, DragHandler ) {

  //-------------------------------------------------------------------------
  // Constants
  //-------------------------------------------------------------------------

  var TOUCH_INFLATION_MULTIPLIER = 4;
  var TOUCH_INFLATION_OFFSET = 45; // In pixels.

  //-------------------------------------------------------------------------
  // Constructor(s)
  //-------------------------------------------------------------------------

  function ParticleView( particle, mvt ) {

    Node.call( this ); // Call super constructor.
    var particleView = this;

    // Set up fields.
    this.particle = particle;
    this.mvt = mvt;
    this.drawRadius = mvt.modelToView( particle.radius );

    // Create the basic shape.
    this.addChild( new Circle( this.drawRadius, { fill: 'red' } ) );

    // Listen to the model position and update.
    particle.link( 'position', function ( m, position ) {
      particleView.translation = mvt.modelToView( position );
    } );

    // Add a drag handler to each node
    this.addInputListener( new SimpleDragHandler( {
                                                    // allow moving a finger (touch) across a node to pick it up
                                                    allowTouchSnag: true
                                                  } ) );


    // Set up event handlers.
//    var self = this;
//    DragHandler.register( this,
//                          function ( point ) {
//                            particle.setLocation( mvt.viewToModel( point ) );
//                          },
//                          function ( pressEvent ) {
//
//                            pressEvent.onMouseUp = function ( mouseUpEvent ) {
//                              particle.setUserControlled( false, mouseUpEvent );
//                            };
//
//                            particle.setUserControlled( true, pressEvent );
//                          } );

//    particle.events.on( 'locationChange', function () {
//      var newLocation = mvt.modelToView( new Point2D( particle.x, particle.y ) );
//      self.x = newLocation.x;
//      self.y = newLocation.y;
//    } );
//
//    particle.events.on( 'userGrabbed', function ( e, isTouchEvent ) {
//      if ( isTouchEvent ) {
//        self.drawRadius = self.mvt.modelToView( self.particle.radius ) * TOUCH_INFLATION_MULTIPLIER;
//        self.regY = TOUCH_INFLATION_OFFSET;
//      }
//
//      self.render();
//    } );
//
//    particle.events.on( 'userReleased', function ( e, isTouchEvent ) {
//      if ( isTouchEvent ) {
//        self.drawRadius = self.mvt.modelToView( self.particle.radius );
//        self.regY = 0;
//      }
//      self.render();
//    } );
  }

  // Inherit from Node.
  inherit( ParticleView, Node );

  return ParticleView;
} );
