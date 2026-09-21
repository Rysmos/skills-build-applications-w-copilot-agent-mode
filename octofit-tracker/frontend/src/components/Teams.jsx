import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Teams() {
  const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/` : 'http://localhost:8000/api/teams/'
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchEndpoint(teamsEndpoint).then(setTeams).catch((reason) => setError(reason.message)) }, [teamsEndpoint])
  return <CollectionPage eyebrow="Collective energy" title="Teams" description="Find your people. Push a little further together.">{error ? <ErrorState message={error} /> : !teams ? <LoadingState /> : <div className="team-grid">{teams.map((team, index) => <article className={`team-card team-${index + 1}`} key={team.id}><div className="team-card-top"><span className="team-number">0{index + 1}</span><span className="team-arrow">↗</span></div><h2>{team.name}</h2><div className="member-stack">{team.members.map((member) => <span key={member} title={member}>{member.split(' ').map((part) => part[0]).join('')}</span>)}</div><p>{team.members.length} active members</p><strong>{team.points.toLocaleString()} <small>team points</small></strong></article>)}</div>}</CollectionPage>
}