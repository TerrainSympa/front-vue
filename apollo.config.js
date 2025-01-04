module.exports = {
    client: {
      service: {
        name: 'terrainsympa-app',
        localSchemaFile: './schema.graphql',
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }