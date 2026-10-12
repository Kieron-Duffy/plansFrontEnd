const {
  feature_flag_url,
  feature_flag_switch,
  feature_flag_group_name,
  feature_flag_client_id,
  feature_flag_channel,
  feature_flag_lbg_env,
  feature_flag_env_name,
  feature_flag_correlation_id,
  feature_flag_environment,
} = window.appConfig;

export const featureflag_config = {
  url: `${feature_flag_url}`, // url for the bld environmnet
  switches: [`${feature_flag_switch}`],
  flagGroupName: `${feature_flag_group_name}`,
  customHeaders: {
    'x-lbg-client-id': `${feature_flag_client_id}`,
    'x-lbg-channel': `${feature_flag_channel}`,
    'x-lbg-env': `${feature_flag_lbg_env}`,
    'env-name': `${feature_flag_env_name}`,
    'Content-Type': 'application/json',
    'x-lbg-txn-correlation-id': `${feature_flag_correlation_id}`,
  },
  environment: feature_flag_environment,
  // Available only via unleash portal
  //  context : {
  //    customContextFields : {
  //      appBrand : 'BOS'
  //    }
  //  }
};
