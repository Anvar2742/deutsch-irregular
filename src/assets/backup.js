export const getWords = async (WORDS_URL) => {
    const words = await fetch(WORDS_URL).then((r) => r.text());
    let wordsArr = words.split("\n").map((item) => item.split(" "));
    wordsArr = wordsArr.map((word) => {
        if (word.length > 3) {
            const firstHalf = word.slice(0, 2);
            const secondHalf = word.slice(3, word.length);
            const translation = word[2] + "~" + secondHalf.join("~");
            return [...firstHalf, translation];
        } else {
            return word;
        }
    });
    setWordsSeparated(wordsArr);
};

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
