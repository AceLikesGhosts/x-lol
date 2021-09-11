import mongoose from 'mongoose';
import cfg from '../../../config.json';

export async function loadMongoose(): Promise<boolean>
{
    try
    {
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);

        await mongoose.connect(cfg.mongo.url, { useNewUrlParser: true });

        return new Promise<boolean>((resolve) => resolve(true));
    }
    catch (err) 
    {
        return new Promise<boolean>((resolve) => resolve(err));
    }
}