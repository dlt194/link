# URL Shortener

A full-stack application for shortening URLs, built with **React** (frontend) and **Express** (backend).

## Features

- Shorten long URLs to easy-to-share links
- Redirect to original URLs using short links
- View history of shortened URLs
- Responsive and user-friendly interface

## Tech Stack

- **Frontend:** React, Axios, CSS/Styled Components
- **Backend:** Express, Node.js, MongoDB (or your preferred database)
- **Other:** REST API, dotenv

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (or another database)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies:**

   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../client
     npm install
     ```

3. **Configure environment variables:**

   - Create a `.env` file in `/server` with your database URI and other secrets.

4. **Run the application:**
   - Start backend:
     ```bash
     cd server
     npm start
     ```
   - Start frontend:
     ```bash
     cd ../client
     npm start
     ```

## Usage

1. Enter a long URL in the input field.
2. Click "Shorten".
3. Copy and share the generated short URL.

## Folder Structure

```
url-shortener/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Logic for endpoints (shorten, list, delete)
│   │   ├── models/             # DB access layer (e.g. URL model, DB utils)
│   │   ├── routes/             # Express routers
│   │   ├── middleware/         # (optional) e.g. session handling, error handlers
│   │   ├── app.js              # Express app config
│   │   └── server.js           # Entry point (starts server)
│   ├── database/
│   │   └── database.db         # SQLite database file (generated at runtime)
│   ├── package.json
│   └── .env                    # (optional) Configs like PORT
│
├── frontend/
│   ├── src/
│   │   ├── components/         # React components (URL form, URL list, etc.)
│   │   ├── pages/              # If you want page-level components (e.g. Dashboard)
│   │   ├── utils/              # Helpers (e.g. API client, session manager)
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── vite.config.js / CRA config  # (depending on setup)
│
├── README.md
└── .gitignore
```

## License

MIT

---

_Feel free to contribute or open issues!_
