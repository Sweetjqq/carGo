function getEnv(defaultEnv) {
  // envVersion值有：正式版 release、体验版 trial、开发版 develop、开发者工具 undefined、低版本微信 undefined
  let envVersion = __wxConfig.envVersion;
  let env = 'production';
  const envList = ['production', 'rc'];

  if (envVersion === 'develop' || wx.getStorageSync('env') === 'qa') {
    env = 'qa';
  } else if (envVersion === 'release' || envVersion === 'trial') {
    env = 'production';
  }

  env = envList[defaultEnv] || env;

  return env;
}

// 如果希望强制使用某个环境，可手动在getEnv内传入数字，0 => production，1 => 测试
const env = getEnv(1);

/*
 * 环境配置
 */
const envConfig = {
  production: {
    baseHost: 'https://www.apiins-marine.com.cn/',
  },
  rc: {
    baseHost: 'http://106.15.90.6:8081/',
  },
};
const {
  baseHost
} = envConfig[env];

export {
  env,
  baseHost
};