import { ChangeEvent } from 'react';
import { Input as MantineInput } from '@mantine/core';

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
    <MantineInput
      style={{ padding: '30px 0' }}
      placeholder={placeHolder || 'Type here'}
      onChange={handleChange}
      value={value}
    ></MantineInput>
  );
};
