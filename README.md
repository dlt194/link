# Link Shortening Application

A modern link shortener built with **React (Vite)**, **ShadUI** for the frontend, and **Supabase** as the backend.

## Features

- Shorten long URLs with a single click
- User authentication (Supabase Auth)
- Dashboard to manage your links
- Analytics: track clicks and usage
- Responsive UI with ShadUI components

## Tech Stack

- **Frontend:** React (Vite), ShadUI, TypeScript
- **Backend:** Supabase (Database & Auth)
- **Deployment:** Vercel/Netlify (Frontend), Supabase (Backend)

## Getting Started

### Prerequisites

- Node.js & npm
- Supabase account

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/dlt194/link-shortener.git
   cd link-shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Supabase:**

   - Create a new project on [Supabase](https://supabase.com/)
   - Copy your Supabase URL and anon key
   - Create a `.env` file:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## Folder Structure

```
url-shortener/
├── frontend/
│   ├── src/
│   │   ├── components/         # Shadcn components (URLForm, URLList, etc.)
│   │   ├── pages/              # (optional) Page-level components
│   │   ├── utils/              # API client, session management
│   │   ├── App.tsx / App.jsx   # App entry
│   │   └── main.tsx / main.jsx # Vite entry
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts / vite.config.js
│
├── README.md
└── .gitignore
```

## Database Schema (Supabase)

- **links**
  - `id`: UUID (Primary Key)
  - `original_url`: Text
  - `short_code`: Text (Unique)
  - `user_id`: UUID (Foreign Key)
  - `clicks`: Integer
  - `created_at`: Timestamp

## License

MIT

---

Built with ❤️ using React, ShadUI, and Supabase.
