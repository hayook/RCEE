# MeetCode

A remote code execution platform that securely runs untrusted user code inside isolated Docker containers.

### Supported languages

- C
- Python 3
- JavaScript (Node.js)

### Prerequisites

- Node.js (v18+)
- Docker

### Local development environment

**1. Build the Docker Sandbox Image**

```
docker build -t mc-sandbox ./docker-client/sandbox
```

**2. Start the runner service**
```
cd docker-client
npm install
sudo node app.js
```

**3. Start the web server**
```
cd server
npm install
npm run dev
```

**4. Start the frontend**

```
cd client
npm install
npm start
```
