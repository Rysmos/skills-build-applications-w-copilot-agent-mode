import { useEffect, useState } from 'react'
import { fetchEndpoint } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Workouts() {
  const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/` : 'http://localhost:8000/api/workouts/'
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchEndpoint(workoutsEndpoint).then(setWorkouts).catch((reason) => setError(reason.message)) }, [workoutsEndpoint])
  return <CollectionPage eyebrow="Suggested sessions" title="Workouts" description="The right session for wherever your energy is today.">{error ? <ErrorState message={error} /> : !workouts ? <LoadingState /> : <div className="workout-grid">{workouts.map((workout, index) => <article className={`workout-card workout-${index + 1}`} key={workout.id}><span className="workout-index">0{index + 1}</span><span className="difficulty">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.focus} <span>/</span> {workout.duration} min</p><button type="button" className="text-button">View session ↗</button></article>)}</div>}</CollectionPage>
}