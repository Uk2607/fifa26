# FIFA 2026 World Cup Bracket Board & Standings Simulator

A highly dynamic, interactive, and mathematically rigorous React application built to simulate the FIFA 2026 World Cup. It features a fully interactive Group Stage dashboard, a Knockout Stage bracket, and an advanced Standings Simulator that mathematically predicts qualification and elimination.

## 🚀 Features
- **Live Group Standings:** Instantly updates table rankings based on official FIFA tiebreaker rules (Points > H2H Points > H2H GD > H2H GF > Overall GD > Overall GF > Fair Play > Alphabetical).
- **Advanced Q/E Simulator:** Uses brute-force algorithmic predictions to calculate every possible future outcome ($3^{\text{unplayed matches}}$ scenarios instantly). Accurately awards `(Q)` (Guaranteed Top 2) and `(E)` (Mathematically Eliminated) tags to teams based on their absolute best and worst possible rank ranges.
- **Deterministic Knockout Seeding:** Replicates official FIFA regulations (Annexe C) utilizing a pre-computed 495-combination lookup table to perfectly match the 8 best third-placed teams against their opponents without heuristic guesswork.
- **Interactive Knockout Bracket:** Fully dynamic visualization of the Round of 32 through to the Final, with dynamic borders matching team colors.
- **Dynamic Zoom Dashboard:** Fully responsive grid layout allowing users to zoom the dashboard between 1, 2, or 3 columns with buttery-smooth cross-fade "camera" animations.
- **High-Definition Vector Flags:** Dynamically integrated FlagCDN `.svg` vector graphics mapped natively to each team's ISO-2 country code for infinitely sharp resolutions across all devices.
- **Adaptive Mobile Layouts:** Intelligent mobile-first UI featuring responsive flip-card modals that dynamically evolve into side-by-side dashboards on larger tablets and desktops, while automatically ensuring horizontal fit on tiny screens.
- **Premium Aesthetics:** Dark mode, glassmorphism, dynamic split-gradients for match rows, and hovering aura effects.

## 📁 Project Structure
The application is built using React (Vite) and styled exclusively with Tailwind CSS.

- `src/components/`
  - `GroupStage/`: Components related to the Group Tables, Dashboard Tiles, and Open Matches.
  - `Knockout/`: Components that render the dynamic tournament bracket.
- `src/hooks/`
  - `useStandings.js`: The core mathematical engine. Contains the FIFA tiebreaker sorting algorithm and the highly advanced Brute-Force Q/E Simulator.
- `src/constants/`
  - `teams.js`: Contains all the official team data, color hex codes (for dynamic gradients).
  - `groups.js`: Contains the static groupings and match pairings (which team plays which team).
  - `presetScores.js`: Crucial configuration file used to lock specific match scores. If a match is marked as "locked" here, the score is mathematically cemented and the UI inputs for that match are disabled.
  - `FIFA_RANKINGS.js`: Contains the official FIFA World Rankings used as the ultimate tiebreaker in the Simulator if teams are deadlocked on all other metrics.
  - `combinations.js`: Auto-generated lookup dictionary of the 495 official FIFA third-place qualification combinations (12C8).
- `scripts/`
  - `parse_combinations.cjs`: Node script that parses the official FIFA `combinations.csv` data to generate the raw `combinations.js` dictionary without mapping to internal match IDs. Run via `npm run parse-combinations`.
  - `combinations.csv`: The official source data containing the mappings.
  - `matches.txt`: A scratchpad referencing old match dependencies.

## 🛠️ Local Development Setup

### 1. Create a new Vite project
```bash
npm create vite@latest [project-name] -- --template react
```

### 2. Enter the directory
```bash
cd [project-name]
```

### 3. Install dependencies
```bash
npm install
```

### 4. Install Tailwind CSS v4, PostCSS, and Lucide Icons
```bash
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install lucide-react
```

### 5. Create configuration files

#### Create `postcss.config.js`
```javascript
export default {
    plugins: {
        '@tailwindcss/postcss': {},
        autoprefixer: {},
    },
}
```

#### Create `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
```

### 6. Update `src/index.css`
Replace the content with:
```css
@import "tailwindcss";
```

### 7. Run the development server
```bash
npm run dev
```

## 🌐 Github Pages Deployment Steps

Follow these precise steps to deploy this Vite app to GitHub Pages.

1. **Install the `gh-pages` package:**
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Update `vite.config.js`:**
   Add the `base` property with your repository name.
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/[repo-name]/', // Replace [repo-name] with your actual GitHub repo name
   })
   ```

3. **Update `package.json`:**
   Add the homepage URL and deployment scripts.
   ```json
   {
     "name": "fifa-2026-board",
     "homepage": "https://[username].github.io/[repo-name]",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
       "preview": "vite preview",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
   *(Note: Replace `[username]` and `[repo-name]` with your GitHub details).*

4. **Deploy:**
   Run the deploy script. This will build the project and push the `dist` folder to the `gh-pages` branch.
   ```bash
   npm run deploy
   ```