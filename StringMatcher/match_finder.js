const scorer = require('./scorer');

class MatchFinder {

    constructor() {
        this.queryString = "";
        this.matchObject = "";
        this.matchScore = 0;
    }

    setQueryString(queryString) {
        this.queryString = queryString;
    }

    getQueryString() {
        return this.queryString;
    }

    setMatchObject(matchObject) {
        this.matchObject = matchObject;
    }

    getMatchObject() {
        return this.matchObject;
    }

    setMatchScore(matchScore) {
        this.matchScore = matchScore;
    }

    getMatchScore() {
        return this.matchScore;
    }

    findmatch(queryString, matchObject) {
        this.setQueryString(queryString);
        this.setMatchObject(matchObject);
        const matchTitleArray = this.getTitleArrayFromMatchObject();
        this.setMatchScore(this.calculateScore(matchTitleArray));
    }

    getTitleArrayFromMatchObject() {
        const titleArray = [];
        this.getMatchObject().articles.forEach(article => {
            titleArray.push(article.title);
        })
        return titleArray;
    }

    /**
     * 
     * @param {list} matchTitleArray list of news titles found across web
     * compares for similarity between given title and titles found
     *  
     */
    calculateScore(matchTitleArray) {
        let scoreResult = [];
        const query = this.getQueryString().trim().split(' ');
        scorer.setQuery(query);
        
        matchTitleArray.forEach((title) => {
            let match = title.trim().split(' ');
            scorer.setMatch(match);
            scoreResult.push(scorer.getScore());
        })

        const resultSize = scoreResult.length;
        let positiveScore = this.findPositives(scoreResult, query);

        if (positiveScore == 0) {
            return 0;
        }

        this.setMatchScore(positiveScore / resultSize);
        return this.getMatchScore();
    }

    /**
     * 
     * @param {list} scoreResult string matching score result against each title
     * @param {list} query original query title word's list 
     * this is a naive approach to consider match score as accepted value
     * if match score exceeds the query length by 33%
     * since the match can result in false positives with exact match for single word
     * this can be better tuned, also can be implemented better for better results
     */
   findPositives(scoreResult, query) {
       let positiveScore = 0;

        scoreResult.forEach((row) => {
            if ((row.score / query.length) > 1/3) {
                positiveScore++;
            }
        })
        return positiveScore;
    }

}

module.exports = new MatchFinder();