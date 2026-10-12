const getAppBase = () => {
  const { appConfig } = window as any;
  if (process.env.NODE_ENV === 'development') {
    return appConfig.BASE_PATH;
  }

  const internalHostNames = (
    process.env.INTERNAL_HOSTNAMES || 'oncp.cloud,lbgcp.cloud'
  )
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean);

  const isInternalHosting = internalHostNames.some((hostname) =>
    window.location.hostname.includes(hostname),
  );

  const isReverseProxy = isInternalHosting
    ? false
    : String(appConfig.IS_REVERSE_PROXY).toLowerCase() === 'true';

  const extBasePath = appConfig.EXTERNAL_BASEPATH
    ? `${appConfig.EXTERNAL_BASEPATH.replace(/\/\s*$/, '')}/`
    : window.location.pathname;
  const basename = isReverseProxy ? extBasePath : appConfig.BASE_PATH;
  return basename;
};

export default getAppBase;
