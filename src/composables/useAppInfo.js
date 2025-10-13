import packageJson from '../../package.json'

export function useAppInfo() {
  const version = packageJson.version
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toLocaleDateString('el-GR', {
    month: 'long',
    year: 'numeric'
  })
  
  return {
    version,
    buildDate,
    framework: 'Vue 3',
    status: 'Ενεργή'
  }
}
