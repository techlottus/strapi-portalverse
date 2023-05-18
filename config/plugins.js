module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_ACCESS_SECRET'),
        region: env('AWS_REGION'),
        params: {
          Bucket: `${env('AWS_BUCKET')}/${env('AWS_FOLDER')}`,
        },
      },
    },
  },
  "vercel-deploy": {
    enabled: true,
    config: {
      deployHook: env('VERCEL_DEPLOY_HOOK'),
      apiToken: env('VERCEL_DEPLOY_API_TOKEN'),
      appFilter: env('VERCEL_DEPLOY_APP_FILTER'),
      teamFilter: env('VERCEL_DEPLOY_TEAM_FILTER'),
      roles: ["strapi-super-admin", "strapi-editor", "strapi-author"],
    }
  },
});