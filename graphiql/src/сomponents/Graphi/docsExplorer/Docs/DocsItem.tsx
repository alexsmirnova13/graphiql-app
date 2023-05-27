import { Accordion, Box, Button } from '@mantine/core';
import { getType } from '../getSchema';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TypeItem from './TypeDescription';
import { Item } from '../DocsExplorer';

export type TTypeItem = {
  description: string;
  name: 'string';
  type: {
    description: string;
    name: string;
    kind: string;
  };
};
export interface TypeSchema {
  data: {
    __type: {
      fields: TTypeItem[];
    } | null;
  };
}

const DocsItem = ({ description, name, type }: Item) => {
  const [schema, setSchema] = useState<TypeSchema | null>(null);
  const submit = async () => {
    if (schema === null) {
      const response = await getType(itemName);
      setSchema(response);
    } else {
      setSchema(null);
    }
  };
  const { t } = useTranslation();
  const itemName = name[0].toUpperCase() + name.slice(1);

  const Items =
    schema &&
    schema.data.__type !== null &&
    schema.data.__type.fields.map((item) => <TypeItem {...item} key={item.name} />);

  const isObj = type.kind === 'OBJECT';

  return (
    <Accordion.Item value={name}>
      <Accordion.Control>{itemName}</Accordion.Control>
      <Accordion.Panel>
        <span>
          {t('docs.description')} : {description !== '' ? description : t('docs.nonDesc')}
        </span>
        <p>
          {t('docs.type')} : {type.kind}
        </p>
        {isObj && (
          <Box w={'100%'}>
            <Button onClick={() => submit()} variant="light" fullWidth radius={0}>
              {t('docs.fild')}: {itemName}
            </Button>
          </Box>
        )}

        {Items && <Accordion chevronPosition="left">{Items}</Accordion>}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default DocsItem;
