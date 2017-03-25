/* jshint node: true, unused: true, undef: true */
/* globals it */

var assert = require('assert');
var EvEmitter = require('../ev-emitter');

it( 'should emitEvent', function() {
  var emitter = new EvEmitter();
  var didPop;
  emitter.on( 'pop', function() {
    didPop = true;
  });
  emitter.emitEvent( 'pop' );
  assert.ok( didPop, 'event emitted' );
});

it( 'emitEvent should pass argument to listener', function() {
  var emitter = new EvEmitter();
  var result;
  function onPop( arg ) {
    result = arg;
  }
  emitter.on( 'pop', onPop );
  emitter.emitEvent( 'pop', [ 1 ] );
  assert.equal( result, 1, 'event emitted, arg passed' );
});

it( 'does not allow same listener to be added', function() {
  var emitter = new EvEmitter();
  var ticks = 0;
  function onPop() {
    ticks++;
  }
  emitter.on( 'pop', onPop );
  emitter.on( 'pop', onPop );
  var _onPop = onPop;
  emitter.on( 'pop', _onPop );

  emitter.emitEvent('pop');
  assert.equal( ticks, 1, '1 tick for same listener' );
});

it( 'should remove listener with .off()', function() {
  var emitter = new EvEmitter();
  var ticks = 0;
  function onPop() {
    ticks++;
  }
  emitter.on( 'pop', onPop );
  emitter.emitEvent('pop');
  emitter.off( 'pop', onPop );
  emitter.emitEvent('pop');
  assert.equal( ticks, 1, '.off() removed listener' );
});

it( 'should handle once()', function() {
  var emitter = new EvEmitter();
  var ary = [];

  emitter.on( 'pop', function() {
    ary.push('a');
  });
  emitter.once( 'pop', function() {
    ary.push('b');
  });
  emitter.on( 'pop', function() {
    ary.push('c');
  });
  emitter.emitEvent('pop');
  emitter.emitEvent('pop');

  assert.equal( ary.join(','), 'a,b,c,a,c', 'once listener triggered once' );
});

it( 'does not infinite loop in once()', function() {
  var emitter = new EvEmitter();
  var ticks = 0;
  function onPop() {
    ticks++;
    if ( ticks < 4 ) {
      emitter.emitEvent('pop');
    }
  }

  emitter.once( 'pop', onPop );
  emitter.emitEvent('pop');
  assert.equal( ticks, 1, '1 tick with emitEvent in once' );
});

it( 'handles emitEvent with no listeners', function() {
  var emitter = new EvEmitter();
  assert.doesNotThrow( function() {
    emitter.emitEvent( 'pop', [ 1, 2, 3 ] );
  });

  function onPop() {}

  emitter.on( 'pop', onPop );
  emitter.off( 'pop', onPop );

  assert.doesNotThrow( function() {
    emitter.emitEvent( 'pop', [ 1, 2, 3 ] );
  });

  emitter.on( 'pop', onPop );
  emitter.emitEvent( 'pop', [ 1, 2, 3 ] );
  emitter.off( 'pop', onPop );

  assert.doesNotThrow( function() {
    emitter.emitEvent( 'pop', [ 1, 2, 3 ] );
  });
});
