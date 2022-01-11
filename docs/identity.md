# Identity Protection

When we think of PII usually we are considering things such as email, home address or name etc. However, PII can also include location information, IP addresses, meta information about connection time and activity within a system. 

Protecting this identifiable information is the first step to been censorship resistant, and guarding from misuse of our data. 

In a decentralized world it may be that additional information may be required for each node to do anything useful. This could be things like peerIds, protocols/features the node supports an transports they can use. 

The truth is that there really is not any getting around the fact that in order for a participant to use any online system they will need an active connection at some point (even a short lived one). That said a connection is somewhat meaninless if it cannot be linked to person. 

To address this there are several approaches:

- Connectivity via a centralized VPN or proxy service
- Decentralized annonymity via TOR/I2P
- Hiding in the crowd

# Connectivity via a centralized VPN or proxy service

Participants choosing to hide their connection information via a third party VPN is a viable initial step they can take to anonomity, however as this is out of the control of the decentralized system we will not discuss this further


# Decentralized annonymity via TOR/I2P

Several protocols such as TOR exist that allow users to build up secure relays between one node and its eventual recipient node. 

TOR works by establishing a path and performing a series of `Diffe-Hellman` key exchanges between multiple nodes between sender and recipient. Once the exhange has occured the sender can encrypt their message with multiple levels ensuring that each hop in the path can only decrypt their layer.

At this point the node is either the final hop and they would send the payload to the destination, or if they are a middle node they simply pass on the next layer to the next node in the path i.e.



>  A - Encrpt Bk(Ck(Dk(msg))) -> B - Decrypt Ck(Dk(msg)) -> C - Decrypt Dk(msg) -> D 


Using the TOR network ensures that only the initial node knows the sender and the final node the recipient (and payload). 

> NOTE: In our case the final node payload should be encrypted outside of the TOR protocol to stop them reading the message. 

One issue here is that if bad actors manage to have enough nodes to act as the initial and end node then using various timing techniques they can accurately collect meta data about the communication. 

The TOR network is volenteer led and not incentivised, as such has issues with relayability, security etc. 

## TOR Protocol vs Network

Its worth noting that While the TOR network and software could be used externally to the decentralized system, it's nodes could alternitively implement the TOR protocol directly into its capabilities. Some examples are:

- https://github.com/Ayms/node-Tor - A nodejs implemenation of the protocol (could be used in by a node)
- https://oxen.io/session-lokinet - Lokinet is an full implementation built on the Oxen services nodes which are incentivied nodes (see incentiviation and monitoring). Session app is a messaging app built ontop of this

# Hiding in the crowd

An alternitive approach to TOR or VPNs trying to hide the IP of the connected node it to simply make determaning activity very difficult to monitor by simply not trying to explicitly route messages from A to B but route all messages to/from to multiple nodes. 

Status app uses the approach of mass PubSub to all listening nodes via a common topic that many nodes pub/sub to/from see - https://rfc.vac.dev/spec/14/. This approach does not try to hide the IP of the connected node, but messages sent are propogated throughout the network and it has a strict NOSIGN policy meaning that all messages do not contain identifiable information, not even the recipient signature. 

This means anyone else listening sitting on the topic will have many messages to go through with no identifiable informaiton. 

This comes at a cost that the actual recipient may have to recieve and attempt various methods to decrypt message that are not meant for them. This increase in network traffic and compute may be unmanagable for mobile and lower powered devices. Additionally, things like the double ratchet encryption protocol requires the recipient to know which ratchet to use for the sender.

To reduce the amount of decryption attempts this can be overcome by allowing content routing paramaters to be added. While this will still result in the message appearing on the same topic as many others (and as such been sent to many nodes) it can be used by the recipient to quickly filter out messages they dont care about. However, this must be used carefully to not add traceable information to the message. 


