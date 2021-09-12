import { Router } from 'express';
import { stat } from 'fs';
import { join } from 'path';
import makeRandomLetters from '../../helpers/randomLetters';

const uploadPath = join(__dirname, '..', '..', '..', 'frontend', 'uploads');
const ImageRouter: Router = Router();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
ImageRouter.post('/upload', (req, res) => 
{
    try 
    {
        if (!req.headers.auth || req.headers.auth !== 'key')
            return res.status(403).send({ status: 403, message: 'Invalid credentials' });

        if (!req.files) return res.status(403).send({ status: 403, message: 'No file uploaded' });

        const avatar = req.files?.sharex;
        const specialLetters = makeRandomLetters();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        avatar.mv(`${ uploadPath }/` + specialLetters + '-' + avatar.name, (err) =>
        {
            if (err)
                return res.send({
                    status: 403,
                    message: err,
                });

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            console.log(`Created image : ${ specialLetters }-${ avatar.name }`);
            return res.send({
                status: 200,
                message: 'Success',
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                url: specialLetters + '-' + avatar.name,
            });
        });
    }
    catch (err) 
    {
        console.log(err);
        return res.status(500).send(err);
    }
});

ImageRouter.get('/:file', (req, res) => 
{
    stat(`${ uploadPath }/${ req.params.file.toString() }`, (err, stats) => 
    {
        if (err)
            return res.status(404).redirect('/error?s=404&m=Content_not_found');

        else
            return res.render('pages/etc/image', {
                img: 'http://x.lol:3000/i/' + req.params.file,
                size: formatBytes(stats.size),
                imgName: req.params.file.toString()
            });
    });
});

function formatBytes(bytes: number, decimals = 2)
{
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default ImageRouter;
export
{
    ImageRouter
};