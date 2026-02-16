import fs from 'fs';

const loadServiceAccount = (env) => {
  const filePath = '/secrets/gcs-service-account';
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  // Fallback for local dev via env var
  return env.json('GCS_SERVICE_ACCOUNT', null);
};

export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        bucketName: env('GCS_BUCKET_NAME', 'writewise-cms-media'),
        publicFiles: true,
        uniform: false,
        serviceAccount: loadServiceAccount(env),
        baseUrl: `https://storage.googleapis.com/${env('GCS_BUCKET_NAME', 'writewise-cms-media')}`,
        basePath: '',
      },
    },
  },
});
