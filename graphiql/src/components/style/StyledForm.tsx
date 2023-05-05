import styled from 'styled-components';

const StyledForm = styled.form<{ formHeigth: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 0 5px;
  border-radius: 5%;
  width: 420px;
  height: ${(props) => props.formHeigth};
  margin: 0 auto;
  padding: 10px;
  background-color: rgb(66, 66, 66);
  h3 {
    color: white;
    font-size: 2rem;
    text-align: center;
    margin: 1rem auto;
  }
  .button {
    padding: 0.5rem;
    border: 2px solid lightgray;
    background-color: transparent;
    border-radius: 8px;
    font-style: italic;
    color: white;
  }
  .input-field {
    display: flex;
    align-items: center;
    justify-content: end;
    width: 250px;
    font-size: 13px;
    padding: 6px 0 4px 10px;
    border: 1px solid lightgray;
    background-color: transparent;
    border-radius: 8px;
  }
  button:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
  }
  button: disabled {
    color: black;
    cursor: not-allowed;
    background-color: transparent;
  }
  label {
    color: white;
    font-weight: bold;
  }
  input:hover {
    cursor: pointer;
  }
  input {
    margin-left: 10px;
    margin-right: 2rem;
  }
  select {
    margin-left: 10px;
  }
  .error {
    font-size: 12px;
    color: red;
  }
`;

export default StyledForm;
