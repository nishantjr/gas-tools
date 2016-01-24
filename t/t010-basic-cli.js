'use strict'
const tlib = require('./tlib')(module)

// Smoke test for the command line program.
tlib.test('help', (t) => {
    const
        expected = require('../package.json').version + '\n',
        cmd = tlib.spawn(t, './bin/gapps -V')
    cmd.succeeds()
    cmd.stdout.match(expected)
    cmd.end()
})

tlib.test('no command fails', (t) => {
    const cmd = tlib.spawn(t, './bin/gapps')
    cmd.fails()
    cmd.end()
})

tlib.test('bad commands fail', (t) => {
    const cmd = tlib.spawn(t, './bin/gapps rubbish')
    cmd.fails()
    cmd.end()
})
