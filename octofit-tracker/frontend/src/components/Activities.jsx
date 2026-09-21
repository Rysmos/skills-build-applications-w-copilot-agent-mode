import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, ErrorState, LoadingState } from './CollectionState.jsx'

export default function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="Movement log" title="Activities" description="Every effort adds up. Keep the rhythm going.">{error ? <ErrorState message={error} /> : !activities ? <LoadingState /> : <div className="data-table"><div className="table-head"><span>Activity</span><span>Duration</span><span>Points</span><span>Date</span></div>{activities.map((item) => <div className="table-row" key={item.id}><strong><span className={`activity-dot ${item.type}`} />{item.type}</strong><span>{item.duration} min</span><span className="points">+{item.points}</span><span>{item.date}</span></div>)}</div>}</CollectionPage>
}