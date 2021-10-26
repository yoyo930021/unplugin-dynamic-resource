# unplugin-dynamic-resource

A unplugin for support dynamic require resource(png/jpg/svg). Used in shared library when cross bundler in monorepo.

## Support bundler
- vite
- webpack

## Install
```bash
npm install --dev unplugin-dynamic-resource
yarn add -D unplugin-dynamic-resource
```

### vite
```javascript
// vite.config.js
import { dynamicResourceUnPlugin } from 'unplugin-dynamic-resource'

export default {
  plugins: [
    dynamicResourceUnPlugin.vite({ /* options */ })
  ]
}
```

### webpack
```javascript
// webpack.config.js
import { dynamicResourceUnPlugin } from 'unplugin-dynamic-resource'

module.exports = {
  plugins: [
    dynamicResourceUnPlugin.webpack({ /* options */ })
  ]
}
```

## Usage
```javascript
// Usage
export const getIconImage = (iconName) => __dynamicResource(`../assets/icon/${iconName}.png`, '__resource__')

// Will convert to....
// webpack
export const getIconImage = (iconName) => require(`../assets/icon/${iconName}.png`)
// vite
export const getIconImage = (iconName) => new URL(`../assets/icon/${iconName}.png`, import.meta.url).href
```

## Options

### fn
- type: `string`
- default: `__dynamicResource`
- Convert function name
### include
- type: `(id: string) => boolean`
- default: (id) => id.endsWith('.js')
- include transform file
### esModule
- type: `boolean`
- default: `false`
- Same as `url-loader` esModule option, when `true`, will `require().default`



