const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeRandomLetters = () => {
    let t = "";

    for (let i = 0; i < 10; i++)
    {
        let stuff = String.fromCharCode(randomInt(65, 90));
        t += stuff;
    }

    return t;
};

export default makeRandomLetters;
export {
    randomInt
};