## Notice
- The repository is no longer being developed due to the API request for information being deleted.
-The project will be completed when permission to access the API is granted.

---
## How to run project
```
- git clone https://github.com/namduongit/sgu-sort.git
- Build FE: cd client && npm install
- Build BE: cd server && npm install
- Run FE: npm start
- Run BE: node index.js
```
---
## ENV Variable
- Config .env file (root)
```env
PORT_BE=5000
HOST_BE=http://localhost:5000
```
- Config .env file (client)
```env
REACT_APP_API_URL=http://localhost:3000
REACT_APP_REQUEST=http://localhost:5000
PORT=3000
```
- Note: The client folder also needs to have a .env file with equivalent content.