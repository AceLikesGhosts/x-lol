import { readFile } from "fs";

export function getKey(length: number): Promise<string>
{
    return new Promise<string>((resolve, reject) =>
    {
        readFile("./key.txt", (err, data) =>
        {
            if (err) return generateKeyDym(length)
                .then((str: String | null) => str?.toString())
                .catch(err => reject(new Error(err)));

            return resolve(data.toString());
        });
    });
}


function generateKeyDym(length: number): Promise<string | null>
{
    return new Promise<string | null>((resolve, reject) =>
    {
        try
        {
            //@ts-ignore
            import("tools").then(async exported =>
            {
                console.warn("No key was provided, generating a key for you with the length of " + length + ".");
                console.warn("This is going to throw an unhandled rejection error of 'false', please just restart the application.");

                try
                {
                    // BASED OFF WHERE YOU START THIS APPLICATION/RUN NODE IS WHERE IT WILL SAVE AS A DIRPATH
                    // IF YOU START IT FROM ./web/ ISNTEAD OF ./web/src/ IT WILL SAVE TO ./web/key.txt;
                    const key = await new exported.KeyHelper({ saveKeys: true, saveKeysPath: './key.txt' })
                        .generateKey(length);
                    return resolve(key);
                } catch (err)
                {
                    return reject(new Error(err));
                }
            })
                .catch(err => new Error(err));
        } catch (err)
        {
            return reject(new Error("Failed to import Tools LIB, and cannot find ./key.txt"));
        }

        return reject("Failed to create a key.");
    });
}

export default getKey;