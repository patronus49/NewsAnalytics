const similarity = require('sentence-similarity')
const similarityScore = require('similarity-score')
 
/**
 * uses the npm library to generate matching score for
 * two sentences converted to list of their words
 */
class Scorer {

    constructor() {
        this.query = [];
        this.match = [];
    }

    setQuery(query) {
        this.query = query;
    }

    getQuery() {
        return this.query;
    }

    setMatch(match) {
        this.match = match;
    }

    getMatch() {
        return this.match;
    }

    getScore() {
        const winkOpts = { f: similarityScore.winklerMetaphone, options : {threshold: 0} }
        return similarity(this.getQuery(), this.getMatch(), winkOpts);
    }
}
 
module.exports = new Scorer();