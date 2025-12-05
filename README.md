# Marvel Wiki App 

A full-stack Marvel encyclopedia and shopping experience built with **Node/Express**, **MongoDB**, and **React**.

Users can:
- Search for Marvel characters
- View detailed info, comics, stories, and events
- Create an account and save favorites
- Add comics to a cart and place orders

All character and comic data comes from the official **[Marvel Developer API](https://developer.marvel.com/)**.

---

## Project Purpose

This project is a mix of:
- A **fan wiki** for Marvel characters
- A **basic e-commerce flow** for comics

I built it to:
- Get comfortable building a **full MERN-style app** around a third-party API
- Use **MongoDB** for user accounts, favorites, carts, and orders
- Connect a **React frontend** to a custom **Node/Express backend**

---

## Core Features

### Search Character Search & Details
- Search for Marvel characters by name
- View detailed info for each character:
  - Description
  - Thumbnail image
  - Comics they appear in
  - Stories and events they’re part of

### User Accounts & Favorites
- Users can **sign up / log in**
- Logged-in users can **save characters as favorites**
- Favorites are stored in **MongoDB** and tied to each user account

### Comics, Cart & Orders
- Browse comics returned from the Marvel API
- Add any comic to a **shopping cart**
- View the cart and **place an order** for selected comics
- Orders are persisted in MongoDB

> Future enhancement: View an order history and cancel existing orders.

---

#Tech Stack

### Backend
- **Node.js / Express**
  - Custom REST API for characters, favorites, cart, and orders
  - Routes under `routes/` handle different resources (characters, users, etc.)
- **MongoDB**
  - Stores users, favorites, carts, and orders
- **Config**
  - `config/` used for environment setup / DB connection and API keys

### Frontend
- **React.js** (in the `frontend/` directory)
  - Character search UI
  - Character detail pages
  - Favorites, cart, and order flows
- **Styling**
  - CSS, HTML, plus utility frameworks like **Tailwind** and **Bootstrap** for layout and components

---

## 📁 Project Structure

```text
marvelwiki-api/
├─ config/           # Configuration (DB, environment, etc.)
├─ frontend/         # React frontend app
├─ routes/           # Express route definitions
├─ app.js            # Express app entry point
├─ package.json      # Backend dependencies & scripts
└─ README.md

Got you — here is ONE single clean block you can copy all at once and paste straight into your README.
No breaks, no extra chat — just the full Getting Started section in one piece.

⸻


#Getting Started

Follow these steps to run the Marvel Wiki App locally.

### 1. Clone the repository
```bash
git clone https://github.com/ChazzGagliano/marvelwiki-api.git
cd marvelwiki-api

2. Install backend dependencies

npm install

3. Set up environment variables

Create a .env file in the root of the project and add:

MARVEL_PUBLIC_KEY=your_public_key_here
MARVEL_PRIVATE_KEY=your_private_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=3000

(You can get your Marvel API keys from https://developer.marvel.com/)

4. Start the backend server

npm start

Your backend should now be running at:

http://localhost:3000

5. Install and start the frontend

cd frontend
npm install
npm start

The frontend will run at:

http://localhost:5173

You’re all set!

You can now:
	•	Search Marvel characters
	•	View comics, stories, and events
	•	Create an account
	•	Save favorites
	•	Add comics to your cart
	•	Place orders

