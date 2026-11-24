import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Card } from 'react-bootstrap'
import { registrarUsuario } from '../services/auth'

export default function Registro() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  const enviar = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden')
      return
    }

    setCargando(true)
    try {
      await registrarUsuario(username, password)
      navigate('/login')
    } catch (err) {
      setError(err.message || 'No se pudo crear la cuenta')
    } finally {
      setCargando(false)
    }
  }

  return (
    <Card className="mx-auto mt-5" style={{ maxWidth: 400 }}>
      <Card.Body>
        <Card.Title>Crear cuenta</Card.Title>
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
          <Form.Group className="mb-3">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} required />
          </Form.Group>
          <Button type="submit" disabled={cargando} className="w-100">
            {cargando ? 'Registrando...' : 'Registrarse'}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small className="text-secondary">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-decoration-none fw-semibold">
              Inicia sesión
            </Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  )
}