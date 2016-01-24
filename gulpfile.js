'use strict'

const
    gulp = require('gulp'),
    exclude_gitignore = require('gulp-exclude-gitignore'),
    tape = require('gulp-tape'),
    faucet = require('faucet')

gulp.task('test', ['unit-test', 'functional-test'])

gulp.task('unit-test', () => {
    return gulp
        .src('**/*.jt')
        .pipe(exclude_gitignore())
        .pipe(tape({ reporter: faucet() }))
})

gulp.task('functional-test', ['unit-test'], () => {
    return gulp
        .src('t/t[0-9]*.js')
        .pipe(tape({ reporter: faucet() }))
})
