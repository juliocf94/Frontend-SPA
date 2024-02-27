import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  plugins: ['expo-localization'],
  extra: {
    wsERPURL: process.env.WS_BASE_URL,
  },
});
