import { InterstellarConfig } from '@interstellar/react-app';

const interstellarConfig: InterstellarConfig = {
  // Preset can be switched between below mentioned list or be overridden or extended with your own plugin.
  // 1. fmo preset = @interstellar/react-app/fmo-preset-config
  // 2. gcp preset = @interstellar/react-app/gcp-preset-config
  // 3. mfe gcp preset = @interstellar/react-app/mfe-gcp-preset-config
  // 4. mfe fmo preset = @interstellar/react-app/mfe-fmo-preset-config
  preset: [
    '@interstellar/react-app/default-preset-config',
    '@interstellar/react-app/gcp-preset-config',
  ],
  postBuildOptions: {
    dynamicBranding: false,
  },
};

export default interstellarConfig;
