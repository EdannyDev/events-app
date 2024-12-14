import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { 
  LoginContainer, 
  LoginForm, 
  FormTitle, 
  InputContainer, 
  FormInput, 
  Icon, 
  FormButton, 
  FormLink, 
  TogglePasswordButton 
} from '../frontend/styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/usuarios/login', { email, password });
      console.log('Datos recibidos:', res.data);
      const { token, userId } = res.data; // Obtener userId del response.data
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Guardar userId en localStorage
      router.push('/home'); // Redirecciona a la página de dashboard después del login
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Correo electrónico o contraseña incorrectos');
    }
  };  

  const handleRegisterRedirect = () => {
    router.push('/register'); // Redirecciona a la página de registro
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <FormTitle>Iniciar Sesión</FormTitle>
        <InputContainer>
          <Icon icon={faEnvelope} />
          <FormInput 
            type="email" 
            placeholder="Correo electrónico" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </InputContainer>
        <InputContainer>
          <Icon icon={faLock} />
          <FormInput 
            type={showPassword ? "text" : "password"} 
            placeholder="Contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <TogglePasswordButton onClick={togglePasswordVisibility} type="button">
            <Icon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordButton>
        </InputContainer>
        <FormButton type="submit">Iniciar Sesión</FormButton>
        <FormLink onClick={handleRegisterRedirect}>¿No tienes cuenta? Regístrate aquí</FormLink>
      </LoginForm>
    </LoginContainer>
  );
}