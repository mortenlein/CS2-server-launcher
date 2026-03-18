import React, { useState } from 'react'
import anubisImg from './assets/anubis.jpg'
import mirageImg from './assets/mirage.png'
import infernoImg from './assets/inferno.png'
import ancientImg from './assets/ancient.png'
import nukeImg from './assets/nuke.png'
import dust2Img from './assets/dust2.png'
import overpassImg from './assets/overpass.png'
import customMapImg from './assets/custom_map.png'

const MODES = [
  { id: '1', name: 'Competitive', type: '0', mode: '1', desc: 'The ultimate 5v5 experience' },
  { id: '2', name: 'Wingman', type: '0', mode: '2', desc: 'Tactical 2v2 action' },
  { id: '3', name: 'Casual', type: '0', mode: '0', desc: 'Relaxed gameplay with friends' },
  { id: '4', name: 'Deathmatch', type: '1', mode: '2', desc: 'Fast-paced fragging' }
]

const MAPS = [
  { id: '1', name: 'Anubis', value: 'de_anubis', img: anubisImg },
  { id: '2', name: 'Ancient', value: 'de_ancient', img: ancientImg },
  { id: '3', name: 'Dust 2', value: 'de_dust2', img: dust2Img },
  { id: '4', name: 'Inferno', value: 'de_inferno', img: infernoImg },
  { id: '5', name: 'Mirage', value: 'de_mirage', img: mirageImg },
  { id: '6', name: 'Nuke', value: 'de_nuke', img: nukeImg },
  { id: '7', name: 'Overpass', value: 'de_overpass', img: overpassImg }
]

