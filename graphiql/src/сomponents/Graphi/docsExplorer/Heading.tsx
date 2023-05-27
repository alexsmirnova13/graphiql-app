import { Accordion } from '@mantine/core';

const Heading = () => {
  return (
    <Accordion variant="separated" radius="xs" defaultValue="customization">
      <Accordion.Item value="customization">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default Heading;
