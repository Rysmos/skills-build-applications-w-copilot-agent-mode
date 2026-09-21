import { app } from './index.js';

const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port} at ${apiBaseUrl}`);
  });
}