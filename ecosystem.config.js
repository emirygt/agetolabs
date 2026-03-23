module.exports = {
  apps: [
    {
      name: 'agetolabs',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/home/agetolabs',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
