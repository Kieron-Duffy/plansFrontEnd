import { Brand } from 'components/brandProvider';

const getThemeFromUrl = (): Brand | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme');

  return (Object.values(Brand) as Brand[]).find(
    (brandValue) => brandValue === theme,
  );
};

export default getThemeFromUrl;
