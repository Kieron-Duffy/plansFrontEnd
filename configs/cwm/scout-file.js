import path from 'path';
const getURLParam = (name, url = location.href) => {
  const formattedName = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regexS = '[\\?&]' + formattedName + '=([^&#]*)';
  const regex = new RegExp(regexS);
  const results = regex.exec(url);

  return results == null ? null : results[1];
};

const getVersion = (packageName) => {
  const pathToPkgJson = path.resolve('..', '..', 'package.json');
  const packageJson = require(pathToPkgJson);
  return (
    packageJson.devDependencies[packageName] ||
    packageJson.dependencies[packageName] ||
    'version not found'
  );
};
const interstellarVersion = getVersion('@interstellar/react-app');

const version = getURLParam('cwm-se-version', undefined) || process.env.VERSION;
const local = getURLParam('local undefined') || process.env.LOCAL;
const port = getURLParam('port', undefined) || process.env.PORT || 3000;
const contextPath =
  document
    .getElementById(process.env.CONTEXT_PATH_ID)
    .getAttribute(process.env.CONTEXT_PATH_ATTRIBUTE) ||
  process.env.CONTEXT_PATH;
const brandName = process.env.BRAND || 'lloyds';
const protocol = location.protocol;
let src = `${process.env.BUILD_FOLDER}/${process.env.CHANNEL}/${
  process.env.DIVISION
}/${process.env.APP_NAME}/${brandName.charAt(0)}/${
  process.env.FOLDER_PATH
}/content/${process.env.REVISION_NUMBER}/app.js.interstellar.${interstellarVersion}.bundle.js`;

if (local) {
  src = `app.js.interstellar.${interstellarVersion}.bundle.js`;
}
const loadScript = (src, callback) => {
  let loaded = false;
  const script = document.createElement('script');

  script.type = 'text/javascript';
  script.src = src;
  script.onload = script.onreadystatechange = function () {
    if (!loaded && (!this.readState || this.readyState === 'complete')) {
      loaded = true;
      callback && callback();
    }
  };

  document.getElementsByTagName('body')[0].appendChild(script);
};

loadScript(src);
