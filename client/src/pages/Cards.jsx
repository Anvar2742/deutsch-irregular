import { useState } from "react";
import irregular from "./../assets/irregular.json";
import { getVerbs, mixArray, mixCorrect, updateAnswerOptions } from "../assets";
import { useEffect } from "react";
import { cardsStepsArr, istHatOptions } from "../assets/constants";
import { memo } from "react";

const Questions = memo((props) => {
    return (
        <div className="flex items-center justify-center flex-col border-2 border-black rounded-2xl">
            <span className="block text-4xl">
                {props.questionArr ? props.questionArr[0] : ""}
            </span>
            <p>
                {props.questionArr?.map((item, i) => {
                    if (i > 0) {
                        return (
                            <span className="text-base" key={item}>
                                {item}
                                {props.questionArr.length > 1 &&
                                i !== props.questionArr.length - 1
                                    ? " - "
                                    : ""}
                            </span>
                        );
                    }
                })}
            </p>
        </div>
    );
});

const Answers = memo((props) => {
    return (
        <div className="grid auto-rows-auto grid-cols-2 gap-2">
            {props.answerOptions?.map((item) => (
                <button
                    key={
                        item.id
                            ? item.id
                            : item[props.cardsStepsArr[props.currentStep]]
                    }
                    className={`text-2xl flex items-center justify-center rounded-2xl shadow-card ${
                        item.isActive && item.isCorrect
                            ? "bg-green-500 text-white"
                            : item.isActive
                            ? "bg-orange-500 text-white"
                            : ""
                    }`}
                    onClick={() => props.checkAnswer(item)}
                >
                    {item[props.cardsStepsArr[props.currentStep]]}
                </button>
            ))}
        </div>
    );
});

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
    const nextStep = () => {
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

    // Check if the answer is correct
    const checkAnswer = (answer) => {
        if (!isAnswering) {
            return;
        }
        /* This time out is needed to go to the next question about current verb */
        const setNextTimeOut = () => {
            setTimeout(() => {
                // Go to next step
                nextStep();
            }, 1000);
        };

        updateAnswerOptions(
            answer,
            cardsStepsArr[currentStep],
            currentVerb,
            setNextTimeOut,
            setAnswerOptions,
            setIsAnswering
        );
    };

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
        // Initial answer options
        if (!answerOptions || currentStep === 0) {
            setAnswerOptions(mixArray(mixCorrect(irregular, currentVerb)));
        }

        // Initital question
        if (!questionArr || currentStep === 0) {
            setQuestionArr([currentVerb.translations.FR]);
        }
    }, [currentVerb]);

    useEffect(() => {
        // console.log("questionArr");
    }, [questionArr]);

    return (
        <div className="py-4 px-2 grid grid-rows-2 grid-cols-1 gap-3 h-full">
            <Questions questionArr={questionArr} />
            <Answers
                answerOptions={answerOptions}
                cardsStepsArr={cardsStepsArr}
                currentStep={currentStep}
                checkAnswer={checkAnswer}
            />
        </div>
    );
};

export default Cards;
