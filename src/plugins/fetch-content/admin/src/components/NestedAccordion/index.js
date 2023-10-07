/**
 *
 * Nested Accordion
 *
 */

import React, { useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent } from '@strapi/design-system';

export default function NestedAccordion({
  children,
  variant,
  expand = false,
  title
}) {

  const [expanded, setExpanded] = useState(expand);

  return <Box padding={2}>
    <ul>
      <Accordion expanded={expanded} onToggle={() => setExpanded(s => !s)}  variant={variant}>
        <AccordionToggle title={title} />
        <AccordionContent>
          <Box padding={2}>
            {children}
          </Box>
        </AccordionContent>
      </Accordion>
    </ul>  
  </Box>
};

