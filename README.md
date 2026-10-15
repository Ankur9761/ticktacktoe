# 🎮 Interactive Tic-Tac-Toe Game

A modern, responsive, and accessible two-player **Tic-Tac-Toe** web application featuring clean glassmorphism aesthetics, real-time win/tie detection, winning path animation, and keyboard accessibility.
link https://6ad05bd430aa2c6dbaa7a851--bejewelled-biscuit-2a36cc.netlify.app/

---

## 🌟 Features

- **Classic 2-Player Mode**: Seamless turn alternation between Player **X** and Player **O**.
- **Real-Time Turn Indicator**: Dynamic status message showing current player turn, winner announcements, and tie game notifications.
- **Accurate Win Detection**: Identifies all 8 winning lines (3 horizontal, 3 vertical, 2 diagonal) and highlights the winning sequence with smooth green pulse animations.
- **Draw / Tie Handling**: Accurately detects draw states when all 9 squares are filled with no winner.
- **State Protection**: Prevents moves on already occupied cells and locks the board as soon as a game ends.
- **Instant Restart**: Dedicated "New Game" button appears upon game completion to reset board state, clear highlights, and restart seamlessly.
- **Accessibility & Keyboard Support**:
  - Semantic HTML grid cells using native `<button>` elements.
  - Full keyboard navigation: focus cells with `Tab` and activate moves using `Enter` or `Space`.
  - Accessible ARIA labels and live status announcements (`role="status"`, `aria-live="polite"`).
- **Responsive Glassmorphism Design**:
  - Centered layout built with modern CSS Flexbox and Grid.
  - Backdrop blur filter and frosted-glass cards.
  - Fully responsive across desktop, tablet, and mobile screens (including Apple Silicon M1/M2/M3 MacBooks, iPhone, Android, and Windows).
- **Comprehensive Automated Test Suite**: 15 unit and integration tests covering board initialization, turn alternation, winning combinations, draw detection, state protection, and keyboard interaction.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic markup, ARIA accessibility attributes, and metadata.
- **CSS3**: Modern Flexbox, Grid, glassmorphism (`backdrop-filter`), CSS animations, and media queries.
- **JavaScript (ES6+)**: Pure, modular game logic and event-driven architecture.
- **Vite**: Modern front-end build tool and lightning-fast local development server.
- **Vitest & JSDOM**: Automated unit and integration testing environment.
- **Node.js**: Cross-platform static server fallback (`server.js`).

---

## 📋 Prerequisites

Before running this project locally, ensure you have:

- **Node.js** (v18.x, v20.x, or v22+ recommended)
- **npm** (bundled with Node.js) or **yarn** / **pnpm**
- A modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari)

> **Note for Apple Silicon (M1/M2/M3) users**: Node.js runs natively on Apple Silicon. No additional compilation tools or Rosetta 2 are required.

---

## 🚀 Installation & Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ticktacktoe.git
cd ticktacktoe
```

### 2. Install dependencies

```bash
npm install
```

---

## 💻 Running the Application Locally

You have multiple convenient ways to run the application:

### Option A: Using the built-in Node server (Zero configuration)

```bash
npm start
```
The server will start at `http://localhost:3000`. Open this URL in your web browser.

### Option B: Using Vite Development Server (with Hot Module Replacement)

```bash
npm run dev
```
Vite will start a local server at `http://localhost:5173`.

### Option C: Direct Browser Opening (No Node server required)

You can also directly open `index.html` in your web browser of choice:
- **macOS**: `open index.html`
- **Windows**: `start index.html`
- **Linux**: `xdg-open index.html`

---

## 🧪 Testing & Quality Assurance

Run the automated test suite with Vitest:

```bash
npm test
```

To run tests in watch mode during development:

```bash
npm run test:watch
```

### What the test suite covers:

1. Initial board rendering with 9 empty cells, player indicator, and hidden reset button.
2. Valid move placement and alternating turns between Player X and Player O.
3. Prevention of invalid moves on already occupied cells.
4. Detection of Row 1 winning line (`[0, 1, 2]`).
5. Detection of Row 2 winning line (`[3, 4, 5]`).
6. Detection of Row 3 winning line (`[6, 7, 8]`).
7. Detection of Column 1 winning line (`[0, 3, 6]`).
8. Detection of Column 2 winning line (`[1, 4, 7]`).
9. Detection of Column 3 winning line (`[2, 5, 8]`).
10. Detection of Main Diagonal winning line (`[0, 4, 8]`).
11. Detection of Anti-Diagonal winning line (`[2, 4, 6]`) for Player O.
12. Accurate detection and handling of draw/tie games when the board is filled.
13. Prevention of subsequent moves once game over is reached.
14. Complete reset functionality via the "New Game" button.
15. Keyboard accessibility via `Enter` and `Space` keys.

---

## 📦 Building for Production

To create an optimized, minified production build:

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```
ticktacktoe-main/
├── assets/
│   ├── favicon.ico           # Application favicon icon
│   └── gradient-bg.jpg       # High-resolution glassmorphism background
├── tests/
│   └── tictactoe.test.js     # 15 Vitest & JSDOM automated tests
├── .env.example              # Example environment variable configuration
├── .gitignore                # Git ignore rules for dependencies and builds
├── index.html                # Semantic HTML5 entry point with ARIA labels
├── index.js                  # Core game logic, state management, and events
├── package.json              # Dependency manifest, scripts, and metadata
├── package-lock.json         # Pinned dependency lockfile
├── README.md                 # Project documentation and guide
├── server.js                 # Lightweight cross-platform Node.js HTTP server
├── styles.css                # Responsive glassmorphism styling and animations
└── vitest.config.mjs         # Vitest test configuration file
```

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages

1. Push your repository to GitHub.
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` (or `gh-pages`) and the root `/` folder (or build `dist` folder if deployed via GitHub Actions).
4. Click **Save**. Your site will be published at `https://<your-username>.github.io/<repo-name>/`.

### Deploy to Vercel or Netlify

1. Connect your GitHub repository to Vercel or Netlify.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Click **Deploy**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
