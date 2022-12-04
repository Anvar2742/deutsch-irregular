import "./App.css";
import Cards from "./pages/Cards";
import irregular from "./assets/irregular.json";
import { useState } from "react";
import { useEffect } from "react";
import verbs from "./assets/verbs.json";

function App() {
    const [wordsSeparated, setWordsSeparated] = useState(null);

    // useEffect(() => {
    //     setWordsSeparated(
    //         irregular.map((item) => {
    //             let conjug = 404;
    //             verbs.forEach((el) => {
    //                 if (item.infinitive === el.infinitive) {
    //                     conjug = el.conjugation;
    //                 }
    //             });

    //             return {
    //                 ...item,
    //                 conjugation: conjug,
    //             };

    //             // return {
    //             //     ...item,
    //             //     infinitive:
    //             //         item.infinitive.indexOf("(") === -1
    //             //             ? item.infinitive
    //             //             : item.infinitive.slice(
    //             //                   0,
    //             //                   item.infinitive.indexOf("(")
    //             //               ),
    //             // };
    //         })
    //     );
    // }, []);

    // useEffect(() => {
    //     if (wordsSeparated) {
    //         console.log(wordsSeparated);
    //     }
    // }, [wordsSeparated]);

    return (
        <div className="bg-gray-50 h-[100vh]">
            <div className="max-w-md mx-auto bg-gray-300">
                <Cards />
            </div>
        </div>
    );
}

export default App;
