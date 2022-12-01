import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { irregular } from "./assets/irregular";
import * as german from "german-verbs";
import conjugation from "german-verbs-dict/dist/verbs.json";
import axios from "axios";
import { irrTest } from "./assets/irrTest";
import verbs from "./assets/verbs.json";

function App() {
    const [isTranslation, setIsTranslation] = useState(false);
    const [verbData, setVerbData] = useState(localStorage.getItem("data") ? localStorage.getItem("data") : []);

    const getTranslation = async (verb) => {
        try {
            const res = await axios.get("http://localhost:8000/translation", {
                params: { verb },
            });

            return res.data;
        } catch (error) {
            return error;
        }
    };

    const getVerbForms = async (verb) => {
        const data = await getTranslation(verb);
        return data;
    };

    useEffect(() => {
        if (isTranslation) {
            const getAllData = async () => {
                const copyVerbData = { ...irregular};
                for (const key in copyVerbData) {
                    if (Object.hasOwnProperty.call(copyVerbData, key)) {
                        const data = await getVerbForms(key);
                        const trans = await data[0].text;

                        setVerbData((prevData) => {
                            for (const key_2 in irregular) {
                                if (Object.hasOwnProperty.call(irregular, key)) {
                                    if (key_2 === key) {
                                        let keyConjugation = 404;

                                        if (conjugation[key]["PRÄ"] !== null && conjugation[key]["PRÄ"] !== undefined) {
                                            keyConjugation = conjugation[key]["PRÄ"]["S"]["3"];
                                        }

                                        return [
                                            ...prevData,
                                            {
                                                infinitive: key,
                                                pastTense:
                                                    irregular[key].pastTense,
                                                presentPerfect:
                                                    irregular[key].presentPerfect,
                                                translation: trans,
                                                conjugation: keyConjugation,
                                            },
                                        ];
                                    }
                                }
                            }
                        });
                    }
                }

                return copyVerbData;
            };

            getAllData();
        }
    }, [isTranslation]);

    useEffect(() => {
        if (isTranslation) {
            console.log(verbData);
            localStorage.setItem("data", verbData);
        }
    }, [verbData]);

    function translate() {
        setIsTranslation(true);
    }

    return (
        <div className="App">
            <button onClick={translate}>GO!</button>
            <pre>
                {verbData && isTranslation
                    ? JSON.stringify(verbData)
                    : "NOTHING TO SHOW"}
            </pre>
        </div>
    );
}

export default App;
