const pipe = require('it-pipe')

class Protocol {
    constructor(name) {
        this.name = name
        this.handler = this._handler.bind(this)
        this.onMessage = this.onMessage.bind(this)
        this.respond = this.respond.bind(this)
    }

    onMessage(message, connection) {
        message = String(message)
        let json = JSON.parse(message)
        let handler = this.handlers[json.type]

        if (handler) {
            handler(json.data, connection)
        }
        else {
            console.log("No handler for type ", message)
        }
    }

    async respond(message, connection, protocol = this.name) {
        const { stream } = await connection.newStream([protocol])
        pipe([JSON.stringify(message)], stream)
    }

    async _handler({ connection, stream }) {
        let me = this;
        try {
            await pipe(
                stream,
                (source) => (async function* () {
                    for await (const message of source) {
                        me.onMessage(message, connection)
                    }
                })(),
                stream
            )
        } catch (err) {
            console.error(err)
        }
    }
}

module.exports = Protocol