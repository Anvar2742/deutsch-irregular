import { useState } from "react";
import irregular from "./../assets/irregular.json";
import {
    getVerbs,
    mixArray,
    mixCorrect,
    nextStep,
    updateAnswerOptions,
} from "../assets";
import { useEffect } from "react";
import { cardsStepsArr, istHatOptions } from "../assets/constants";
import { memo } from "react";
import Error from "../components/Error";
import macron from "./../assets/gifs/macron-2.gif";
import { Link } from "react-router-dom";

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

const Done = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-9">All done!</h1>
            <p className="text-2xl font-semibold text-center mt-5">
                Great work, keep it up!
            </p>
            <div className="mx-9 mt-5 overflow-hidden">
                <img src={macron} alt="" className="rounded-2xl mx-auto" />
            </div>
        </div>
    );
};

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
    const [isEnd, setIsEnd] = useState(false);

    /* cards mode */
    const [cardsMode, setCardsMode] = useState(
        localStorage.getItem("practiseModes")
            ? JSON.parse(localStorage.getItem("practiseModes"))[0].mode
            : practiseItemsArr
    );

    const [isRestart, setIsRestart] = useState(false);

    // Check if the answer is correct
    const checkAnswer = (answer) => {
        if (!isAnswering) {
            return;
        }
        /* This time out is needed to go to the next question about current verb */
        const setNextTimeOut = () => {
            setTimeout(() => {
                // Go to next step
                nextStep(
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
                );
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

    /* Handle cardsMode */
    useEffect(() => {
        if (cardsMode && cardsMode > verbsInCards.length) {
            setCardsMode(verbsInCards.length);
        }
    }, [verbsInCards]);

    useEffect(() => {
        // Detects if it's the end for the verb
        if (currentStep === cardsStepsArr.length) {
            // if infinity mode set restart to true
            // if not, then just default behaviour
            if (cardsMode === -1) {
                if (currentVerbIndex + 1 === verbsInCards.length) {
                    setIsRestart(true);
                } else {
                    setIsRestart(false);
                    setCurrentVerbIndex((prev) => prev + 1);
                }
            } else {
                setCurrentVerbIndex((prev) => prev + 1);
            }
        }
    }, [currentStep]);

    useEffect(() => {
        if (isRestart) {
            // setVerbsInCards(mixArray(verbsInCards));
            setCurrentVerbIndex(0);
            // setCurrentStep(0);
        }
    }, [isRestart]);

    // On index update
    useEffect(() => {
        // end the quiz if current index is equal to the mode
        if (currentVerbIndex === cardsMode) {
            console.log("we're done!");
            setIsEnd(true);
        } else if (currentStep === cardsStepsArr.length) {
            // set a new verb (the next verb from array)
            setCurrentVerb(verbsInCards[currentVerbIndex]);
            // set the step to zero, so quiz starts from the translation
            setCurrentStep(0);
        }
    }, [currentVerbIndex]);

    // Current verb updates only when the quiz (a round) is finished
    // So this useEffect will update the questionArr to show the tranlsation of the words first
    useEffect(() => {
        // Initial answer options
        if ((!answerOptions || currentStep === 0) && currentVerb) {
            setAnswerOptions(mixArray(mixCorrect(irregular, currentVerb)));
        }

        // Initital question
        if ((!questionArr || currentStep === 0) && currentVerb) {
            setQuestionArr([currentVerb.translations.FR]);
        }
    }, [currentVerb]);

    if (!currentVerb) return <Error />;
    if (isEnd) return <Done />;
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
