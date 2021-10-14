const { createUnplugin } = require('unplugin')


/**
 * @type {import('unplugin').UnpluginInstance<{ fn?: string, include?: (id: string) => boolean, esModule?: boolean }>}
 */
const dynamicResourceUnPlugin = createUnplugin((options, meta) => {
  if (!['vite', 'webpack'].includes(meta.framework)) {
    throw new Error('No support framework.')
  }

  const fn = options?.fn ?? '__dynamicResource'
  const regex = new RegExp(`${fn}( ?)\\((.*)\\)`, 'g')

  const replacer = (() => {
    if (meta.framework === 'webpack') return (space, stat) => `require${space}(${stat})${options?.esModule ? '.default' : ''}`
    if (meta.framework === 'vite') return (space, stat) => `new URL${space}(${stat}, import.meta${''}.url).href`
  })()

  return {
    name: 'dynmaic-resource-unplugin',
    transformInclude (id) {
      return options?.include?.(id) ?? id.endsWith('.js')
    },
    transform (code) {
      return code.replace(regex, (_, space, stat) => replacer(space, stat))
    }
  }
})

module.exports = {
  dynamicResourceUnPlugin
}
