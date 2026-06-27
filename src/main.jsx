import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DATA_VERSION } from './constants/presetScores.js'

// ============================================================================
// DATA VERSIONING & CACHE INVALIDATION
// ============================================================================
// If the codebase data version has been bumped, we clear out the user's
// cached predictions so they can seamlessly inherit the latest official matches.
try {
  const currentVersion = localStorage.getItem('fifa2026_data_version');
  if (currentVersion !== DATA_VERSION) {
    console.log(`[Cache Invalidation] Version mismatch (${currentVersion} -> ${DATA_VERSION}). Resetting cache...`);
    localStorage.removeItem('fifa2026_groupMatches');
    localStorage.removeItem('fifa2026_koMatches');
    localStorage.setItem('fifa2026_data_version', DATA_VERSION);
  }
} catch (e) {
  console.error("Failed to process data versioning", e);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
