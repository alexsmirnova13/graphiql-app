import { Accordion, Button } from '@mantine/core';
import { getType } from '../getSchema';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TTypeItem, TypeSchema } from './DocsItem';

const TypeItem = ({ description, name, type }: TTypeItem) => {
  const { t } = useTranslation();
  const [schema, setSchema] = useState<TypeSchema | null>(null);

  if (type === null) {
    return (
      <Accordion.Item value="null">
        <Accordion.Control>null</Accordion.Control>
        <Accordion.Panel>
          <p>{t('docs.description')} : null</p>
        </Accordion.Panel>
      </Accordion.Item>
    );
  } else {
    const submit = async () => {
      if (schema === null) {
        const response = await getType(itemName);
        setSchema(response);
      } else {
        setSchema(null);
      }
    };
    const itemName = name[0].toUpperCase() + name.slice(1);
    const Items =
      schema &&
      (schema.data.__type !== null ? (
        schema.data.__type.fields.map((item) => <TypeItem {...item} key={item.name} />)
      ) : (
        <p>{t('docs.description')} : null</p>
      ));

    const isObj = type.kind === 'OBJECT' || type.kind === 'LIST';

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
          {isObj && (
            <Button onClick={() => submit()} variant="light" fullWidth radius={0}>
              {t('docs.fild')}: {itemName}
            </Button>
          )}

          {Items && <Accordion>{Items}</Accordion>}
        </Accordion.Panel>
      </Accordion.Item>
    );
  }
};

export default TypeItem;
