import { useState } from "react";
import irregular from "./../assets/irregular.json";
import { getVerbs, mixArray, mixCorrect } from "../assets";
import { useEffect } from "react";
import { cardsStepsArr, istHatOptions } from "../assets/constants";

const Cards = () => {
    // Get n number length array of verbs using getVerbs function. It's mixed.
    const [verbsInCards, setVerbsInCards] = useState(
        getVerbs(
            localStorage.getItem("irregularList")
                ? JSON.parse(localStorage.getItem("irregularList"))
                : irregular,
            4
        )
    );
    // Copy the verbsInCards in here, so we can the options for the user
    const [answerOptions, setAnswerOptions] = useState(null);
    // Set current verb index to get one of the verbs
    const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
    // Get a verb by a random index (currentVerbIndex)
    const [currentVerb, setCurrentVerb] = useState(
        verbsInCards[currentVerbIndex]
    );
    // Set current step for a verb
    const [currentStep, setCurrentStep] = useState(0);
    // It's an array of 'questions' (forms of the current verb) that we see on top.
    const [questionArr, setQuestionArr] = useState(null);

    const [isAnswering, setIsAnswering] = useState(true);

    /* Go to the next step for the current verb */
    // Set answer options
    // Set current step
    // Set already answered options
    function nextStep() {
        setIsAnswering(true);
        setCurrentStep((prev) => prev + 1);
        // Set the forms that we already answered
        if (currentStep > 0) {
            setQuestionArr((prevArr) => [
                ...prevArr,
                cardsStepsArr[currentStep] === "perfekt"
                    ? currentVerb[cardsStepsArr[currentStep]][0]
                    : currentVerb[cardsStepsArr[currentStep]],
            ]);
        }

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
                const mixedVerbs = mixCorrect(irregular, currentVerb)

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
    }

    // Check if the answer is correct
    function checkAnswer(answer) {
        if (!isAnswering) {
            return;
        }
        /* This time out is needed to go to the next question about current verb */
        const setNextTimeOut = (answer) => {
            setTimeout(() => {
                // Go to next step
                nextStep();
            }, 1000);
        };

        /* "perfekt" step scenario */
        if (cardsStepsArr[currentStep] === "perfekt") {
            // Set answerOptions, so we can highlight the answers
            setAnswerOptions((prevVerbs) =>
                prevVerbs.map((item) => {
                    if (answer.perfekt === item.perfekt) {
                        return {
                            ...item,
                            isActive: item.isActive
                                ? item.isActive
                                : answer === item,
                            isCorrect:
                                answer.perfekt === currentVerb.perfekt[0],
                        };
                    } else {
                        return item;
                    }
                })
            );

            /* If the answer "perfekt" matches the currentVerb's first "perfekt" then it's the correct answer */
            // So we can set our timer and go to the next step
            if (answer.perfekt === currentVerb.perfekt[0]) {
                setNextTimeOut(answer);
                /* Set isAnswering to false, so people can't randomly highlight verbs even though they're already done with the current step */
                setIsAnswering(false);
            }
            return;
        }

        /* "ist_hat scenario" */
        if (cardsStepsArr[currentStep] === "ist_hat") {
            // Set answerOptions, so we can highlight the answers
            setAnswerOptions((prevVerbs) =>
                prevVerbs.map((item) => {
                    if (answer.ist_hat === item.ist_hat) {
                        return {
                            ...item,
                            isActive: item.isActive
                                ? item.isActive
                                : answer === item,
                            isCorrect: answer.ist_hat === currentVerb.ist_hat,
                        };
                    } else {
                        return item;
                    }
                })
            );

            /* If the answer "ist_hat" matches the currentVerb "ist_hat" then it's the correct answer */
            // So we can set our timer and go to the next step
            if (answer.ist_hat === currentVerb.ist_hat) {
                setNextTimeOut(answer);
                /* Set isAnswering to false, so people can't randomly highlight verbs even though they're already done with the current step */
                setIsAnswering(false);
            }
            return;
        }

        // Set answerOptions, so we can highlight the answers
        setAnswerOptions((prevVerbs) =>
            prevVerbs.map((item) => {
                if (item === answer) {
                    return {
                        ...item,
                        isActive: item.isActive
                            ? item.isActive
                            : answer === item,
                        isCorrect: answer.id === currentVerb.id,
                    };
                } else {
                    return item;
                }
            })
        );

        /* If the answer id matches the currentVerb id then it's the correct answer */
        // So we can set our timer and go to the next step
        if (answer.id === currentVerb.id) {
            setNextTimeOut(answer);
            /* Set isAnswering to false, so people can't randomly highlight verbs even though they're already done with the current step */
            setIsAnswering(false);
        }
    }

    // Detects if it's the end for the verb
    // if so add up to the index
    useEffect(() => {
        if (currentStep === cardsStepsArr.length) {
            setCurrentVerbIndex((prev) => prev + 1);
        }
    }, [currentStep]);

    // On index update set a new verb (the next verb from array)
    // And set the step to zero, so quiz starts from the translation
    useEffect(() => {
        if (currentVerbIndex === verbsInCards.length) {
            console.log("we're done!");
        } else if (currentStep === cardsStepsArr.length) {
            setCurrentVerb(verbsInCards[currentVerbIndex]);
            setCurrentStep(0);
        }
    }, [currentVerbIndex]);

    // Current verb updates only when the quiz (a round) is finished
    // So this useEffect will update the questionArr to show the tranlsation of the words first
    useEffect(() => {
        // Set the very first answer options
        if (!answerOptions || currentStep === 0) {
            setAnswerOptions(
                mixArray(mixCorrect(irregular, currentVerb))
            );
        }

        // Set the very first questions array
        if (!questionArr || currentStep === 0) {
            setQuestionArr([currentVerb.translations.FR]);
        } else if (currentVerb === undefined) {
            console.log("undefined!!!");
        }
    }, [currentVerb]);

    return (
        <div className="">
            <div className="grid auto-rows-auto grid-cols-1 items-center justify-items-center h-[40vh] border-2 border-black">
                <p>
                    {questionArr?.map((item) => (
                        <span className="block text-4xl" key={item}>
                            {item}
                        </span>
                    ))}
                </p>
            </div>
            <div className="grid auto-rows-auto grid-cols-2 h-[40vh]">
                {answerOptions?.map((item) => (
                    <button
                        key={
                            item.id ? item.id : item[cardsStepsArr[currentStep]]
                        }
                        className={`text-2xl ${
                            item.isActive && item.isCorrect
                                ? "bg-green-400"
                                : item.isActive
                                ? "bg-orange-400"
                                : ""
                        }`}
                        onClick={() => checkAnswer(item)}
                    >
                        {item[cardsStepsArr[currentStep]]}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Cards;
