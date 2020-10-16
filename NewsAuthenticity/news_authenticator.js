const apiClient = require('../NewsAPI/api_client');
const matchFinder = require('../StringMatcher/match_finder');

class NewsAuthenticator {

    constructor() {
        this.title = "";
        this.authenticity = false;
        /**
         * this threshold value can be tuned later
         * with more data set and results
         */
        this.threshold = 0.8;
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setAuthenticity(authenticity) {
        this.authenticity = authenticity;
    }

    getAuthenticity() {
        return this.authenticity;
    }

    getThreshold() {
        return this.threshold;
    }

    checkAuthenticity(title) {
        this.setTitle(title);
        return apiClient.callApi(apiClient.setPayload(this.getTitle(), "", ""))
            .then((apiResponse) => {
                matchFinder.findmatch(this.getTitle(), apiResponse);
                this.checkThreshold(matchFinder.getMatchScore());
                return this.printAuthenticityResult();
            })
    }

    checkThreshold(matchScore) {
        if (matchScore >= this.getThreshold()) {
            this.setAuthenticity(true);
        }
        else {
            this.setAuthenticity(false);
        }
    }

    printAuthenticityResult() {
        console.log(`News:"${this.getTitle()} " seems to be: ${this.getAuthenticity()}`);
        return;
    }

}

module.exports = new NewsAuthenticator();