export default () => ({
  database: {
    url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/photogram',
  },
  upload: {
    destination: './public/photo',
    maxFileSize: 5 * 1024 * 1024,
  },
});
