import { Router } from 'express';
import User from '../../models/User';
import { ps } from '../../index';

const APIRouter: Router = Router();
const regex = '[^A-Za-z0-9]';

APIRouter.get('/', (_req, res) =>
{
    res.status(200).json({ ok: true, message: 'Request recieved', status: 200 });
});

APIRouter.post('/register', async (req, res) => 
{
    if (!req.body.username.toString() || !req.body.password.toString() || !req.body.invcode.toString())
        return res.status(400).json({ ok: false, message: 'Missing params.', status: 400 });

    if (regex.match(req.body.username.toString() || regex.match(req.body.password.toString()) || regex.match(req.body.invcode.toString())))
        return res.status(400).json({ ok: false, message: 'Missing params.', status: 400 });

    if (req.body.invcode.toString() === '0')
    {
        const nUser = new User({
            username: req.body.username,
            invCode: req.body.invcode,
            banned: {
                isBanned: false
            },
            admin: false,
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return await User.register(nUser, req.body.password, (err, _user) => 
        {
            if (err)
                return res.status(400).json({ ok: false, message: err });

            ps.then(passport => 
            {
                passport.authenticate('local')(req, res, () => 
                {
                    return res.redirect('/dashboard');
                });
            });
        });
    }
    else
        return res.status(400).json({ ok: false, message: 'Invalid or expired invite code.', status: 400 });
});

APIRouter.post('/login', async (req, res) =>
{
    // Neat, circular import. I hate this shit. - Ace <3
    ps.then(passport =>
    {
        passport.authenticate('local', (err, user, info) =>
        {
            if (err) return res.status(400).json({ ok: false, message: 'Failed to login.', status: 400 })
            if (!user) return res.status(400).json({ ok: false, message: info, status: 400 });
            if (user.banned.isBanned) return res.status(405).json({ ok: false, message: 'Account suspended.', status: 400 })

            return req.logIn(user, (err) =>
            {
                if (err) return res.status(400).json({ ok: false, message: 'Failed to login.' });
                if (user.admin) return res.redirect('/admin');
                return res.redirect('/dashboard');
            });

        })(req, res);
    })
});

export default APIRouter;
export
{
    APIRouter
};