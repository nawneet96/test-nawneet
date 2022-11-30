import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background: #000;
    gap: 2em;
`

export const Button = styled.button`
    border-radius: 20px;
    height: 50px;
    width: 100px;
    border: none;
    background-color: #c4fa9e;
    color: #696985;
    cursor: pointer;
`

export const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0 5em;
    gap: 5em;
`