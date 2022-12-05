export const mixArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};
export const getVerbs = (verbs, num, isChosenFilter = true) => {
    const chosenVerbs = isChosenFilter
        ? verbs.filter((item) => item.isChosen)
        : verbs;
    const mixedArr = mixArray(chosenVerbs);
    const randomIndex = Math.floor(Math.random() * (num - 0) + 0);

    const slicedVerbs = mixedArr.slice(randomIndex, randomIndex + num);
    const result = slicedVerbs.map((item) => ({
        ...item,
        isActive: false,
        isCorrect: false,
    }));

    return result;
};

export const mixCorrect = (arr, currentVerb) => {
    return getVerbs(arr, 3, false).concat(currentVerb);
};
