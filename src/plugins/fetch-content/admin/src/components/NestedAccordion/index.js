/**
 *
 * Nested Accordion Auto
 *
 */

import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent, IconButton, SingleSelect, SingleSelectOption, Flex, Typography } from '@strapi/design-system';
import { Trash, Pencil } from "@strapi/icons";
import MultiLevelSelect from '../MultiLevelSelect';
export default function NestedAccordion({
  variant,
  expand = false,
  handleDelete,
  title,
  children
}) {

  const [expanded, setExpanded] = useState(expand);
  // const [selected, setSelected] = useState(null);
  // const [value, setValue] = useState(null);
  // console.log(`rendering nested accordion auto ${title}`);
  // useEffect(() => {
  //   console.log('selectedContent: ', selectedContent);
  //   console.log('uid: ', uid);
  //   console.log('filterComponent(uid): ', filterComponent(uid));
  //   console.log('selected: ', selected);
  //   if (!!sendValue) {

  //     sendValue(selected)
  //   }

  // }, [selected])

  // setSelected

  return <Accordion expanded={expanded} onToggle={() => setExpanded(s => !s)}  variant={variant}>
    {
      handleDelete
        ? <AccordionToggle title={title} action={<IconButton onClick={handleDelete} label="Delete" icon={<Trash />} />} />
        : <AccordionToggle title={title} />
    }
    <AccordionContent padding={2}>
      { children }
    </AccordionContent>
  </Accordion>
};

