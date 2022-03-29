import { getDirectories, getFiles } from './utils/path';

import { Express } from 'express';
import { resolve } from 'path';

export default function (app: Express) {
  // Test route
  app.post('/test', (req, res) => {
    res.send(req.body);
  });

  // Get directories
  const path = 'src';
  const directories = getDirectories(path);

  // Auto import
  directories.forEach((directory) => {
    // Get all files
    const directoryPath = resolve(path, directory);
    const files = getFiles(directoryPath).filter(
      (fileName) => fileName === 'routes.ts'
    );

    // Import files
    if (files[0]) {
      const filePath = resolve(directoryPath, files[0]);

      // Extra step to avoid typeError
      const fn: (app: Express) => void = require(filePath).default;

      // Sanitize and call to avoid wrong file
      if (fn) fn(app);
    }
  });
}
