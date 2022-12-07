import { useEffect } from "react";
import { useState } from "react";
import irregular from "./../assets/irregular.json";

const NoVerbs = () => {
    return <div className="p-4">No verbs for your search</div>;
};

const Verbs = () => {
    const [irregularList, setIrregularList] = useState(
        localStorage.getItem("irregularList")
            ? JSON.parse(localStorage.getItem("irregularList"))
            : irregular
    );
    const [searchValue, setSearchValue] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const [isNoVerbs, setIsNoVerbs] = useState(false);

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
        } else if (
            checkedItems.length === 0 ||
            checkedItems.length < irregularList.length
        ) {
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

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearchValue(val);
        setIrregularList((prevVerbs) => {
            return prevVerbs.map((verb) => {
                if (verb.infinitive.indexOf(val) !== -1) {
                    return {
                        ...verb,
                        isOnSearch: true,
                    };
                } else {
                    return {
                        ...verb,
                        isOnSearch: false,
                    };
                }
            });
        });
    };

    useEffect(() => {
        if (searchValue === "") {
            setIsSearch(false);
        } else {
            setIsSearch(true);
        }
    }, [searchValue]);

    useEffect(() => {
        localStorage.setItem("irregularList", JSON.stringify(irregularList));
        setIsNoVerbs(
            irregularList.filter((verb) => verb.isOnSearch).length
                ? true
                : false
        );
    }, [irregularList]);

    return (
        <div className="h-full pb-20">
            <div className="p-4 border-2 border-b-primary flex">
                <label className="border border-slate-500 p-2 rounded-xl px-3 mr-4">
                    <input
                        type="checkbox"
                        onChange={updateAll}
                        className="border-none"
                    />
                </label>
                <input
                    type="text"
                    placeholder="Search for a verb"
                    className="bor border-b border-blue-900 p-2 w-full"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            <div className="overflow-auto h-full text-slate-800">
                {!isSearch ? "" : isNoVerbs ? "" : <NoVerbs />}
                {irregularList.map((verb) => {
                    if (isSearch) {
                        if (verb.isOnSearch) {
                            return (
                                <label
                                    key={verb.id}
                                    className="flex items-center p-4 active:bg-slate-600 active:text-white capitalize"
                                >
                                    <input
                                        type="checkbox"
                                        checked={verb.isChosen}
                                        onChange={() => selectVerb(verb)}
                                        className="mr-2 w-3 h-3"
                                    />
                                    <p>{verb.infinitive}</p>
                                </label>
                            );
                        }
                    } else {
                        return (
                            <label
                                key={verb.id}
                                className="flex items-center p-4 active:bg-slate-600 active:text-white capitalize"
                            >
                                <input
                                    type="checkbox"
                                    checked={verb.isChosen}
                                    onChange={() => selectVerb(verb)}
                                    className="mr-2 w-3 h-3"
                                />
                                <p>{verb.infinitive}</p>
                            </label>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Verbs;
