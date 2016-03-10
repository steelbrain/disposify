'use strict'

/* @flow */

function dispose() {
  if (typeof this.destroy === 'function') {
    this.destroy()
  } else if (typeof this.stop === 'function') {
    this.stop()
  } else if (typeof this.kill === 'function') {
    this.kill()
  } else if (typeof this.end === 'function') {
    this.end()
  } else {
    throw new Error('Unable to dispose object')
  }
}

function disposify<T>(subject: T): T {
  // $FlowIgnore: Flow is stupid
  if (typeof subject === 'object' && typeof subject.dispose !== 'function') {
    // $FlowIgnore: Flow is stupid
    Object.defineProperty(subject, 'dispose', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: dispose
    })
  }
  return subject
}

module.exports = disposify
