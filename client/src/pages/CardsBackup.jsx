import { useState } from "react";
import verbs from "./../assets/verbs.json";
import irregular from "./../assets/irregular.json";
import { getVerbs, mixArray } from "../assets";
import { useEffect } from "react";
import { cardsSteps, cardsStepsArr } from "../assets/constants";

const Cards = () => {
    const [verbsInCards, setVerbsInCards] = useState(getVerbs(irregular, 4));
    const [answerOptions, setAnswerOptions] = useState([...verbsInCards]);
    const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
    const [currentVerb, setCurrentVerb] = useState(
        verbsInCards[currentVerbIndex]
    );
    const [currentStep, setCurrentStep] = useState(0);
    const [questionArr, setQuestionArr] = useState([
        currentVerb.translations.FR,
    ]);

    // Set answer options
    // Set current step
    // Set already answered options
    function nextStep(step) {
        setAnswerOptions((prevVerbs) =>
            prevVerbs.map((item) => ({
                ...item,
                isActive: false,
                isCorrect: false,
            }))
        );

        setCurrentStep(step);
        setQuestionArr((prevArr) => [
            ...prevArr,
            currentVerb[cardsStepsArr[currentStep]],
        ]);
    }

    // Check if the answer is correct
    function checkAnswer(answer) {
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

        const setNextTimeOut = (answer) => {
            setTimeout(() => {
                // Go to next step
                nextStep(currentStep + 1);
            }, 1000);
        };

        // if (cardsStepsArr[currentStep] === "perfekt") {
        //     console.log("currentVerb.perfekt[0] is " + currentVerb.perfekt[0]);
        //     console.log("answer is " + answer.perfekt);
        //     setNextTimeOut(answer);
        //     return;
        // }

        if (answer.id === currentVerb.id) {
            setNextTimeOut(answer);
        }
    }

    useEffect(() => {
        // console.log(answerOptions);
    }, [answerOptions]);

    // Detects if it's the end for the verb
    // if so add up to the index
    useEffect(() => {
        if (currentStep === cardsSteps.length) {
            console.log("next verb!");
            setCurrentVerbIndex((prev) => prev + 1);
        }

        if (cardsStepsArr[currentStep] === "perfekt") {
            setAnswerOptions(() => {
                const correctAnswer = currentVerb.perfekt[0];
                // console.log(correctAnswer);
                const mixedOptions = mixArray(currentVerb.perfekt)
                    .slice(1, 4)
                    .concat(correctAnswer);
                return mixedOptions.map((item) => {
                    return {
                        perfekt: item,
                        isActive: false,
                        isCorrect: false,
                    };
                });
            });
        } else {
            setAnswerOptions((prevVerbs) => mixArray(prevVerbs));
        }
    }, [currentStep]);

    // On index update set a new verb (the next verb from array)
    // And set the step to zero, so quiz starts from the translation
    useEffect(() => {
        if (currentStep === cardsSteps.length) {
            setCurrentVerb(verbsInCards[currentVerbIndex]);
            setCurrentStep(0);
        }
    }, [currentVerbIndex]);

    // Current verb updates only when the quiz (a round) is finished
    // So this useEffect will update the questionArr to show the tranlsation of the words first
    useEffect(() => {
        setQuestionArr([currentVerb.translations.FR]);
    }, [currentVerb]);

    // console.log(verbsInCards);

    return (
        <div className="">
            <div className="h-[10vh] text-2xl p-4 border-2 border-black">
                Cards
            </div>
            <div className="grid auto-rows-auto grid-cols-1 items-center justify-items-center h-[40vh] border-2 border-black">
                <p>
                    {questionArr.map((item) => (
                        <span className="block text-4xl" key={item}>
                            {item}
                        </span>
                    ))}
                </p>
            </div>
            <div className="grid auto-rows-auto grid-cols-2 h-[50vh]">
                {answerOptions.map((item) => (
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
