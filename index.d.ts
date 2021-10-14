import { UnpluginInstance } from 'unplugin'

type DynamicResourceUnPlugin = UnpluginInstance<{ fn?: string, include?: (id: string) => boolean }>

export declare const dynamicResourceUnPlugin: DynamicResourceUnPlugin
