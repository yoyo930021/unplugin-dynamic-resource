const { createUnplugin } = require('unplugin')


/**
 * @type {import('unplugin').UnpluginInstance<{ fn?: string, include?: (id: string) => boolean, esModule?: boolean }>}
 */
const dynamicResourceUnplugin = createUnplugin((options, meta) => {
  if (!['vite', 'webpack'].includes(meta.framework)) {
    throw new Error('No support framework.')
  }

  const fn = options?.fn ?? '__dynamicResource'
  const regex = new RegExp(`${fn}\\s*\(\\s*(.*)\\s*,\\s*['"\`]__resource__['"\`]\\s*\)`, 'g')
  const replacer = (() => {
    if (meta.framework === 'webpack') return (stat) => `require(${stat})${options?.esModule ? '.default' : ''}`
    if (meta.framework === 'vite') return (stat) => `new URL(${stat}, import.meta${''}.url).href`
  })()

  return {
    name: 'dynamic-resource-unplugin',
    enforce: 'pre',
    transformInclude (id) {
      return options?.include?.(id) ?? id.endsWith('.js')
    },
    transform (code) {
      return code.replace(regex, (_, stat) => replacer(stat))
    }
  }
})

module.exports = {
  dynamicResourceUnplugin
}
