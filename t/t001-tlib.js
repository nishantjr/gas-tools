'use strict'
const tlib = require('./tlib')(module)

tlib.test('testName', (t) => {
    t.equal(tlib.testName(), 't001')
    t.end()
})

tlib.test('readTestData', (t) => {
    t.equal('A file containing expected output.\n',
        tlib.readTestData(tlib.testData('expected')))
    t.end()
})
