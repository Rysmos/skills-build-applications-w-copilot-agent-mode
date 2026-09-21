import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Users() {
  const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/` : 'http://localhost:8000/api/users/'
  const [users, setUsers] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchEndpoint(usersEndpoint).then(setUsers).catch((reason) => setError(reason.message)) }, [usersEndpoint])
  return <CollectionPage eyebrow="Your community" title="Members" description="Know who is showing up and how they are growing.">{error ? <ErrorState message={error} /> : !users ? <LoadingState /> : <div className="member-grid">{users.map((user) => <article className="member-card" key={user.id}><span className="member-avatar">{user.name.split(' ').map((part) => part[0]).join('')}</span><div><h2>{user.name}</h2><p>{user.email}</p><span className="level-pill">{user.level}</span></div><strong>{user.team}</strong></article>)}</div>}</CollectionPage>
}