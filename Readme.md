# Problem Statement

Build a **decentralized**  **messenger** that doesn't track your **PII or location**, doesn't **store that data** and cannot be **banned or censored**


## 1. Breakdown

Given such a vague sentance, lets break this down a little more and try to understand the component parts to the requirements. Firstly, lets examine each part of the requirements thay might warrent some more expansion


### 1.1 Decentralized 

Decentralized is a term banded out in both technical and marketing literature, so firstly we must define what we mean by this. 

 ![Centralized](/docs/assets/centralized.png)

In a traditional model we have central system that is we send and recieve data to. This system is (opionally) responsible to managing ACL and storage of any data we provide to the service. 


In this model the central system is usually accessable via one or more well known entry point (i.e.  DNS/IP) and the interface/contract in which we interact with this system is defined soley by the provider of this service. At any point in time the central system can change the interface, block traffic from specific users/ips and has the potential to be shut down completely (either due to financial, legal or political reasons) 


 ![DeCentralized](/docs/assets/decentralized.png)

In a decentralized model the ownership of the system is not provided by a single service provider and instead a network of hetrogenious nodes provide the services. As the network grows in size not all nodes will be known to any given node as such routing data between node paths becomes important and **discoverability** becomes an issue. 

With a central system we are at the whims of the service provider to known how they deal with out data. In a working decentralized application we have to establish a mechanism of **trust** with each participating node to enusre they are "doing the right thing". 

Finally, unlike a centralized system each node in a decentralized system will be one of a **hetrogeneous** set, meaning that the compute, bandwith and relyability characteristics of each node will differ substantially. 

### 1.2 What is a Messenger?

The requirements call for a messanger, which can mean many things i.e. a real time chat applications, asyncranous email type systems, disibuted logging etc. In the most generic term we can say that a messaging system should consist of on sender to one or more recipient, the mechanism on how that message is **routed** and if any **persistance** (short or long term) needs to be addressed. 

### 1.3 What exactly is PII data?
<br />

 ![PII](/docs/assets/identifiable.png)

Centralized systems have a habit of storing, linking and analysing user information in order to feed ad tech, usage patterns and censoring. PII can be thought of as any information that can be linked to a real world person, these can inlude:

- Phone number
- Email 
- GPS location information
- Biometric info
- IP address
- Etc

Additionally, although not specifically PII, meta data can provide a very interesting information about a user, this could be thinks such as 

- Message length
- Message size
- Recipient 
- Time informaiton
- Etc

At the same time **some identity** is required in a decentralized system in order to perform anything useful. This may include some way of identifying a node, and its capacities within the system (i.e. if it used for storage, routing etc)

Any decentralized system will need to weigh the pros and cons of how much identifiable informaiton is acceptable to make a useful system vs retaining the privacy of its users.

### 1.4 What should be stored, where, and for how long?
<br />

 ![PII](/docs/assets/storage.jpeg)

Storage is an important part of any messaging system, depending on the use case of the system this may be termporary storage (i.e. used to facilitate offline communications) or it may be more long term. 

When sending messages across the network, potentially via multiple nodes then securing those messages become a bit issue. Messages in transit can have very different encryption and security properties for those a rest. It may be that **perfect forward security** is a core feature of the system, this is something usually associated with **end-to-end encryption**, where as longer term storage may not be able to achieve this. 

Each node within a distributed system can provide storage capacitiy but there is also the option of "off network" storage for backup/recovery. Such things would need to be considered for a distributed messaging system. 



### 1.5 What exactly is Censorship in a decentralized system?
<br />

 ![PII](/docs/assets/censorship.jpeg)
 
Censorship is the act of changing messages, or blocking the functionality of a given user (or all users) within a system. The key to censorship in such a system starts with identifying principal to censor. 



Bad actors within a decentralized system will use many advanced techniques of data analysis to try to identify their targets. Limiting PII information is one defence against this, but bigger players can also attack the system as a whole. In this case they can interupt the network itself via blocking discovrability or disabling **bootstrap** nodes. 

There are several techiques to address this but the sentiment is always that its "censorship prevention" and not "censorship proof". 
