export default ({ config }) => ({
  ...config,
  extra: {
    API_BASE_URL: process.env.API_BASE_URL,
    BASE_URL: process.env.BASE_URL,
  },
});
