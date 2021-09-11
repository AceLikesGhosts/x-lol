/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import getKey from './GetKey';
import morgan from 'morgan';
import User from '../models/User';
import session from 'express-session';
import passport, { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import APIRouter from '../routes/v1/APIV1Route';
import { join } from 'path';
import ViewRouter from '../routes/views/ViewRoute';
import { loadMongoose } from './HandleDB';
import subdomain from '../helpers/handleSubdomains';
import { ImageRouter } from '../routes';
import fileUpload from 'express-fileupload';
import https from 'https';

/**
 * @argument { boolean } dev
 * @argument { string } secret
 * @argument { number } port
 * @argument { Application } app
 * @argument { Express } express
 */
interface WebServiceOptions
{
    app: Application,
    express: any,
    port: number,
    secret: string | number,
    config: any,
    dev?: boolean,
}

/**
 * @description obv.
 * @public
 */
class WebService
{
    public _port: number;
    public _config;
    private _app: Application;
    private _express: any;
    private _dev: boolean;
    private _passport: PassportStatic;
    //WE SHOULD CLEAR THIS AFTER APPLYING. ASAP.
    private _secret: string | number;

    constructor(opts: WebServiceOptions)
    {
        if (!opts) throw new Error('No options provided.');

        this._app = opts.app;
        this._config = opts.config;
        this._express = opts.express;
        this._port = opts.port;
        this._secret = opts.secret;
        this._passport = passport;

        if (typeof opts.dev === 'boolean')
            this._dev = opts.dev || false;
    }

    /**
     * @description Only public function within the WebService class, initalizes the WebService class.
     * @example
     * ```ts
     * new WebService()
     * .init()
     * .then(port => console.log('Started WebService on port: ' + port));
     * ```
     * @returns The provided port (this._port)
     */
    public init(): Promise<number>
    {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<number>(async (resolve) =>
        {
            if (typeof this._secret === 'number')
                this._secret = await getKey(this._secret);

            await loadMongoose();
            await this.setSettings();
            await this.registerRoutes();

            if (this._dev)
                morgan('dev');

            if (this._config.ssl.useSSL)
            {
                const credentials = {
                    key: this._config.ssl.privateKeyPath,
                    cert: this._config.ssl.certificatePath,
                };

                const httpsServer = https.createServer(credentials, this._app);

                httpsServer.listen(this._port);
            }
 else 
{
                this._app.listen(this._port);
            }
            resolve(this._port);
        });
    }

    private setSettings(): Promise<number>
    {
        return new Promise<number>((resolve) =>
        {
            this._app.set('view engine', 'ejs');
            this._app.set('views', join(__dirname, '../../frontend/views'));

            const staticDirPath: string = join(__dirname, '..', '..', 'frontend', 'static');
            const uploadDirPath: string = join(__dirname, '..', '..', 'frontend', 'uploads');
            this._app.use('/static', this._express.static(staticDirPath));
            this._app.use('/i', this._express.static(uploadDirPath));

            this._app.get('/robots.txt', (_req, res) => res.sendFile(staticDirPath + '/robots.txt'));

            this._app.use(cors());
            this._app.use(urlencoded({ extended: true }));
            this._app.use(json());
            this._app.use(cookieParser());

            this._app.use(session({
                secret: '' + this._secret as string, // THIS IS GOING TO BE A STRING, PERIOD. EVEN IF A NUMBER IS PASSED.
                resave: false,
                saveUninitialized: false,
                cookie: {
                    maxAge: 1000 * 60 * 60 * 24 // 1 day
                }
            }));

            this._app.use(
                fileUpload({
                    safeFileNames: true,
                    preserveExtension: true,
                    limits: {
                        fileSize: 2 * 1024 * 1024 * 1024
                    }
                })
            )

            // Setting it to nothing, essentially clearing it.
            this._secret = '';

            this._app.use(this._passport.initialize());
            this._app.use(this._passport.session());

            // @ts-ignore
            this._passport.use(new LocalStrategy(User.authenticate()));
            // @ts-ignore
            this._passport.serializeUser(User.serializeUser());
            // @ts-ignore
            this._passport.deserializeUser(User.deserializeUser());

            resolve(1);
        });
    }

    private registerRoutes(): Promise<boolean> 
    {
        return new Promise<boolean>((resolve) =>
        {
            this._app.use('/', ViewRouter);
            this._app.use(subdomain('api', APIRouter));
            this._app.use(subdomain('images', ImageRouter));

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            this._app.use((req, res, _next) =>
            {
                res.status(404);

                if (req.accepts('html')) return res.redirect('/error?s=404&m=No_content_found');

                if (req.accepts('json')) return res.json({ error: 'Content not found.' });
            });

            resolve(true);
        });
    }

    get passportSession(): Promise<PassportStatic>
    {
        return new Promise<PassportStatic>((resolve) => resolve(this._passport));
    }

    get uploadDirPath(): Promise<string>
    {
        return new Promise<string>((resolve) => resolve(join(__dirname, '..', '..', 'frontend', 'uploads')));
    }
}

export
{
    WebServiceOptions
};

export default WebService;