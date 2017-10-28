Proxy Anywhere
-------
node.js application acts like proxy server. It handles http request from frontend. Because when fetch APIs from frontend it will violate Cross-Origin Policy.

Requirements
-----
- Node.js

Installation
----
```
npm install
npm start
```

Usage
----

Pattern:
```
http://proxyHost/api?q=anotherEndPoint
```

Suppose proxy is running at `http://localhost:3002`.
```
// client-site

fetch('http://localhost:3002/api?q=https://jsonplaceholder.typicode.com/posts')
```

Now we can avoid Cross-Origin problem.