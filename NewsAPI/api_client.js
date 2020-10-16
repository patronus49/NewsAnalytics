const NewsAPI = require('newsapi');
const dotenv = require('dotenv')

dotenv.config();

/**
 * IIFE to throw error in case the News API key is not present
 */
(function () {
    if (!process.env.x_newsapi_key) {
        throw new Error('News API key missing. Required.');
    }
})();


class ApiClient {

    constructor() {
        this.newsapi = new NewsAPI(process.env.x_newsapi_key);
        this.payload = {};
    }

    setPayload(query, fromDate, toDate) {
        this.payload = {
            q: query,
            sources: '',
            domains: '',
            from: fromDate,
            to: toDate,
            language: 'en',
            sortBy: 'relevancy',
            page: 1
        };
    }

    getPayload() {
        return this.payload;
    }

    callApi() {
        
        return this.newsapi.v2.everything(this.getPayload())
            .then(response => {
                return response;
          });
    }
}

module.exports = new ApiClient();