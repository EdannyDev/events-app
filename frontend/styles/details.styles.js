import styled from '@emotion/styled';

export const DetalleWrapper = styled.div`
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    color: black;
    text-align: center;
`;

export const Mapa = styled.div`
    height: 300px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 20px;
`;

export const BotonRegresar = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
    display: block;
    margin: 20px auto 0;
    &:hover {
        background-color: #0056b3;
    }
`;