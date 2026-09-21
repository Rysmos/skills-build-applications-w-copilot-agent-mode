import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Leaderboard() {
  const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/` : 'http://localhost:8000/api/leaderboard/'
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchEndpoint(leaderboardEndpoint).then(setEntries).catch((reason) => setError(reason.message)) }, [leaderboardEndpoint])
  return <CollectionPage eyebrow="Friendly competition" title="Leaderboard" description="A little pressure makes the progress sweeter.">{error ? <ErrorState message={error} /> : !entries ? <LoadingState /> : <div className="leaderboard-list">{entries.map((entry, index) => <div className={`leader-row rank-${index + 1}`} key={entry.id}><span className="rank">0{index + 1}</span><span className="leader-avatar">{entry.name.split(' ').map((part) => part[0]).join('')}</span><div className="leader-name"><strong>{entry.name}</strong><small>{entry.team}</small></div><span className="leader-streak">{entry.streak} day streak</span><strong className="leader-points">{entry.points.toLocaleString()} <small>pts</small></strong></div>)}</div>}</CollectionPage>
}