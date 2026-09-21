import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="Suggested sessions" title="Workouts" description="The right session for wherever your energy is today.">{error ? <ErrorState message={error} /> : !workouts ? <LoadingState /> : <div className="workout-grid">{workouts.map((workout, index) => <article className={`workout-card workout-${index + 1}`} key={workout.id}><span className="workout-index">0{index + 1}</span><span className="difficulty">{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.focus} <span>/</span> {workout.duration} min</p><button type="button" className="text-button">View session ↗</button></article>)}</div>}</CollectionPage>
}