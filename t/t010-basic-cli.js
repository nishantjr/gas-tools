'use strict'
const tlib = require('./tlib')(module)

/*
 * There's a bug in tape-spawn 1.4.0 that we trigger with a race condition:
 *   https://github.com/maxogden/tape-spawn/pull/12
 * The check for this bug that prevents cmd.fails() being called below when
 * we are using a tape-spawn known to have this bug can be removed when a
 * new version with the bugfix is released. Remember to update the required
 * version of tape-spawn in package.json when you remove this code.
 */
const
    semver = require('semver'),
    tape_spawn_ver = require('tape-spawn/package.json').version,
    tape_spawn_fixed = semver.gt(tape_spawn_ver, '1.4.0')

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
    cmd.stdout.match('No command specified\n')
    if (tape_spawn_fixed)
        cmd.fails()
    cmd.end()
})

tlib.test('bad commands fail', (t) => {
    const cmd = tlib.spawn(t, './bin/gapps rubbish')
    cmd.stdout.match('Bad command specified\n')
    if (tape_spawn_fixed)
        cmd.fails()
    cmd.end()
})
