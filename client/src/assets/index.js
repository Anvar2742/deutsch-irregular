export const getTranslation = async (verb) => {
    try {
        const res = await axios.get("http://localhost:8000/translation", {
            params: {
                verb,
            },
        });

        return res.data;
    } catch (error) {
        return error;
    }
};

export const getVerbForms = async (verb) => {
    const data = await getTranslation(verb);
    return data;
};

export const getAllData = async () => {
    const copyVerbData = {
        ...irregular,
    };
    for (const key in copyVerbData) {
        if (Object.hasOwnProperty.call(copyVerbData, key)) {
            const data = await getVerbForms(key);
            const trans = await data[0].text;

            setVerbData((prevData) => {
                for (const key_2 in irregular) {
                    if (Object.hasOwnProperty.call(irregular, key)) {
                        if (key_2 === key) {
                            let keyConjugation = 404;

                            if (
                                conjugation[key]["PRÄ"] !== null &&
                                conjugation[key]["PRÄ"] !== undefined
                            ) {
                                keyConjugation =
                                    conjugation[key]["PRÄ"]["S"]["3"];
                            }

                            return [
                                ...prevData,
                                {
                                    infinitive: key,
                                    pastTense: irregular[key].pastTense,
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
