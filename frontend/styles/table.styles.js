import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const GestionWrapper = styled.div`
  padding: 20px;
  text-align: center;
  margin-top: 80px; /* Ajusta según la altura de tu navbar */
  
  h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #333;
  }
`;

export const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
    color: #333;
  }
  
  td {
    color: #666;
  }
  
  tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9; /* Fondo alternado estilo striped */
  }
`;

export const Boton = styled.button`
  background: none;
  color: ${props => (props.amarillo ? '#ffc107' : props.rojo ? '#dc3545' : '#007bff')};
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    color: ${props => (props.amarillo ? '#ffae00' : props.rojo ? '#c82333' : '#0056b3')};
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
`;

export const ModalHeader = styled.div`
    font-size: 24px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const ModalIcon = styled.div`
    font-size: 40px;
    color: #ffc107; /* Amarillo de advertencia */
    margin-bottom: 10px;
    animation: ${pulseAnimation} 1.5s infinite;
`;

export const ModalBody = styled.div`
    margin-top: 10px;
    font-size: 16px;
    color: black;
`;

export const ModalFooter = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
`;

export const ConfirmButton = styled.button`
    background: red;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background: darkred;
    }
`;

export const CancelButton = styled.button`
    background: grey;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background: darkgrey;
    }
`;

export const FiltroWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const FiltroInputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 50%;
`;

export const FiltroIcon = styled.div`
    position: absolute;
    left: 10px;
    font-size: 14px;
    color: #aaa;
`;

export const FiltroInput = styled.input`
    padding: 10px;
    padding-left: 30px; /* Espacio para el icono */
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 45%;
    color: black;
`;

export const SelectPaginacion = styled.select`
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    color: black;
`;

export const PaginacionWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        background: #fff;
        color: #fff;
        border: 1px solid transparent;
        padding: 10px 15px;
        margin: 0 5px;
        border-radius: 4px;
        cursor: pointer;
        
        &:hover {
            background: #0056b3;
            color: #fff;
            border-color: transparent;
        }

        &:focus {
            outline: none;
        }

        &.active {
            background: #007bff;
            color: #fff;
            border-color: transparent;
        }

        &.active:hover {
            background: #004289;
            border-color: #004289;
        }
    }
`;