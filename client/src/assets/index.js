export const mixArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};
export const getVerbs = (verbs, num) => {
    const randomIndex = Math.floor(Math.random() * verbs.length - 4);
    const slicedVerbs = verbs.slice(randomIndex, randomIndex + num);
    const mixedArr = mixArray(slicedVerbs);
    const result = mixedArr.map((item) => ({
        ...item,
        isActive: false,
        isCorrect: false,
    }));

    return result;
};

export const getWords = async (WORDS_URL) => {
    const words = await fetch(WORDS_URL).then((r) => r.text());
    let wordsArr = words.split("\n").map((item) => item.split(" "));
    wordsArr = wordsArr.map((word) => {
        if (word.length > 3) {
            const firstHalf = word.slice(0, 2);
            const secondHalf = word.slice(3, word.length);
            const translation = word[2] + "~" + secondHalf.join("~");
            return [...firstHalf, translation];
        } else {
            return word;
        }
    });
    setWordsSeparated(wordsArr);
};
