'use strict'

const gulp = require('gulp')
const exclude_gitignore = require('gulp-exclude-gitignore')

gulp.task('test', ['unit-test'])

gulp.task('unit-test', () => {
    const
        tape = require('gulp-tape'),
        faucet = require('faucet')
    return gulp
        .src('**/*.jt')
        .pipe(exclude_gitignore())
        .pipe(tape({ reporter: faucet() }))
})
