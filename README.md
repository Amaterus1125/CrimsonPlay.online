# CrimsonPlay -- 

CrimsonPlay is an AI-powered game recommendation engine that delivers accurate and relevant game suggestions based on user input.
The platform analyzes similarity using models accessed through the Hugging Face Inference API and returns a curated list of **five related games**. Each recommended title links directly to its SteamDB page for deeper exploration and statistics.
---
## Overview
CrimsonPlay focuses on fast, intelligent, and minimal recommendation delivery.
The system flow:

1. User enters a game title.
2. The React frontend sends a request to a FastAPI backend hosted on Hugging Face.
3. The backend processes similarity using AI models.
4. The API returns five highly relevant game recommendations.
5. Clicking a recommendation redirects the user to its SteamDB page.
---
## Technology Stack -- 
### Backend (Hosted on Hugging Face)

* FastAPI
* Docker (containerized deployment)
* Hugging Face Inference API

The backend is deployed separately using a Dockerfile inside the Hugging Face Spaces environment and is not included in this repository.

### Frontend

* React
* React Router
* HTML5
* TailwindCSS
* GSAP (animation engine)
* CSS3

---
## Local Development

Clone the repository:

```bash
git clone https://github.com/your-username/crimsonplay.git
cd crimsonplay
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

The application runs locally at:

```
http://localhost:5173
```

---

## API Integration

The frontend communicates with the hosted backend endpoint:

```
https://your-huggingface-space-url.hf.space/recommend
```

### Example Request

```json
{
  "game": "Call of Duty"
}
```

### Example Response

```json
{
  "recommendations": [
    "CS:GO",
    "Apex Legends",
    "Overwatch 2",
    "Rainbow Six Siege",
    "Call of Duty : Black Ops"
  ]
}
```

---

## Features

* AI-powered similarity detection
* Exactly five curated recommendations per query
* Direct SteamDB redirection
* Smooth UI transitions using GSAP
* Responsive layout with TailwindCSS
* Docker-based backend deployment on Hugging Face

---

## Deployment

Frontend can be deployed on:

* Vercel
* Netlify
* Any static hosting provider

Backend is deployed separately through Hugging Face Spaces using Docker.

---

## Live Website

[https://crimsonplay.online](https://crimsonplay.online)

---

## License

MIT License

---
