#  Farsi Pomodoro Timer

A Farsi Pomodoro timer app built to explore coding with AI agents and setting up local proxy routes with 9Router.

> **Live Demo:** [**Check out the live app here**](https://persian-pomodoro-timer.vercel.app/)) 
---

## 🎯 About This Project

I built this project to get hands-on experience using **AI coding agents** and configuring **9Router** as a local LLM gateway. 

I set up a local proxy environment to route prompts to free LLM tiers (like Google Gemini Flash) and guided the agent to build a custom, localized web app.

It was a fun exercise to see how fast you can turn an idea into a working product by combining the right AI tools and local environment setups!

---

## ✨ Features

- **Persian UI & Typography:** Native `RTL` layout using the Vazirmatn font and Persian numerals (`۰۱۲۳۴۵۶۷۸۹`).
- **Pomodoro Modes:** 25-min Focus , 5-min Short Break , and 15-min Long Break .
- **Background Music:** Integrated lofi/ambient stream player with mute/unmute toggles.
- **Minimal Controls:** Buttons to play, pause, reset, and skip actions.

---

## 🛠 Tech Stack & Tools Used

- **AI Orchestration:** 9Router (local proxy on `localhost:20128`) + Gemini Free Tier
- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Typography & Layout:** Vazirmatn Font, Right-to-Left (`dir="rtl"`)
- **Media:** HTML5 Web Audio API & embedded background video

---

## 🚀 How I Built It

1. Set up **9Router** locally to manage free model API endpoints and avoid rate limits.
2. Pointed my coding agent(Cline in vscode) harness to `http://localhost:20128/v1`.
3. Designed prompts specifying RTL rules, custom video links, and glassmorphism styling constraints to avoid standard template looks.
4. Tweaked and assembled the final single-file prototype.

---

*Built as an exploration into modern developer AI workflows!*
