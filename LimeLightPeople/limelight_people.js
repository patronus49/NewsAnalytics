const apiClient = require('../NewsAPI/api_client');
const nameFinder = require('../TextParser/name_finder');

class LimeLightPeople {

    constructor() {
        this.query = "";
        this.peopleList = [];
    }

    setQuery(query) {
        this.query = query;
    }

    getQuery() {
        return this.query;
    }

    setPeopleList(list) {
        this.peopleList = list;
    }

    getPeopleList() {
        return this.peopleList;
    }

    getLimeLightPeople(query) {

        this.setQuery(query);

        let todayDate = new Date();
        let weekAgoDate = new Date();
        weekAgoDate.setDate(todayDate.getDate() - 7);
        
        return apiClient.callApi(apiClient.setPayload(query, todayDate.toISOString(), weekAgoDate.toISOString()))
            .then((apiResponse) => {
                this.setPeopleList(nameFinder.getPeopleList(apiResponse))
                return this.printList();
            })
    }

    printList() {
        console.log(`Famous People for Category: ${this.getQuery()}
        ${this.getPeopleList()}`);
        return;
    }

}

module.exports = new LimeLightPeople();