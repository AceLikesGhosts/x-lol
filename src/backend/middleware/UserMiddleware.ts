import { NextFunction, Response } from "express";
import { Request } from "express";

const isLoggedIn = (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        if (req.isAuthenticated()) return next();
        else return res.redirect("/login");
    } catch (err)
    {
        return res.redirect("/login");
    }

    next();
};

const isAdmin = (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        //@ts-ignore
        if (req.isAuthenticated() && req.user.admin) return res.redirect("/admin");
        res.redirect("/login");
    } catch (err)
    {
        res.redirect("/login");
    }

    next();
};

const isBanned = (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        //@ts-ignore
        if (req.isAuthenticated() && req.user.banned.isBanned)
            return res.redirect(`/banned`);
    } catch (err)
    {
        res.redirect("/login");
    }

    next();
};

export {
    isLoggedIn,
    isAdmin,
    isBanned
}