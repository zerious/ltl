'use strict'
/* global describe it is */
var ltl = require('../ltl')

describe('Debug', function () {
  it('throws an error if not enabled', function (done) {
    try {
      ltl.compile('p ={omg!}')
    } catch (e) {
      is(e.stack.indexOf('require'), -1)
      is.in(e.message, '[Ltl] Failed to compile template')
      is.in(e.message, 'Unexpected token')
      done()
    }
  })

  it('writes a file and throw a more detailed error if enabled', function (done) {
    try {
      ltl.compile('p ={omg!}', {enableDebug: true})
    } catch (e) {
      is.in(e.message, '[Ltl] Failed to compile template')
      is.in(e.message, 'Unexpected token')
      done()
    }
  })

  it('calls the template by name', function (done) {
    try {
      ltl.compile('p ={omg!}', {name: 'wtf'})
    } catch (e) {
      is.in(e.message, '[Ltl] Failed to compile')
      is.in(e.message, 'Unexpected token')
    }
    try {
      ltl.compile('p ={omg!}', {name: 'wtf', enableDebug: true})
    } catch (e) {
      is.in(e.message, '[Ltl] Failed to compile')
      is.in(e.message, 'Unexpected token')
      done()
    }
  })
})
