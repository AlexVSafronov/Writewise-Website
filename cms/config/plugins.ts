export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        bucketName: env('GCS_BUCKET_NAME', 'writewise-cms-media'),
        publicFiles: true,
        uniform: false,
        serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
        baseUrl: `https://storage.googleapis.com/${env('GCS_BUCKET_NAME', 'writewise-cms-media')}`,
        basePath: '',
      },
    },
  },
});
