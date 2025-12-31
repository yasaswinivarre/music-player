# 🎵 Music Player

A modern and user-friendly **React-based music player** that allows users to explore songs, manage a playback queue and save favorites.  
The application uses a **public music API** to fetch tracks and provides a clean, responsive UI with persistent state across page refreshes.

---

## ✨ Features

- 🔍 **Explore Music**
  - Search for songs and artists using a public API
  - View track artwork, title and artist details

- ▶️ **Now Playing**
  - Play 30-second song previews
  - Previous / Next track controls
  - Clear “Now Playing” section with track details

- ➕ **Queue**
  - Add tracks to a queue
  - Select any song in the queue to play
  - Remove individual tracks or clear the queue
  - Queue persists even after page refresh

- ❤️ **Favorites**
  - Mark tracks as favorites
  - Favorites are saved using `localStorage`
  - Play songs directly from the Favorites tab

- 💾 **Persistent State**
  - Queue, favorites and current track are preserved after refresh

- 🎨 **Clean & Responsive UI**
  - Bright, modern and playful design
  - Organized tabs: Explore, Queue, Favorites
  - Responsive layout for smaller screens

---

## 🛠️ Tech Stack

- **Frontend:** React (Hooks)
- **Build Tool:** Vite
- **Styling:** Custom CSS
- **API:** Public iTunes Search API
- **State Management:** React state + `localStorage`
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

# 🎵 Music Player

A modern and user-friendly **React-based music player** that allows users to explore songs, manage a playback queue, and save favorites.  
The application uses a **public music API** to fetch tracks and provides a clean, responsive UI with persistent state across page refreshes.

---

## ✨ Features

- 🔍 **Explore Music**
  - Search for songs and artists using a public API
  - View track artwork, title, and artist details

- ▶️ **Now Playing**
  - Play 30-second song previews
  - Previous / Next track controls
  - Clear “Now Playing” section with track details

- ➕ **Queue**
  - Add tracks to a queue
  - Select any song in the queue to play
  - Remove individual tracks or clear the queue
  - Queue persists even after page refresh

- ❤️ **Favorites**
  - Mark tracks as favorites
  - Favorites are saved using `localStorage`
  - Play songs directly from the Favorites tab

- 💾 **Persistent State**
  - Queue, favorites, and current track are preserved after refresh

- 🎨 **Clean & Responsive UI**
  - Bright, modern, and playful design
  - Organized tabs: Explore, Queue, Favorites
  - Responsive layout for smaller screens

---

## 🛠️ Tech Stack

- **Frontend:** React (Hooks)
- **Build Tool:** Vite
- **Styling:** Custom CSS
- **API:** Public iTunes Search API
- **State Management:** React state + `localStorage`
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

# 🎵 Music Player

A modern and user-friendly **React-based music player** that allows users to explore songs, manage a playback queue, and save favorites.  
The application uses a **public music API** to fetch tracks and provides a clean, responsive UI with persistent state across page refreshes.

---

## ✨ Features

- 🔍 **Explore Music**
  - Search for songs and artists using a public API
  - View track artwork, title, and artist details

- ▶️ **Now Playing**
  - Play 30-second song previews
  - Previous / Next track controls
  - Clear “Now Playing” section with track details

- ➕ **Queue**
  - Add tracks to a queue
  - Select any song in the queue to play
  - Remove individual tracks or clear the queue
  - Queue persists even after page refresh

- ❤️ **Favorites**
  - Mark tracks as favorites
  - Favorites are saved using `localStorage`
  - Play songs directly from the Favorites tab

- 💾 **Persistent State**
  - Queue, favorites, and current track are preserved after refresh

- 🎨 **Clean & Responsive UI**
  - Bright, modern, and playful design
  - Organized tabs: Explore, Queue, Favorites
  - Responsive layout for smaller screens

---

## 🛠️ Tech Stack

- **Frontend:** React (Hooks)
- **Build Tool:** Vite
- **Styling:** Custom CSS
- **API:** Public iTunes Search API
- **State Management:** React state + `localStorage`
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

src/
├── api/ # API calls (music search)
├── hooks/ # Custom hooks (useLocalStorage)
├── components/ # UI components
├── App.jsx # Main application logic
├── main.jsx # Application entry point
├── index.css # Global styles


---

## 🚀 Getting Started

### 1️⃣ Clone the repository

git clone https://github.com/yasaswinivarre/music-player.git
cd music-player

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev

Open your browser and visit:
http://localhost:5173

🧠 How the App Works
Explore Tab
Fetches and displays search results from the API
Used for discovering and selecting music

Queue Tab
Manages the playback order
Allows users to navigate between tracks

Favorites Tab
Stores liked songs permanently using localStorage

