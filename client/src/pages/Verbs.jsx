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

    const updateAll = () => {
        const checkedItems = irregularList.filter((item) => item.isChosen);

        if (checkedItems.length === irregularList.length) {
            setIrregularList(
                irregularList.map((item) => {
                    return {
                        ...item,
                        isChosen: false,
                    };
                })
            );
        } else if (checkedItems.length === 0 || checkedItems.length < irregularList.length) {
            setIrregularList(
                irregularList.map((item) => {
                    return {
                        ...item,
                        isChosen: true,
                    };
                })
            );
        }
    };

    useEffect(() => {
        localStorage.setItem("irregularList", JSON.stringify(irregularList));
    }, [irregularList]);

    return (
        <div className="h-full grid auto-rows-auto grid-cols-1">
            <div className="p-4 border-2 border-b-primary">
                <button onClick={updateAll} className="border border-slate-500 p-2 rounded-xl">Check/Uncheck all</button>
            </div>
            <div className="overflow-auto h-full text-slate-800">
                {irregularList.map((verb) => {
                    return (
                        <label
                            key={verb.id}
                            className="flex items-center p-4 hover:bg-slate-600 active:bg-slate-600 active:text-white hover:text-white capitalize"
                        >
                            {/* {verb.isChosen ? "YES" : "NO"} */}
                            <input
                                type="checkbox"
                                checked={verb.isChosen}
                                onChange={() => selectVerb(verb)}
                                className="mr-2 w-3 h-3"
                            />
                            <p>{verb.infinitive}</p>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default Verbs;
