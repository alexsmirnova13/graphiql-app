import { FunctionComponent as FC, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Button, Flex, Box, useMantineTheme } from '@mantine/core';
import { THeandler } from './requestSection';
import { useTranslation } from 'react-i18next';
//import { androidstudio } from '@uiw/codemirror-theme-androidstudio';
//import { bbedit } from '@uiw/codemirror-theme-bbedit'; //! удалить если не зайдет

interface IEditor {
  code: string;
  setCode?: THeandler;
  name: string;
  closed?: boolean;
  codeH: number;
  readOnly?: boolean;
}

const Editor: FC<IEditor> = ({ code, setCode, name, closed, codeH, readOnly }) => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  const { t } = useTranslation();
  const openClose = closed ? () => setIsOpened((prevState) => !prevState) : () => {};
  const theme = useMantineTheme();
  //const codeTheme = theme.colorScheme === 'dark' ? androidstudio : bbedit; //? на выбор

  return (
    <>
      <Box w={'100%'}>
        <Button radius={0} w={'100%'} variant="light" onClick={openClose}>
          {t(`editor.${name}`)}
        </Button>
      </Box>
      {isOpened && (
        <Flex w="100%" h={codeH} direction={'column'}>
          <CodeMirror
            onChange={(value) => {
              setCode && setCode(value);
            }}
            extensions={[javascript()]}
            value={code}
            height={`${codeH}px`}
            width="100%"
            theme={theme.colorScheme}
            readOnly={readOnly}
          />
        </Flex>
      )}
    </>
  );
};

export default Editor;
