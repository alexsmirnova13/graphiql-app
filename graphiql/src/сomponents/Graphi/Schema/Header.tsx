import { Button, Flex, Text } from '@mantine/core';
import { Trans } from 'react-i18next';
interface IHeaderProps {
  title: string;
  backButtonText?: string;
  onBackClick: () => void;
}

export const Header = ({ title, backButtonText, onBackClick }: IHeaderProps) => {
  return (
    <Flex direction={'row'} justify="space-between">
      {backButtonText && (
        <Button onClick={onBackClick}>
          <Trans i18nKey="docsExplorer.backSchema"></Trans> {backButtonText}
        </Button>
      )}
      <Text component="h1" size="xl" weight={700} color="blue">
        <Trans i18nKey={title}></Trans>
      </Text>
    </Flex>
  );
};
