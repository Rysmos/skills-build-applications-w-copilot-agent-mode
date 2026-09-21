export function LoadingState() {
  return <div className="collection-state"><span className="loader" />Loading your data...</div>
}

export function ErrorState({ message }) {
  return <div className="collection-state error-state"><strong>Could not connect.</strong><span>{message}</span></div>
}

export function CollectionPage({ eyebrow, title, description, children }) {
  return <section className="collection-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-description">{description}</p></div><span className="page-stamp">LIVE<br />DATA</span></div>{children}</section>
}