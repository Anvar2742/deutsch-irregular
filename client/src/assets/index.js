export const mixArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr;
};
export const getVerbs = (verbs, num, isChosenFilter = true, currentVerb) => {
    let chosenVerbs = isChosenFilter
        ? verbs.filter((item) => item.isChosen)
        : verbs.filter((item) => !item.isChosen);
    if (chosenVerbs.length === 0) {
        chosenVerbs = verbs.filter((item) => item.isChosen && item.id !== currentVerb.id);
    }
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
    return getVerbs(arr, 3, false, currentVerb).concat(currentVerb);
};

export const updateAnswerOptions = (
    answer,
    currentStep,
    currentVerb,
    setNextTimeOut,
    setAnswerOptions,
    setIsAnswering
) => {
    if (currentStep === "infinitive") {
        currentStep = "id";
    }
    setAnswerOptions((prevVerbs) =>
        prevVerbs.map((item) => {
            if (item[currentStep] === answer[currentStep]) {
                let isCorrectAnswer = false;
                if (currentStep === "perfekt") {
                    isCorrectAnswer =
                        item[currentStep] === currentVerb[currentStep][0];
                } else {
                    isCorrectAnswer =
                        item[currentStep] === currentVerb[currentStep];
                }

                return {
                    ...item,
                    isActive: item.isActive
                        ? item.isActive
                        : answer[currentStep] === item[currentStep],
                    isCorrect: isCorrectAnswer,
                };
            } else {
                return item;
            }
        })
    );

    if (currentStep === "perfekt") {
        if (answer[currentStep] === currentVerb[currentStep][0]) {
            setNextTimeOut();
            /* Set isAnswering to false, so people can't randomly highlight verbs even though they're already done with the current step */
            setIsAnswering(false);
        }
    } else if (answer[currentStep] === currentVerb[currentStep]) {
        setNextTimeOut();
        /* Set isAnswering to false, so people can't randomly highlight verbs even though they're already done with the current step */
        setIsAnswering(false);
    }
};
