import { useState } from "react";
import irregular from "./../assets/irregular.json";
import { getVerbs, mixArray } from "../assets";
import { useEffect } from "react";
import { cardsStepsArr, istHatOptions } from "../assets/constants";

const Cards = () => {
    /* States init */
    const [chosenVerbs, setChosenVerbs] = useState(
        getVerbs(
            localStorage.getItem("irregularList")
                ? JSON.parse(localStorage.getItem("irregularList"))
                : irregular,
            4
        )
    );
    const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
    const [currentVerb, setCurrentVerb] = useState(
        chosenVerbs[currentVerbIndex]
    );
    const [answeredForms, setAnsweredOptions] = useState([
        currentVerb.translations.FR,
    ]);
    const [answerOptions, setAnswerOptions] = useState(chosenVerbs);
    const [currentStep, setCurrentStep] = useState(0);
    /* States init */

    /* functions */
    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
        setAnsweredOptions((prevForms) => [
            ...prevForms,
            currentVerb[cardsStepsArr[currentStep]],
        ]);
    };

    const checkAnswer = (answer) => {
        if (answer.id === currentVerb.id) {
            nextStep();
        }
    };
    /* functions */

    /* useEffects */
    useEffect(() => {}, [currentStep]);
    /* useEffects */

    return (
        <div className="">
            <div className="grid auto-rows-auto grid-cols-1 items-center justify-items-center h-[40vh] border-2 border-black">
                <p>
                    {answeredForms.map((item) => (
                        <span className="block text-4xl" key={item}>
                            {item}
                        </span>
                    ))}
                </p>
            </div>
            <div className="grid auto-rows-auto grid-cols-2 h-[40vh]">
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
