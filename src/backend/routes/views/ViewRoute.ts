import { Router } from 'express';
import { isAdmin, isBanned, isLoggedIn } from '../../middleware/UserMiddleware';

const ViewRouter: Router = Router();

ViewRouter.get('/', (req, res) => 
{
    if (req.user)
        return res.render('pages/index', {
            user: req.user
        });
    else
        return res.render('pages/index', {
            user: undefined
        });
});

ViewRouter.get('/status', (_req, res) => 
{
    res.render('pages/etc/status', {
        API: true,
        CDN: false,
        Images: true,
        Pages: true,
    });
});

ViewRouter.get('/dashboard', (_req, res) => 
{
    res.render('pages/dashboard/index');
    res.status(200);
});

ViewRouter.get('/admin', isBanned, isLoggedIn, isAdmin, (_req, res) => 
{
    res.render('pages/dashboard/admin');
    res.status(200);
});

ViewRouter.get('/error', (_req, res) => 
{
    return res.status(404).json({ message: '404' });
});

export default ViewRouter;
export {
    ViewRouter
};