# 🕊 Asha — AI Chatbot for NayePankh Foundation

An AI-powered assistant that helps visitors donate, volunteer, and learn about NayePankh Foundation. Built with Claude AI, secured via Netlify Functions so the API key is never exposed.

---

## 🚀 Deploy to Netlify (5 minutes)

### Step 1 — Get your Anthropic API key
Go to https://console.anthropic.com → API Keys → Create Key → Copy it

### Step 2 — Deploy
1. Go to **netlify.com** → Sign up free with GitHub
2. Click **"Add new site" → "Deploy manually"**
3. Drag and drop the entire **`nayepankh-netlify`** folder
4. Wait ~30 seconds → your site is live!

### Step 3 — Add your API key (keeps it secret)
1. In Netlify dashboard → **Site configuration → Environment variables**
2. Click **Add variable**
3. Key: `ANTHROPIC_API_KEY`
4. Value: `sk-ant-xxxxxxxx` (your key from Step 1)
5. Click **Save** → then **Deploys → Trigger deploy**

Your live URL will be something like:
```
https://nayepankh-asha.netlify.app
```

---

## 🔐 Security
- API key stored as environment variable — never in code
- Frontend calls `/api/chat` (your own server)
- Your server calls Anthropic — key stays hidden

## 🛠 Tech Stack
- Frontend: Pure HTML/CSS/JS
- Backend: Netlify Functions (Node.js)
- AI: Anthropic Claude (claude-sonnet-4-6)

## 📁 File Structure
```
nayepankh-netlify/
├── index.html                   ← Frontend chatbot UI
├── netlify.toml                 ← Netlify config
├── README.md                    ← This file
└── netlify/
    └── functions/
        └── chat.js              ← Secure backend (holds API key)
```

## ✨ Features
- 🤖 Real AI responses via Claude
- 🧠 Memory — remembers your name, city, interests
- ⚡ Quick reply buttons
- 📱 Mobile responsive
- 🔐 API key never exposed to users
