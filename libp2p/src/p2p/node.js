
const Libp2p = require('libp2p')
const TCP = require('libp2p-tcp')
const Websockets = require('libp2p-websockets')
const WebrtcStar = require('libp2p-webrtc-star')
const wrtc = require('wrtc')
const Mplex = require('libp2p-mplex')
const { NOISE } = require('libp2p-noise')
const MDNS = require('libp2p-mdns')
const KademliaDHT = require('libp2p-kad-dht')
const Gossipsub = require('libp2p-gossipsub')
const Bootstrap = require('libp2p-bootstrap')
const pipe = require('it-pipe')


class P2PNode {

    constructor(listenAddrs, peerId = null, protocols = [], bootstrapAddrs = null) {
        this.listenAddrs = listenAddrs
        this.peerId = peerId
        this.protocols = protocols
        this.bootstrapAddrs = bootstrapAddrs
    }

    async start() {
        this.node = await this._createNode(this.listenAddrs, this.peerId, this.bootstrapAddrs)
        await this.node.start()

        this.protocols.forEach(protocol =>
            this.node.handle(protocol.name, protocol.handler)
        )
        this._printConnections()
        return this
    }



    _printConnections() {
     
        // console.log('Addresses:')
        // this.node.transportManager.getAddrs().forEach(ma => console.log(ma.toString()))
        // console.log('\nProtocols:')
        // this.node.upgrader.protocols.forEach((_, p) => console.log(p))
    }

    async _createNode(listenAddrs, peerId, bootstrapAddrs) {

        let modules = {
            transport: [WebrtcStar, TCP, Websockets],
            streamMuxer: [Mplex],
            connEncryption: [NOISE],
            peerDiscovery: [MDNS],
            dht: KademliaDHT,
            pubsub: Gossipsub
        }
        let config = {
            transport: {
                [WebrtcStar.prototype[Symbol.toStringTag]]: {
                    wrtc
                }
            },
            relay: {
                enabled: true,
                hop: {
                    enabled: true,
                    active: false
                }
            },
            dht: {
                enabled: true,
                randomWalk: {
                    enabled: true
                }
            }
        }

        if (bootstrapAddrs) {
            console.log("Is bootstrapping")
            modules.peerDiscovery = [MDNS, Bootstrap]
            config.peerDiscovery = {
                bootstrap: {
                    list: bootstrapAddrs
                }
            }
        }

        return Libp2p.create({
            peerId,
            addresses: {
                listen: listenAddrs
            },
            modules,
            config
        })
    }

}

module.exports = P2PNode