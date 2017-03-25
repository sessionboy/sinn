function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import { noop, is, check, uid as nextSagaId, wrapSagaDispatch, isDev, log } from './utils';
import proc from './proc';
import { emitter } from './channel';
import { ident } from './utils';

export default function sagaMiddlewareFactory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var runSagaDynamically = void 0;
  var sagaMonitor = options.sagaMonitor;

  // monitors are expected to have a certain interface, let's fill-in any missing ones

  if (sagaMonitor) {
    sagaMonitor.effectTriggered = sagaMonitor.effectTriggered || noop;
    sagaMonitor.effectResolved = sagaMonitor.effectResolved || noop;
    sagaMonitor.effectRejected = sagaMonitor.effectRejected || noop;
    sagaMonitor.effectCancelled = sagaMonitor.effectCancelled || noop;
    sagaMonitor.actionDispatched = sagaMonitor.actionDispatched || noop;
  }

  if (is.func(options)) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead');
    } else {
      throw new Error('You passed a function to the Saga middleware. You are likely trying to start a        Saga by directly passing it to the middleware. This is no longer possible starting from 0.10.0.        To run a Saga, you must do it dynamically AFTER mounting the middleware into the store.\n        Example:\n          import createSagaMiddleware from \'redux-saga\'\n          ... other imports\n\n          const sagaMiddleware = createSagaMiddleware()\n          const store = createStore(reducer, applyMiddleware(sagaMiddleware))\n          sagaMiddleware.run(saga, ...args)\n      ');
    }
  }

  if (options.logger && !is.func(options.logger)) {
    throw new Error('`options.logger` passed to the Saga middleware is not a function!');
  }

  if (options.onerror) {
    if (isDev) log('warn', '`options.onerror` is deprecated. Use `options.onError` instead.');
    options.onError = options.onerror;
    delete options.onerror;
  }

  if (options.onError && !is.func(options.onError)) {
    throw new Error('`options.onError` passed to the Saga middleware is not a function!');
  }

  if (options.emitter && !is.func(options.emitter)) {
    throw new Error('`options.emitter` passed to the Saga middleware is not a function!');
  }

  function sagaMiddleware(_ref) {
    var getState = _ref.getState,
        dispatch = _ref.dispatch;

    runSagaDynamically = runSaga;
    var sagaEmitter = emitter();
    sagaEmitter.emit = (options.emitter || ident)(sagaEmitter.emit);
    var sagaDispatch = wrapSagaDispatch(dispatch);

    function runSaga(saga, args, sagaId) {
      return proc(saga.apply(undefined, _toConsumableArray(args)), sagaEmitter.subscribe, sagaDispatch, getState, options, sagaId, saga.name);
    }

    return function (next) {
      return function (action) {
        if (sagaMonitor) {
          sagaMonitor.actionDispatched(action);
        }
        var result = next(action); // hit reducers
        sagaEmitter.emit(action);
        return result;
      };
    };
  }

  sagaMiddleware.run = function (saga) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    check(runSagaDynamically, is.notUndef, 'Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware');
    check(saga, is.func, 'sagaMiddleware.run(saga, ...args): saga argument must be a Generator function!');

    var effectId = nextSagaId();
    if (sagaMonitor) {
      sagaMonitor.effectTriggered({ effectId: effectId, root: true, parentEffectId: 0, effect: { root: true, saga: saga, args: args } });
    }
    var task = runSagaDynamically(saga, args, effectId);
    if (sagaMonitor) {
      sagaMonitor.effectResolved(effectId, task);
    }
    return task;
  };

  return sagaMiddleware;
}