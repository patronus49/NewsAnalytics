const nlp = require("compromise");
const trimTrailingCommaFromString = require('./utils');

/**
 * collects person names from text blob using the
 * npm library
 */
class Finder {

    constructor() {
        this.textBlob = "";
        this.result = [];
    }

    setTextBlob(text) {
        this.textBlob = text;
    }

    getTextBlob() {
        return this.textBlob;
    }

    setResult(result) {
        this.result = result;
    }

    getResult() {
        return this.result;
    }

    findNames(text) {
        this.setTextBlob(text);
        let doc = nlp(this.getTextBlob());
        let names = [];

        doc.people().json().forEach((name) => {
            names.push(trimTrailingCommaFromString.trimTrailingCommaFromString(name.text));
        })

        names =  [...new Set(names)]; 

        this.setResult(names);
        return this.getResult();
    }

}

module.exports = new Finder();