class Friends {

    constructor() {
        this.requests = []
        this.friends = []
    }

    storeRequest(from, to, bundle) {
        this.requests = this.requests.concat([
            { from, to, bundle }
        ])
    }

    getFriendRequests(id) {
        return this.requests.filter( r => r.to == id)
    }

}

module.exports = new Friends()