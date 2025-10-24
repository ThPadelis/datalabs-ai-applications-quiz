export function useAppInfo() {
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
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
