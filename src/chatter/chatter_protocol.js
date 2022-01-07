const Protocol = require("../p2p/protocol")

class ChatterProtocol extends Protocol {
    static PROTOCOL = "/Chatter/1.0.0"
    constructor() {
        super(ChatterProtocol.PROTOCOL)
        this.handlers = {
            FRIEND_REQUEST_RESPONSE: this.getFriendResponse.bind(this),
        }
    }

    //TODO: These should be in chatter protocol
    getFriendResponse(command, connection) {
        console.log(command)
    }

}

module.exports = ChatterProtocol
