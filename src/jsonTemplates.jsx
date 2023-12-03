export let storyTemplate = {
    "game": {
        "playing": false,

        "story": {
            "year": null,
            "theme": null,
            "synopsys": null,
            "numberOfCharacters": 5,
            "evidence": {
                "_wittnessesComment": "whitnesses should be a list of a subset of all the characters",
                "weapon": null,
                "witnesses": null
            }
        },

        "characters": {
            "_comments": "fill this sections with several characters (this should match the numberOfCharacters value) that fit the story theme, only one person should be guilty",
            "judge": {
                "guilty": false,
                "attributes": {
                    "_comments": "all of theses should be float values between 0 and 1",
                    "saddness": null,
                    "happiness": null,
                    "anger": null,
                    "anxiety": null,
                    "fear": null
                },
                "background": {
                    "firstName": null,
                    "lastName": null,
                    "age": null,
                    "occupation": null,
                    "backstory": null,
                    "bias": null,
                    "_connectionComments": "create a list of connections to the other characters, they should not be connected to everyone",
                    "connections": ["victim", null]
                },
                "response": {
                    "responseSentiment": null,
                    "responseText": null
                }

            }
        }
    }
}