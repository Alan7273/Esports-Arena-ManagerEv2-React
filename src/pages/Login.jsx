import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Alert, Card } from 'react-bootstrap'
import useAuth from '../hooks/useAuth'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.desde?.pathname ?? '/' // vuelve a donde quería ir

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setCargando(true)
    try {
      await login(username, password)
      navigate(destino, { replace: true })
    } catch (err) {
      setError(err.message || 'Credenciales inválidas')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title>Iniciar sesión</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={enviar}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit" disabled={cargando} className="w-100">
            {cargando ? 'Ingresando...' : 'Entrar'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}