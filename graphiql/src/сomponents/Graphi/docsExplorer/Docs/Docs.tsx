import { Accordion } from '@mantine/core';
import { Item } from '../Heading';
import DocsItem from './DocsItem';

const Docs = ({ items }: { items: Item[] }) => {
  console.log(items);
  const Items = items.map((item) => <DocsItem {...item} key={item.name} />);

  return <Accordion>{Items}</Accordion>;
};

export default Docs;
