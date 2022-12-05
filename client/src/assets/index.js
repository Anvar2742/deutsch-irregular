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
        // chosenVerbs = verbs.filter((item) => item.isChosen && item.id !== currentVerb.id);
        chosenVerbs = verbs;
    }
    let randomIndex = Math.floor(Math.random() * (num - 0) + 0);
    let indexEnd = randomIndex + num;

    // if quantity smaller than 4, then just return chosenVerbs
    if (chosenVerbs.length < 4) {
        randomIndex = Math.floor(
            Math.random() * (chosenVerbs.length - 1 - 0) + 0
        );
        indexEnd = chosenVerbs.length - 1;
        return chosenVerbs;
    }
    // mix up the array
    const mixedArr = mixArray(chosenVerbs);

    const slicedVerbs = mixedArr.slice(randomIndex, indexEnd);
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

/* Go to the next step for the current verb */
// Set answer options
// Set current step
// Set already answered options
export const nextStep = (
    setIsAnswering,
    setCurrentStep,
    setAnswerOptions,
    setQuestionArr,
    cardsStepsArr,
    currentStep,
    currentVerb,
    irregular,
    istHatOptions,
    verbsInCards
) => {
    setIsAnswering(true);
    setCurrentStep((prev) => prev + 1);

    // if we're approaching to "perfekt" step
    // Set answer options from "perfekt" key
    // else: just regular setAnswerOptions from options from all verbs
    if (cardsStepsArr[currentStep + 1] === "perfekt") {
        setAnswerOptions(() => {
            const correctAnswer = currentVerb.perfekt[0];
            const mixedOptions = mixArray(
                currentVerb.perfekt.slice(1, 4).concat(correctAnswer)
            );
            return mixedOptions.map((item) => {
                return {
                    perfekt: item,
                    isActive: false,
                    isCorrect: false,
                };
            });
        });
    } else if (cardsStepsArr[currentStep + 1] === "ist_hat") {
        setAnswerOptions(() => {
            const mixedOptions = mixArray(istHatOptions);
            return mixedOptions.map((item) => {
                return {
                    ist_hat: item,
                    isActive: false,
                    isCorrect: false,
                };
            });
        });
    } else {
        setAnswerOptions((prevVerbs) => {
            const isPerfektStep = cardsStepsArr[currentStep] === "perfekt";
            const isIstHatStep = cardsStepsArr[currentStep] === "ist_hat";
            const mixedVerbs = mixCorrect(irregular, currentVerb);

            return mixedVerbs.map((item, i) => {
                if (isPerfektStep || isIstHatStep) {
                    return {
                        ...verbsInCards[i],
                        isActive: false,
                        isCorrect: false,
                    };
                } else {
                    return {
                        ...item,
                        isActive: false,
                        isCorrect: false,
                    };
                }
            });
        });
    }

    if (currentStep + 1 === cardsStepsArr.length) {
        return;
    }
    // Set the forms that we already answered
    if (currentStep + 1 > 0) {
        setQuestionArr((prevArr) => [
            ...prevArr,
            cardsStepsArr[currentStep] === "perfekt"
                ? currentVerb[cardsStepsArr[currentStep]][0]
                : currentVerb[cardsStepsArr[currentStep]],
        ]);
    }
};
