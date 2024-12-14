import styled from '@emotion/styled';

export const EditarEventoForm = styled.form`
    max-width: 600px;
    margin: 100px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #333;
`;

export const FormTitle = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const FormInput = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 4px;
    font-size: 16px;

    &:last-of-type {
        margin-bottom: 20px;
    }
`;

export const FormSelect = styled.select`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #333;
    border-radius: 4px;
    font-size: 16px;
`;

export const FormButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;