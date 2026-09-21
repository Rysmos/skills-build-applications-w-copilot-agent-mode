const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  return payload?.items ?? payload?.data ?? payload?.results ?? []
}

export async function fetchEndpoint(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load API data (${response.status})`)
  return getItems(await response.json())
}

export async function fetchCollection(resource) {
  return fetchEndpoint(`${apiBaseUrl}/${resource}/`)
}