'use strict';
//exports the const DATABASE_URL as a process.environment or the landing page for localhost
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blog-app';
//exports PORT or 8080
exports.PORT = process.env.PORT || 8080;