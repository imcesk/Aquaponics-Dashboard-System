module.exports = {
  apps: [
    {
      name: 'aquaponics-frontend',
      script: './node_modules/serve/build/main.js',
      args: ['-s', 'dist', '-l', '3000'],
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};