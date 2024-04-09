/**
 *
 * Multi Level Select
 *
 */

import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent, IconButton, SingleSelect, SingleSelectOption, Flex, Typography } from '@strapi/design-system';
import { Trash, Pencil } from "@strapi/icons";
export default function MultiLevelSelect({
  value,
  required = true,
  label,
  attributes,
  filterContent,
  filterComponent,
  level = 0,
  onChange,
  parentResponse = [],
  allowedTypes = [],
  showAttrTypes = []

}) {
  const [selectedContent, setSelectedContent] = useState(value ? value[level] : null);
  const [selectedAttribute, setSelectedAttribute] = useState(value ? value[level + 1]  : null);
  const [attribute, setAttribute] = useState(value ? attributes?.filter(attr => attr.label === value[level])[0] : null);
  const [content, setContent] = useState( attribute?.component ? filterComponent(attribute?.component) : attribute?.targetModel ? filterContent({uid : attribute?.targetModel}): attribute);
  const [filteredAttributes, setFilteredAttributes] = useState(attributes);
  const [type, setType] = useState(null);
  const [response, setResponse] = useState(parentResponse);
  useEffect(() => {
    // debugger
  }, [selectedContent, selectedAttribute])


  useEffect(() => {
    if (selectedContent) {
      const populatedAttribute = filterAttribute(selectedContent)
      if (populatedAttribute) {
        setAttribute(populatedAttribute)

        const populatedContent = populatedAttribute.type === 'relation'
          ? filterContent({uid : populatedAttribute.targetModel})
          : populatedAttribute.type === 'component'
            ? filterComponent(populatedAttribute.component)
            : populatedAttribute

        setContent(populatedContent)
        setType(populatedContent.type)
        
        // console.groupCollapsed(`Multiselect ${label} selectedContent: ${selectedContent}`)
        //   console.log('attributes', attributes);
          // console.log('attribute', filterAttribute(selectedContent));
          // console.log('populatedAttribute', populatedAttribute);
          // console.log('value: ', value);
          // console.log('level: ', level);
          // console.log('value[level]: ', value[level]);
          let newResponse = [...value]
          // console.log('response: ', response);
          
          // console.log('selectedContent: ', selectedContent);
          // console.log('newResponse instanceof Array: ', newResponse instanceof Array);
          // console.log('selectedContent instanceof Array: ', selectedContent instanceof Array);
          if (level === 0) {
            // newResponse.splice(level)
            // setAttribute(null)
            // const hasAttr = newResponse[level] === selectedContent
            // console.log('hasAttr: ', hasAttr);
            // if (!hasAttr) {
            newResponse = [selectedContent]
            // }
            // setResponse([...newResponse])
            // setResponse([selectedContent])
          } else {
            // newResponse.splice(level)
            newResponse[level] = selectedContent
            // newResponse = selectedContent
          }
          setResponse([...newResponse])
        //   console.log('level ' + level + ' newResponse: ', newResponse);
        // console.groupEnd()
      }
    }
  }, [selectedContent])
  useEffect(() => {
    // console.log('attributes: ', attributes);
    const attrs = filterAttributesByParentType()
    // console.log('attrs: ', attrs);
    setFilteredAttributes(attrs)
  }, [attributes])
  useEffect(() => {
    // console.log('response: ', response);
    // console.log('level: ', level);
    onChange(response)
  }, [response])

  useEffect(() => {
    if (selectedAttribute) {
      
      // console.groupCollapsed(`Multiselect  selectedAttribute: ${selectedAttribute}`)
      // console.log('selectedAttribute', selectedAttribute);
      // console.log('selectedAttribute instanceof Array', selectedAttribute instanceof Array);

      let newResponse = [...response]
      if (selectedAttribute instanceof Array) {
        // console.log('response: ', response);
        setResponse([...selectedAttribute])
        
        // const hasAttr = newResponse[level + 1] === selectedAttribute[level + 1]
        // console.log('hasAttr', hasAttr);
        // debugger
        // if (!hasAttr) {
        //   // console.log('newResponse: ', newResponse);
        //   // setResponse([...newResponse, selectedAttribute])
        // }
      } else {
        // const newAttrResponse = newResponse.reduce((acc,key, i) => {
        // console.log('newResponse: ', newResponse);
        // console.log('newResponse[level + 1]: ', newResponse[level + 1]);
        // console.log('selectedAttribute', selectedAttribute);

        const hasAttr = newResponse[level + 1] === selectedAttribute
        // console.log('hasAttr', hasAttr);
        // debugger
        if (!hasAttr) {
          
          // console.log('response: ', response);
          // console.log('newResponse: ', newResponse);
          // console.log('newResponse: ', newResponse);
          // newResponse.splice(level + 1)
          // console.log('newResponse: ', newResponse);
          
          // newResponse = selectedAttribute
          newResponse[level + 1] = selectedAttribute

          setResponse([...newResponse])

          // console.log('newResponse: ', newResponse);
          // setResponse([...newResponse, selectedAttribute])
        }
        
      }
      
      console.groupEnd()
    }
  }, [selectedAttribute])
  const filterAttribute = (label) => {
    const attribute = attributes.filter(attr => attr.label === label)[0]
    // console.log('attribute: ', attribute);
    return attribute
  }
  const filterAttributesByParentType = (types = []) => {
    // console.log('allowedTypes: ', allowedTypes);
    // console.log('allowedTypes.includes[*]: ', allowedTypes.includes('*'));
    if (allowedTypes.includes('*')) {
      return attributes
    } else {
      const innerTypes = [...allowedTypes]
      // console.log('attributes: ', attributes);
      // console.log('allowedTypes: ', allowedTypes);
      const attrs = attributes.filter(attr => [...innerTypes,...types].includes(attr.type))
      // console.log('attrs: ', attrs);
      return attrs

    }
  }
  return <Flex paddingRight={1}>
      <Flex direction="column">
        <Box paddingRight={2}>
          <SingleSelect width={4} onChange={setSelectedContent} label={label} value={selectedContent || value[level]} required={required} placeholder="Select an attribute to relate">
            {
              filteredAttributes.map((contentAttr, k) => {
                return <SingleSelectOption key={`contents-option-${k}`} value={contentAttr.label}>{contentAttr.label}</SingleSelectOption>
              })
            }
          </SingleSelect>
          <Typography variant="pi">{type ? type: (filteredAttributes && filteredAttributes.length > 0) ? "select an attribute" : "cant select an attribute" }</Typography>

        </Box>
      </Flex>
      
      {
        content &&
        ((attribute?.type === "relation" && showAttrTypes.includes('relation')) || (attribute?.type === "component" && showAttrTypes.includes('component')))  && <>
          <MultiLevelSelect
            showAttrTypes={showAttrTypes}
            allowedTypes={allowedTypes}
            parentResponse={response}
            onChange={setSelectedAttribute}
            value={value}
            level={level + 1}
            label={`${attribute.label} attributes`}
            attributes={content.attributes}
            filterContent={filterContent}
            filterComponent={filterComponent}
          />
        </>
      }
  </Flex>
};