function App(): React.ReactElement {
  const [selectedMode, setSelectedMode] = useState(MODES[0])
  const [selectedMap, setSelectedMap] = useState(MAPS[0])
  const [customMap, setCustomMap] = useState('')
  const [exePath, setExePath] = useState('C:\\Program Files (x86)\\Steam\\steamapps\\common\\Counter-Strike Global Offensive\\game\\bin\\win64\\cs2.exe')
  const [isLaunching, setIsLaunching] = useState(false)
  const [isCustom, setIsCustom] = useState(false)

  // Modal State
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'error' | 'success' | 'info';
  }>({ show: false, title: '', message: '', type: 'info' })

  const showModal = (title: string, message: string, type: 'error' | 'success' | 'info' = 'info') => {
    setModal({ show: true, title, message, type })
  }

  const handleLaunch = async () => {
    setIsLaunching(true)
    try {
      const config = {
        exePath,
        gameType: selectedMode.type,
        gameMode: selectedMode.mode,
        map: isCustom ? customMap : selectedMap.value
      }
      const result = await window.api.launchServer(config)
      if (result.success) {
        showModal('Success', 'CS2 Server is launching in the background.', 'success')
      }
    } catch (err) {
      console.error(err)
      showModal('Launch Failed', 'Failed to launch server. Make sure you are running as Admin if first time.', 'error')
    } finally {
      setIsLaunching(false)
    }
  }

  return (
    <div className="dashboard">
      {/* Modal Overlay */}
      {modal.show && (
        <div className="modal-overlay" onClick={() => setModal({ ...modal, show: false })}>
          <div className={`modal-container ${modal.type}`} onClick={e => e.stopPropagation()}>
            <div className="modal-icon">
              {modal.type === 'error' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
              {modal.type === 'success' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
              {modal.type === 'info' && <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
            </div>
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <button className="modal-close-btn" onClick={() => setModal({ ...modal, show: false })}>
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Full-width Map Selection */}
      <section className="main-content">
        <div className="widget no-padding overflow-hidden">
          <div 
            className="map-hero" 
            style={{ backgroundImage: `url(${isCustom ? customMapImg : selectedMap.img})`, backgroundColor: isCustom ? '#16213e' : '' }}
          >
            <div className="map-hero-content">
              <span style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: '2px' }}>DISCOVER</span>
              <h2>{isCustom ? customMap || 'No Map Name' : selectedMap.name}</h2>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <span style={{ background: 'rgba(233, 69, 96, 0.4)', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>ACTIVE POOL</span>
              </div>
            </div>
          </div>

          <div className="map-selector-grid">
            {MAPS.map((map) => (
              <div
                key={map.id}
                className={`map-mini-card ${!isCustom && selectedMap.id === map.id ? 'selected' : ''}`}
                style={{ backgroundImage: `url(${map.img})` }}
                onClick={() => {
                  setSelectedMap(map)
                  setIsCustom(false)
                }}
              />
            ))}
            <div 
              className={`map-mini-card custom-btn ${isCustom ? 'selected' : ''}`}
              style={{ backgroundImage: `url(${customMapImg})` }}
              onClick={() => setIsCustom(true)}
            >
              <span>CUSTOM</span>
            </div>
          </div>
          {isCustom && (
            <div className="custom-map-input-container">
              <span className="widget-title" style={{ marginBottom: '8px' }}>Custom Map Name</span>
              <input
                className="path-input"
                placeholder="e.g. de_dust2"
                value={customMap}
                onChange={(e) => setCustomMap(e.target.value)}
              />
            </div>
          )}
        </div>
      </section>

      {/* Bottom Row - Controls */}
      <section className="controls-row" style={{ padding: '0 2rem' }}>
        {/* Game Mode */}
        <div className="widget">
          <span className="widget-title">Game Mode</span>
          <div className="modes-grid-compact">
            {MODES.map((mode) => (
              <div
                key={mode.id}
                className={`mode-card-compact ${selectedMode.id === mode.id ? 'selected' : ''}`}
                onClick={() => setSelectedMode(mode)}
              >
                <div style={{ fontWeight: 800 }}>{mode.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Status & Review */}
        <div className="widget" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="widget-title">Selection Status</span>
          <div className="stat-summary">
            <span style={{ color: 'var(--text-dim)' }}>Map:</span>
            <span style={{ fontWeight: 800, color: 'var(--accent-red)' }}>{isCustom ? customMap || 'Pending' : selectedMap.name}</span>
          </div>
          <div className="stat-summary">
            <span style={{ color: 'var(--text-dim)' }}>Mode:</span>
            <span style={{ fontWeight: 800 }}>{selectedMode.name}</span>
          </div>
        </div>

        {/* Path Configuration */}
        <div className="widget">
          <span className="widget-title">Global Settings</span>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>Server Executable (.exe)</div>
          <input
            className="path-input"
            value={exePath}
            onChange={(e) => setExePath(e.target.value)}
            placeholder="C:\...\cs2.exe"
          />
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button className="secondary-btn" onClick={async () => {
              try {
                const path = await window.api.selectExecutable();
                if (path) setExePath(path);
              } catch (e) {
                console.error('Browse error:', e);
                showModal('Browse Error', (e as Error).message, 'error');
              }
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              Browse
            </button>
            <button className="secondary-btn primary-style" onClick={async () => {
              try {
                const path = await window.api.detectExecutable();
                if (path) {
                  setExePath(path);
                  showModal('CS2 Found', `Executable located at: ${path}`, 'success');
                } else {
                  showModal('Not Found', "CS2 not found in common Steam locations. Please select manually.", 'error');
                }
              } catch (e) {
                console.error('Detect error:', e);
                showModal('Detection Error', (e as Error).message, 'error');
              }
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Auto-Detect
            </button>
          </div>
        </div>
      </section>

      {/* Full-width Launch Action */}
      <div className="launch-action-container">
        <button 
          className="launch-btn-big"
          disabled={isLaunching || (isCustom && !customMap)}
          onClick={handleLaunch}
        >
          {isLaunching ? 'Starting server...' : 'Launch Server'}
        </button>
      </div>

      {/* Decorative CUBES */}
      <div className="floating cube" style={{ top: '150px', left: '10%' }}></div>
      <div className="floating cube" style={{ top: '450px', right: '15%', animationDelay: '2s' }}></div>
      <div className="floating cube" style={{ bottom: '200px', left: '20%', animationDelay: '4s' }}></div>
    </div>
  )
}


export default App
