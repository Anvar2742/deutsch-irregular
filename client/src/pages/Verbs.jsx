import { useEffect } from "react";
import { useState } from "react";
import irregular from "./../assets/irregular.json";

const Verbs = () => {
    const [irregularList, setIrregularList] = useState(
        localStorage.getItem("irregularList")
            ? JSON.parse(localStorage.getItem("irregularList"))
            : irregular
    );

    const selectVerb = (verb) => {
        setIrregularList(
            irregularList.map((item) => {
                if (item.id === verb.id) {
                    return {
                        ...item,
                        isChosen: !item.isChosen,
                    };
                } else {
                    return item;
                }
            })
        );
    };

    useEffect(() => {
        localStorage.setItem("irregularList", JSON.stringify(irregularList));
    }, [irregularList]);

    return (
        <>
            <div className="overflow-auto h-[80vh]">
                {irregularList.map((verb) => {
                    return (
                        <label
                            key={verb.id}
                            className="flex items-center text-white p-4 hover:bg-slate-600 active:bg-slate-600"
                        >
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
