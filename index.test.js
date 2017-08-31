var postcss = require('postcss')
var fs = require('fs')

var plugin = require('./')

function run(fixture, opts) {
  var expected = fs.readFileSync(fixture, 'utf-8')

  return postcss([plugin(opts)]).process('').then(result => {
    expect(result.css).toEqual(expected.trim())
    expect(result.warnings().length).toBe(0)
  })
}

it('generates color utility classes from a scale', () => {
  return run('fixture.css', {
    colors: {
      1: 'blue',
    },
  })
})
