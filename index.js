var postcss = require('postcss')
var _ = require('lodash')

var prefixes = {
  bg: 'background-color',
  tc: 'color',
  bc: 'border-color',
}

module.exports = postcss.plugin('postcss-beard-colors', function(opts) {
  opts = opts || {}

  var colors = opts.colors

  return function(root, result) {
    var rules = _.flatMap(prefixes, function(declProp, prefixKey) {
      return _.flatMap(colors, function(colorValue, colorKey) {
        return postcss
          .rule({
            selector: `.${prefixKey}${colorKey}`,
          })
          .append(
            postcss.decl({
              prop: declProp,
              value: colorValue,
            })
          )
      })
    })

    root.append(rules)
  }
})
