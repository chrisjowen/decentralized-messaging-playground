const ChatterProtocol = require("../chatter/chatter_protocol")
const Protocol = require("../p2p/protocol")
const Friends = require("./friends")

class MailBoxProtocol extends Protocol {
    static PROTOCOL = "/MailBox/1.0.0"
    constructor() {
        super(MailBoxProtocol.PROTOCOL)
        this.handlers = {
            1: this.friendRequest.bind(this),
            2: this.getFriendRequests.bind(this)
        }
    }

    friendRequest(command, connection) {
        Friends.storeRequest(connection.remotePeer.toB58String(), command.to, command.bundle)
    }
    storeInitialMessage(command, connection) {
        console.log("storing key ")
    }
    storeMessage(command, connection) {
        console.log("storing key ")
    }
    getFriendRequests(command, connection) {
        this.respond({
            type: "FRIEND_REQUEST_RESPONSE",
            data: Friends.getFriendRequests(connection.remotePeer.toB58String())
        }, connection, ChatterProtocol.PROTOCOL)

    }
    getMessages(command, connection) {
        console.log("storing key ")
    }
}

module.exports = MailBoxProtocol
