import 'jest';
import 'jest-extended';

import WebService from './classes/WebService';
import express, { Application } from 'express';
import config from '../config.json';
import fetch from 'node-fetch';

const app: Application = express();
const ws: WebService = new WebService({ 
    app, express, config,
    port: 3000, secret: 'secret',
    dev: true
});

beforeEach(() => 
{
    ws.init();
});

afterEach(() => 
{
    ws.close();
});

describe('webservice tests', () => 
{
    describe('getters', () =>
    {
        it('returns 3000 for port', () =>
        {
            expect(ws._port).toEqual(3000);
        });

        it('returns a valid passport session', async () =>
        {
            expect(ws.passportSession).toBeDefined();
            expect(ws.passportSession).toResolve();
        });
    });

    describe('routes', () => 
{
        it('has a valid response to / route', () => 
{
            fetch('localhost:3000/')
            .then(res => res.json())
            .then(res => expect(res).toBeDefined())
            .then(res => expect(res).toBeObject());
        });
    });
});