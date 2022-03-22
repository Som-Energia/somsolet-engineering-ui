const nextTranslate = require('next-translate')

module.exports = {
  ...nextTranslate(),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
}
