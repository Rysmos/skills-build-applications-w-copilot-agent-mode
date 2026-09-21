import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { to: '/', label: 'Overview', icon: '◈', end: true },
  { to: '/activities', label: 'Activities', icon: '↗' },
  { to: '/leaderboard', label: 'Leaderboard', icon: '✦' },
  { to: '/teams', label: 'Teams', icon: '⌁' },
  { to: '/users', label: 'Members', icon: '◎' },
  { to: '/workouts', label: 'Workouts', icon: '▣' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="hero-copy">
        <p className="eyebrow">Training intelligence / 09.21.26</p>
        <h1>Make today<br /><em>count.</em></h1>
        <p className="hero-description">One clear view of your team&apos;s movement, momentum, and next best effort.</p>
        <NavLink className="primary-button" to="/activities">Log an activity <span>↗</span></NavLink>
      </div>
      <div className="overview-mark" aria-hidden="true"><span>O</span><small>FIT</small></div>
      <div className="overview-grid">
        <article className="metric-card coral-card"><span className="metric-label">Team pulse</span><strong>84%</strong><p>+12% from last week</p><span className="sparkline">⌁⌁⌁⌁</span></article>
        <article className="metric-card ink-card"><span className="metric-label">Active streak</span><strong>12 <small>days</small></strong><p>Top performer: Ava T.</p><span className="metric-icon">✦</span></article>
        <article className="quote-card"><p>&quot;Consistency is a superpower.&quot;</p><span>— Octofit principle 01</span></article>
      </div>
    </section>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Octofit home"><img src="/octofitapp-small.png" alt="" /><span>octofit<span>.</span></span></NavLink>
        <div className="side-rule" />
        <nav aria-label="Primary navigation">
          <p className="nav-caption">Workspace</p>
          {navigation.map((item) => <NavLink key={item.to} to={item.to} end={item.end} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}><span className="nav-icon">{item.icon}</span>{item.label}</NavLink>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot" /> API connected <small>v1.0</small></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><div><p className="topbar-kicker">OCTOFIT TRACKER</p><p className="topbar-title">The daily dashboard</p></div><div className="profile-chip"><span className="avatar">AT</span><span>Ava Thompson</span><span className="chevron">⌄</span></div></header>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
