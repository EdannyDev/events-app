import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faEnvelope, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { 
  RegisterContainer, 
  RegisterForm, 
  FormTitle, 
  InputContainer, 
  FormInput, 
  Icon, 
  FormButton, 
  FormLink,
  TogglePasswordButton 
} from '../frontend/styles/register.styles';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/usuarios/registro', { nombre, email, password });
      console.log('Usuario registrado:', res.data);
      router.push('/login'); // Redirecciona a la página de login después del registro exitoso
    } catch (err) {
      console.error('Error al registrar usuario:', err);
      alert('Error al registrar usuario');
    }
  };  

  const handleLoginRedirect = () => {
    router.push('/login'); // Redirecciona a la página de login
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleRegister}>
        <FormTitle>Registro de Usuario</FormTitle>
        <InputContainer>
          <Icon icon={faUser} />
          <FormInput 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </InputContainer>
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
        <FormButton type="submit">Registrar</FormButton>
        <FormLink onClick={handleLoginRedirect}>¿Ya tienes cuenta? Inicia sesión aquí</FormLink>
      </RegisterForm>
    </RegisterContainer>
  );
}