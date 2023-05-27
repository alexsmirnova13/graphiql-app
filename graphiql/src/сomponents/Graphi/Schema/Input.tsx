import { ChangeEvent } from 'react';

interface IInputProps {
  placeHolder?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ placeHolder, value, onChange }: IInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input placeholder={placeHolder || 'Type here'} onChange={handleChange} value={value}></input>
  );
};
