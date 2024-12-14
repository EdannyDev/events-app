import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

export const RegisterForm = styled.form`
  width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: black;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 35px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  caret-color: #333;
  color: #333;
`;

export const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 37px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 16px;
  outline: none;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

export const FormLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: black;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
`;