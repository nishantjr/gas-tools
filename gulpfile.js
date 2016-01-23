'use strict'

const gulp = require('gulp')

gulp.task('test', ['unit-test'])

gulp.task('unit-test', () => {
    const
        tape = require('gulp-tape'),
        faucet = require('faucet')
    return gulp
        .src('**/*.jt')
        .pipe(tape({ reporter: faucet() }))
})
