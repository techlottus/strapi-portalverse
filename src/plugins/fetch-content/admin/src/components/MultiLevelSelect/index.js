/**
 *
 * Multi Level Select
 *
 */

import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent, IconButton, SingleSelect, SingleSelectOption, Flex } from '@strapi/design-system';
import { Trash, Pencil } from "@strapi/icons";
export default function MultiLevelSelect({
  children,
  variant,
  value,
  required = true,
  label,
  attributes,
  filterContent,
  filterComponent

}) {
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [content, setContent] = useState(null);
  const [attribute, setAttribute] = useState(null);

  useEffect(() => {
    if (selectedContent) {
      const populatedAttribute = filterAttribute(selectedContent)
      const populatedContent = populatedAttribute.type === 'relation'
        ? filterContent({uid : populatedAttribute.targetModel})
        : filterComponent(populatedAttribute.component)
      
      console.groupCollapsed(`Multiselect ${label} selectedContent: ${selectedContent}`)
      console.log('attributes', attributes);
      console.log('attribute', filterAttribute(selectedContent));
      console.log('populatedAttribute', populatedAttribute);
      console.groupEnd()
      setAttribute(populatedAttribute)
      setContent(populatedContent)
    }
  }, [selectedContent])
  useEffect(() => {
    console.log('content: ', content);
  }, [content])

  useEffect(() => {
    if (selectedAttribute) {
      
      console.groupCollapsed(`Multiselect  selectedAttribute: ${selectedAttribute}`)
      console.log('attributes', attributes);
      console.log('selectedAttributes[selectedAttribute]', filterAttribute(selectedAttribute));
      console.groupEnd()
    }
  }, [selectedAttribute])
  const filterAttribute = (label) => {
    const attribute = attributes.filter(attr => attr.label === label)[0]
    console.log('attribute: ', attribute);
    return attribute
  } 
  return <>
      <SingleSelect width={4} padding={1} onChange={setSelectedContent} label={label} value={selectedContent} required={required} placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables">
        {
         attributes?.map((contentAttr, k) => <SingleSelectOption key={`contents-option-${k}`} value={contentAttr.label}>{contentAttr.label}</SingleSelectOption>)
        }
      </SingleSelect>
      {
        

        (attribute && content) && <>
          {
            
            (attribute?.type === "relation" || attribute?.type === "component")  && <>
              <MultiLevelSelect label={selectedContent} attributes={content.attributes} filterContent={filterContent} filterComponent={filterComponent}></MultiLevelSelect>

            </>
          }
        </>
      }
  </>
};

