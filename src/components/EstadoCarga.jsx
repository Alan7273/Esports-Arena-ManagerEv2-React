import { Alert, Spinner } from 'react-bootstrap'

export default function EstadoCarga({ cargando, error }) {
  if (cargando) return <div className="text-center my-5"><Spinner animation="border" /></div>
  if (error) return <Alert variant="danger">{error}</Alert>
  return null
}