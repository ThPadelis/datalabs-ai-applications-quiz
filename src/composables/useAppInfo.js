export function useAppInfo() {
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
  const buildDate = import.meta.env.VITE_BUILD_DATE || new Date().toLocaleDateString('el-GR', {
    month: 'long',
    year: 'numeric'
  })
  
  const webinarEndDate = new Date('2025-12-01')
  const currentDate = new Date()
  const isWebinarActive = currentDate <= webinarEndDate
  
  const getVersionInfo = () => {
    const versionParts = version.split('.')
    return {
      major: versionParts[0] || '1',
      minor: versionParts[1] || '0', 
      patch: versionParts[2] || '0',
      full: version
    }
  }
  
  const getReleaseType = () => {
    const versionInfo = getVersionInfo()
    if (versionInfo.patch === '0' && versionInfo.minor === '0') {
      return 'Major Release'
    } else if (versionInfo.patch === '0') {
      return 'Minor Release'
    } else {
      return 'Patch Release'
    }
  }
  
  const getBuildInfo = () => {
    const buildDateObj = new Date()
    return {
      date: buildDate,
      timestamp: buildDateObj.toISOString(),
      year: buildDateObj.getFullYear(),
      month: buildDateObj.toLocaleDateString('el-GR', { month: 'long' })
    }
  }
  
  return {
    version,
    buildDate,
    framework: 'Vue 3',
    status: isWebinarActive ? 'Ενεργή' : 'Συντήρηση',
    statusCode: isWebinarActive ? 'active' : 'maintenance',
    webinarEndDate: webinarEndDate.toLocaleDateString('el-GR'),
    isWebinarActive,
    versionInfo: getVersionInfo(),
    releaseType: getReleaseType(),
    buildInfo: getBuildInfo(),
    semanticRelease: {
      version,
      buildDate,
      framework: 'Vue 3',
      status: isWebinarActive ? 'active' : 'maintenance',
      lastUpdated: buildDate
    }
  }
}
