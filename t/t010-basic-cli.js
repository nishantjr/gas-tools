'use strict'
const tlib = require('./tlib')(module)

// Smoke test for the command line program.
tlib.test('help', (t) => {
    const
        expected = require('../package.json').version + '\n',
        cmd = tlib.spawn(t, './bin/gas -V')
    cmd.succeeds()
    cmd.stdout.match(expected)
    cmd.end()
})

tlib.test('no command fails', (t) => {
    const cmd = tlib.spawn(t, './bin/gas')
    cmd.stderr.match('No command specified\n')
    cmd.stdout.match(/Usage:/)
    if (tlib.tape_spawn_fixed)
        cmd.fails()
    cmd.end()
})

tlib.test('bad commands fail', (t) => {
    const cmd = tlib.spawn(t, './bin/gas rubbish')
    cmd.stderr.match('Bad command specified\n')
    cmd.stdout.match(/Usage:/)
    if (tlib.tape_spawn_fixed)
        cmd.fails()
    cmd.end()
})
