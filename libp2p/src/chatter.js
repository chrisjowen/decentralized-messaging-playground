const PeerId = require("peer-id")
const P2PNode = require("./p2p/node")
const pipe = require('it-pipe')
const MailBoxProtocol = require("./mailbox/mailbox_protocol")
const ChatterProtocol = require("./chatter/chatter_protocol")



class ChatterNode extends P2PNode {
    constructor(peerId = null) {
        super([
                '/ip4/0.0.0.0/tcp/63787',
                '/ip4/0.0.0.0/tcp/63788/ws'
            ],
            peerId,
            [new ChatterProtocol()],
            ['/ip4/127.0.0.1/tcp/63785/ipfs/QmWjz6xb8v9K4KnYEwP5Yk75k5mMBCehzWFLCvvQpYxF3d']
        )
        this.mailboxes = []
        
    }

    listenForMailBoxNodes() {
        const me = this;
        this.node.connectionManager.on('peer:connect', (connection) => {
            me.mailboxes = this.node.peerStore.peers.filter(n => {
                console.log("NOde")
                n.protocols.includes(MailBoxProtocol.PROTOCOL)
            })
        })
    }

    processInput() {
        this.mailboxes.forEach(async (peerData) => {
            const { stream } = await connection.newStream([MailBoxProtocol.PROTOCOL])
            let message = {
                type: String(msg),
                data: {
                    to: "QmeHvyBKQ6ghSK8VszmcbHuspDesxUgeRnDZMfggiVfdn9",
                    bundle: "Hello",
                }
            }
            await pipe([JSON.stringify(message)],stream)
        })
    }



}

async function main() {

    let node = new ChatterNode()
    await node.start()
    node.listenForMailBoxNodes()
    process.stdin.on('data', m =>  {
        msg = m.slice(0, -1)
        node.processInput(m)
    })


    // //StdIn input
    // 
    //     node.peerStore.peers.forEach(async (peerData) => {
    //         const connection = node.connectionManager.get(peerData.id)
    //         if (!peerData.protocols.includes(MailBoxProtocol.PROTOCOL)) return
            
    //         const { stream } = await connection.newStream([MailBoxProtocol.PROTOCOL])
    //         msg = m.slice(0, -1)


    //         let message = {
    //             type: String(msg),
    //             data: {
    //                 to: "QmeHvyBKQ6ghSK8VszmcbHuspDesxUgeRnDZMfggiVfdn9",
    //                 bundle: "Hello",
    //             }
    //         }
    //         await pipe([JSON.stringify(message)],stream)
    //     })
    // })





}




main()