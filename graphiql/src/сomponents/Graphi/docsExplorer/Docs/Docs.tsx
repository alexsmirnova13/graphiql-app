import { Accordion } from '@mantine/core';
import DocsItem from './DocsItem';
import { Item } from '../DocsExplorer';

const Docs = ({ items }: { items: Item[] }) => {
  const Items = items.map((item) => <DocsItem {...item} key={item.name} />);

  return <Accordion>{Items}</Accordion>;
};

export default Docs;
