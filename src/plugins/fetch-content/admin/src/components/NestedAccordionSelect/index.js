/**
 *
 * Nested Accordion Auto
 *
 */

import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent, IconButton, SingleSelect, SingleSelectOption, Flex, Typography, Switch, TextInput } from '@strapi/design-system';
import NestedAccordion from '../NestedAccordion';
import MultiLevelSelect from '../MultiLevelSelect';
export default function NestedAccordionSelect({
  attr,
  filterComponent,
  filterContent,
  selectedContent,
  sendValue,
  parent
}) {
  const [selected, setSelected] = useState(null);
  const [component, setComponent] = useState(null);
  const [content, setContent] = useState(null);
  const [value, setValue] = useState(attr.value || null);
  const [related, setRelated] = useState(attr.related === undefined ? true : attr.related);




  useEffect(() => {
    // console.log('selected: ', selected);
    if (selected) {
      // console.log('value: ', value);
      // console.log('selected: ', selected);
      
      // console.log(`selected from parent ${parent.label} child ${attr.label}: `, selected);
      const data = prepareValue()
      // console.log('data: ', data);
      if (data) {
        // console.log('data: ', data);
        
        sendValue(data)
      }
    }

  }, [selected, related])
  
  useEffect(() => {
      // setfirstRun(false)
      // console.log('attr: ', attr)
      if (attr.type === "component") {
        if (attr.attributes) {
          setComponent(attr)
          // setComponent({...filterComponent(attr.component), ...attr})
        } else {
          setComponent({...attr, ...filterComponent(attr.component)})
        }
      } else if (attr.type === "relation") {
        if (attr.attributes) {
          setContent(attr)
          // setContent({...filterContent({uid: attr.targetModel}), ...attr})
        } else {
          setContent({...attr, ...filterContent({uid: attr.targetModel})})
        }
      }

  }, [])
  useEffect(() => {
    if (value) {
      // console.log(`${ attr?.label } parent: `, parent)
      // console.log(`${ value?.label } value: `, value)
      // console.log(`value: `, value);
      // parent.attributes[value.index] = value
      let child 
      // console.log(`parent: `, parent)
      
      // console.log(`child: `, child);
      // console.log(`selected: `, selected);

      if (parent.type === "component" || parent.type === "relation" || value.type === "component" || value.type === "relation") {
        parent.attributes[value.index] = value
        sendValue(parent)
  
      } else {
        child =  {...value, parentIndex: parent.index }
        sendValue(child)
      }



    }
    
  }, [value])
  
  const prepareValue = () => {
    // console.groupCollapsed(`preparing value: ${selected}, in attr: ${attr.label}, from: ${parent.label}:`)
    // console.log('attr: ', attr);
    // console.log('typeof selected: ', typeof selected);
    // if (attr.related !== related || attr.value !== selected) {
      
      attr.related = related
      attr.value = selected
      if (parent?.type === "component" || parent?.type === "relation") {
        // console.log('parent: ', parent);
          // console.log(`parent ${ parent.type }: `, parent);
          parent.attributes[attr.index] = attr
          // console.groupEnd()
          return parent
  
      }
      return {  ...attr, parentIndex: parent.index  }
    // }
    // if(parent.type === "relation") {
    //   console.log('parent: ', parent);
    //   // content.attributes[attr.index] = attr
    // }

    // if (attr.type === "relation") {
    //   console.log('content: ', content);
    //   content.attributes[prop.index] = prop
    //   attr.attributes[content.index] = content
    //   console.groupEnd()
    //   return {  ...content, parentIndex: parent.index  }
    // }
    // console.groupEnd()
  }


  // const setChild = (child) => {

  //   if (parent.type === "component" || parent.type === "relation" || child.type === "component" || child.type === "relation") {
  //     parent.attributes[child.index] = child
  //     return parent

  //   } else {
  //     return {...child, parentIndex: parent.index }
  //   }
  // }


  return <>
    {
      attr.type === "component"
        ? <NestedAccordion title={attr.label}>
            {
              component?.attributes?.map((innerAttr, j) => {
                return <NestedAccordionSelect
                  key={ `${component?.apiID}-attr${j}` }
                  attr={ {...innerAttr, index: j} }
                  parent={ { ...component, index: component.index, first: false } }
                  filterContent={ filterContent }
                  filterComponent={ filterComponent }
                  selectedContent={ selectedContent }
                  sendValue={ setValue }
                />
              })
            }
          </NestedAccordion>
        : (attr.type === "relation" && attr.label !== "createdBy" && attr.label !== "updatedBy")
          ? <NestedAccordion title={attr.label}>
              {
                content?.attributes?.map((innerAttr, j) => {
                  return <NestedAccordionSelect
                    key={ `${content?.label}-attr${j}` }
                    attr={ {...innerAttr, index: j} }
                    parent={ { ...content, index: content.index, first: false } }
                    filterContent={ filterContent }
                    filterComponent={ filterComponent }
                    selectedContent={ selectedContent }
                    sendValue={ setValue }
                  />
                })
              }
            </NestedAccordion>
          : ( attr.label !== "id" && attr.label !== "createdBy" && attr.label !== "updatedBy" )
            ? <Box borderColor="primary200" padding={1} borderRadius="4px">
                <Flex direction="row" width={64} justifyContent="space-between">
                  <Flex>
                    <Box paddingRight={1}>

                      <Typography variant="epsilon" paddingRight="8px">{attr.label}</Typography>
                    </Box>
                    <Box>

                    
                    <Typography paddingLeft="8px" variant="pi">type: {attr.type}</Typography>
                    </Box>
                  </Flex>
                  <Box>

                    <Switch onLabel='Related' offLabel = 'Manual' selected={related} onChange={() => setRelated(s => !s)} visibleLabels />;
                  </Box>

                  {/* <Typography>agregar valor</Typography> */}
                </Flex>
                
                {
                  related 
                  ? <Flex>
                      <MultiLevelSelect
                        showAttrTypes={['relation', 'component']}
                        allowedTypes={['relation', 'component', attr.type]}
                        value={attr.value}
                        label={`${selectedContent.apiID} attributes`}
                        onChange={setSelected}
                        attributes={selectedContent?.attributes}
                        filterContent={filterContent}
                        filterComponent={filterComponent}
                        parentResponse={attr.value}
                      />
                    </Flex>
                  : attr.type === "enumeration"
                    ? <SingleSelect onChange={e => setSelected([e])} value={attr.value[0]} label={attr.label} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables">
                        {
                          attr.enum.map((label, k) => <SingleSelectOption key={`contents-option-${k}`} value={label}>{label}</SingleSelectOption>)
                        }
                      </SingleSelect>
                    : <TextInput onChange={e => setSelected([e.target.value])} value={attr.value} label={attr.label} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables" />
  
                }
              </Box>
            : <></> 
    }
  </>
};

