const finder = require('./finder');

class NameFinder {

    constructor() {
        this.searchTextObject = {};
        this.names = [];
    }

    setNames(namesList) {
        this.names = namesList;
    }

    getNames() {
        return this.names;
    }

    getPeopleList(apiResponseObject) {
        let apiResponseText = "";

        apiResponseObject.articles.forEach((article) => {
            apiResponseText = apiResponseText + " " + article.content;
        })

        this.setNames(finder.findNames(apiResponseText));
        return this.getNames();        
    }

}

module.exports = new NameFinder();