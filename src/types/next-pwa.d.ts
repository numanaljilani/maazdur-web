declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  interface PWAConfig {
    dest: string
    register: boolean
    skipWaiting: boolean
    disable?: boolean
    runtimeCaching?: any[]
    buildExcludes?: any[]
    sw?: string
    dynamicStartUrl?: boolean
    fallbacks?: {
      document?: string
      image?: string
      audio?: string
      video?: string
      font?: string
    }
    cacheStartUrl?: boolean
    cacheOnFrontEndNav?: boolean
    reloadOnOnline?: boolean
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig

  export default withPWA
}