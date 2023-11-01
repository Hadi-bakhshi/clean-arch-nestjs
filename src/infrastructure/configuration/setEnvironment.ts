export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return ['.env.development', '.env'];
    case 'production':
      return ['.env.production', '.env'];
    default:
      return '.env';
  }
}
