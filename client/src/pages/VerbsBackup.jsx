import { useEffect } from "react";
import { useState } from "react";
import irregular from "./../assets/irregular.json";

const Verbs = () => {
    const [irregularList, setIrregularList] = useState(
        irregular.map((item) => ({
            ...item,
            isChosen: localStorage.getItem("chosenVerbs"),
        }))
    );
    const [chosenVerbs, setChosenVerbs] = useState([]);

    const selectVerb = (verb) => {
        setIrregularList(
            irregularList.map((item) => {
                return {
                    ...item,
                    isChosen: item.isChosen ? item.isChosen : verb.id === item.id,
                };
            })
        );
    };

    useEffect(() => {
        setChosenVerbs(irregularList.filter((item) => item.isChosen));
    }, [irregularList]);

    useEffect(() => {
        localStorage.setItem("chosenVerbs", chosenVerbs);
    }, [chosenVerbs]);

    useEffect(() => {
        setChosenVerbs(irregularList.filter((item) => item.isChosen));
    }, [irregularList]);

    return (
        <>
            <div className="h-[10vh] text-2xl p-4 border-2 border-black">
                Cards
            </div>
            <div className="overflow-auto h-[90vh]">
                {irregularList.map((verb) => {
                    return (
                        <label key={verb.id}>
                            <input
                                type="checkbox"
                                checked={verb.isChosen}
                                onChange={() => selectVerb(verb)}
                            />
                            <p>{verb.infinitive}</p>
                        </label>
                    );
                })}
            </div>
        </>
    );
};

export default Verbs;
