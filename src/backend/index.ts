import Express, { Application } from 'express';
import WebService from './helpers/WebService';
import config from '../../config.json';

const app: Application = Express();
const ws: WebService = new WebService({ app: app, config: config, express: Express, port: 3000, secret: 20, dev: true });

ws.init()
.then(port => console.log(`Started API on port ${port}`));

const ps = ws.passportSession;
const up = ws.uploadDirPath;

export default app;
export {
    ws,
    ps,
    up
};