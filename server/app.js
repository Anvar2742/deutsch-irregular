const port = 8000;
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());
app.use(express.json());
 
const getTranslation = async (verb) => {
    const options = {
        method: "POST",
        url: "https://microsoft-translator-text.p.rapidapi.com/translate",
        params: {
            "to[0]": "fr",
            "api-version": "3.0",
            from: "de",
            profanityAction: "NoAction",
            textType: "plain",
        },
        headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key":
                "2d472fb8admsh498e2bdde1fb4e7p1c719ajsn1ccddf30fde2",
            "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
        data: `[{"Text":"${verb}"}]`,
    };

    return axios
        .request(options)
        .then(function (response) {
            return response.data[0].translations;
        })
        .catch(function (error) {
            return error;
        });
};

app.get("/translation", async (req, res) => {
    // console.log(req.query);
    let translation = await getTranslation(req.query.verb);
    res.send(translation);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
