/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
const subdomain = (subdomain: string, fn: Function): any =>
{
    if (!subdomain || typeof subdomain !== 'string')
        throw new Error('The first parameter must be a string representing the subdomain');


    if (!fn || typeof fn !== 'function' || fn.length < 3)
        throw new Error('The second parameter must be a function that handles fn(req, res, next) params.');

    return function (req: Request, res: Response, next: NextFunction) 
    {
        //@ts-ignore
        req._subdomainLevel = req._subdomainLevel || 0;

        const subdomainSplit = subdomain.split('.');
        const len = subdomainSplit.length;
        let match = true;

        //url - v2.api.example.dom
        //subdomains == ['api', 'v2']
        //subdomainSplit = ['v2', 'api']
        for (let i = 0; i < len; i++) 
        {
            const expected = subdomainSplit[len - (i + 1)];
            //@ts-ignore
            const actual = req.subdomains[i + req._subdomainLevel];

            if (expected === '*') { continue; }

            if (actual !== expected) 
            {
                match = false;
                break;
            }
        }

        if (match) 
        {
            //@ts-ignore
            req._subdomainLevel++;
            return fn(req, res, next);
        }

        next();
    };
};

export default subdomain;