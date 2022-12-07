import { useState } from "react";

const Settings = () => {
    const [chosenCount, setChosenCount] = useState(localStorage.getItem("irregularList")
    ? JSON.parse(localStorage.getItem("irregularList")).filter(item => item.isChosen).length
    : irregular.length);
    return (
        <div className="py-4">
            <div className="border-b-2 px-4">
                <h2 className="text-primary">Verbs in exercises</h2>
                <div className="px-10 mt-3">
                    <div className="flex items-center justify-between border-b-2 px-4 py-2 last:border-none">
                        <span>Chosen verbs</span>
                        <span>{chosenCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
