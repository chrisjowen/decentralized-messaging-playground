# End to end encryption

Though not stated explicitaly as a requirement of the system, in order to prevent cenroship at the messaging level we would need to ensure that messages routed through the network remain hidden and unchanged. 

For this we will require message level encryption that only the desired recipient can decrypt. For this we need to identify the requirement of such an encryption scheme.


## Symmetric Encryption

Message level encryption could either use a Asymmetric or Symmetric scheme. 

With a Symmetric approach we would require that all messages are encrypted by sender using a private key of which the recipient can decrypt with their known public key. 

The mechanism in which public key exchange occurs is a seperate concern, but this approach would rely on long lived keys been used in the scheme. This opens the communication up to future breaches if a bad actor has the ability to collect historic message and ever gains access to the senders private key. 

If this happens, not only could the messages be decrypted but there could be a strong case to link the sender to the message. 

Ideally we would want a scheme that does not rely on long lived keys, and one if which a single message is decrypted no past or future messages could easily be decrypted. Additionally, this scheme should allos some kind of **deniability**, meaning it would be difficult to prove that any one individual was responsible for its creation. 


## Perfect forward secrecy & Deniable authentication

Perfect forward secracy refers to a mechanism to ensure that if a single message is decrypted, previous messages would not be able to be decrypted with the same key. 

Deniable authentication refers to message authentication between a set of participants where the participants themselves can be confident in the authenticity of the messages, but it cannot be proved to a third party after the event.


## Asymmetric Encryption & Diffe Helman

Asymmetric encryption simplifies this process by using the same key to both encrypt and decrypt a message. While on its surface this seems less secure, given a scheme that allows this key to be rotated periodically means that not all messages are encrypted with the same key. Additionally, without further information it would be impossible to identify who within the conersation generated the message as all participants would be using the same key so any of them could have created the message. 


In order to generate a shared secret key we enlist the help of `Diffe-Hellman` cryptography that allows participants with differnet secret & public information to derive the same secret. 

We can say that given two key pairs of `Curve25519`  i.e. (A.pub, A.priv, B.pub, B.priv) using the DH algorithm we can derive:

> DH(A.pub, B.priv) == DH(B.pub, A.priv)

Meaning that A & B need only exchange there public key and both can then generate the same secret using their private key. 

Once this secret is derived we use a `A key derivation function (KDF)` which given an input will generate consistantly generate a key.  


## Ratchets 

The nice thing about `KDF` is that we can generate keys of a given length, for AES encryption we might use 32 bit but we could use `KDF` to generate a 64 bit key and split this into two. 

We can do this to use the output of the second key as the input into another `KDF` function which in turn generates the next encryption key and the next `KDF` input. This is known as a ratchet chain i.e. 

![Ratchet](https://signal.org/docs/specifications/doubleratchet/Set0_1.png)

This gives us perfect forward secrecy as each new message we encrypt will use the message key from the chain and the next message key will be generated from the chain key output

One issue however is that while previous message cannot be decrypted, if a MITM manages to crack one key they can also use the same ratchet approach to generate future keys. 


## Double Ratchet

The solution to securing future messages means periodically resetting the chain key with a new secret. As before we can use `Diffe-Hellman` to exchange new public keys with each message sent. 

Using this message we can create a root ratchet that we use to generate the input for two child ratchets actually used for encryption.

The reason for two child ratchets is that we must sync input and output messages differently. When Bob generates 3 message and Alice generates one then there ratchets are out of sync. As such both sides need to maintain two ratchets, one for the sender and one for the reciever. This is named symmetric key ratchets see https://signal.org/docs/specifications/doubleratchet/#symmetric-key-ratchet 



