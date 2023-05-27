import { Flex } from '@mantine/core';

interface IHeaderProps {
  title: string;
  backButtonText?: string;
  onBackClick: () => void;
  onCloseClick: () => void;
}

export const Header = ({ title, backButtonText, onBackClick, onCloseClick }: IHeaderProps) => {
  return (
    <Flex direction={'row'} justify="space-between">
      {backButtonText && <button onClick={onBackClick}>BACK {backButtonText}</button>}
      <span>{title}</span>
      <button onClick={onCloseClick}>X</button>
    </Flex>
  );
};
