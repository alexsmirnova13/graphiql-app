import { Accordion, Button } from '@mantine/core';
import { getType } from '../getSchema';
import { useState } from 'react';
import { Item } from '../Heading';
import { useTranslation } from 'react-i18next';

const DocsItem = ({ description, name, type }: Item) => {
  const [schema, setSchema] = useState('');

  const submit = async () => {
    if (schema === '') {
      const response = await getType(itemName);
      setSchema(response);
      console.log(response);
    } else {
      setSchema('');
    }
  };
  const { t } = useTranslation();
  const itemName = name[0].toUpperCase() + name.slice(1);

  return (
    <Accordion.Item value={name}>
      <Accordion.Control>{itemName}</Accordion.Control>
      <Accordion.Panel>
        <p>
          {t('docs.description')} : {description}
        </p>
        <p>
          {t('docs.type')} : {type.kind}
        </p>
        {type.kind === 'OBJECT' && <Button onClick={() => submit()}>{t('')}</Button>}
        {schema && schema && JSON.stringify(schema)}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default DocsItem;
