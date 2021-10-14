import { UnpluginInstance } from 'unplugin'

type DynamicResourceUnplugin = UnpluginInstance<{ fn?: string, include?: (id: string) => boolean }>

export declare const dynamicResourceUnplugin: DynamicResourceUnplugin
