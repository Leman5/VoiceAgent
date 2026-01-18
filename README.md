# Voice Agent

## Marketing Site

```bash
cd marketing_site
npm install
npm run build
```

## Voice Agent Backend

```bash
cd voice-agent-backend
source myenv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

Open `/test_client.html` in your browser to test the voice agent.
