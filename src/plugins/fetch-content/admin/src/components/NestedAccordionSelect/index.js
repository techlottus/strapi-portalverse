/**
 *
 * Nested Accordion Auto
 *
 */

import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionToggle, AccordionContent, IconButton, SingleSelect, SingleSelectOption, Flex, Typography } from '@strapi/design-system';
import NestedAccordion from '../NestedAccordion';
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
  const [value, setValue] = useState(null);
  useEffect(() => {
    // console.log('selectedContent: ', selectedContent);
    if (selected) {
      
      console.log(`selected from parent ${parent.label} child ${attr.label}: `, selected);
      const data = prepareValue()
      console.log('data: ', data);

      sendValue(data)
    }

  }, [selected])
  
  useEffect(() => {
    console.log('attr: ', attr)
    if (attr.type === "component") {
      setComponent({...attr, ...filterComponent(attr.component)})
      if (attr.attributes) {
        setComponent(attr)
        // setComponent({...filterComponent(attr.component), ...attr})
      } else {
      }
    } else if (attr.type === "relation") {
      setContent({...attr, ...filterContent({uid: attr.targetModel})})
      if (attr.attributes) {
        setContent(attr)
        // setContent({...filterContent({uid: attr.targetModel}), ...attr})
      } else {
      }
    }

  }, [attr])
  useEffect(() => {
    if (value) {
      // console.log(`${ attr?.label } parent: `, parent)
      // console.log(`${ value?.label } value: `, value)
      console.log(`value: `, value);
      // parent.attributes[value.index] = value
      const child = setChild(value)
      console.log(`parent: `, parent)
      
      console.log(`child: `, child);
      console.log(`selected: `, selected);
      
      if ( parent.first ) {
        sendValue({  ...child, parentIndex: parent.index  })

      } else {

        sendValue(parent)
      }
    }
    
  }, [value])
  
  const prepareValue = () => {
    console.groupCollapsed(`preparing value: ${value}, in attr: ${attr.label}, from: ${parent.label}:`)
    console.log('attr: ', attr);
    attr.value = [selected]
    console.log('parent: ', parent);
    // parent.attributes[attr.index] = attr
    if (parent.type === "component" || parent.type === "relation") {
        console.log(`parent ${ parent.type }: `, parent);
        parent.attributes[attr.index] = attr
        console.groupEnd()
        return parent

    }
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
    console.groupEnd()
    // attr.attributes[prop.index] = prop
    return {  ...attr, parentIndex: parent.index  }
    // console.log(response)
    return response
  }


  const setChild = (child) => {

    if (parent.type === "component" || parent.type === "relation" || child.type === "component" || child.type === "relation") {
      parent.attributes[child.index] = child
      return child

    } else {
      return {...child, parentIndex: parent.index }
    }
  }


  return <>
    {
      attr.type === "component"
        ? <NestedAccordion title={attr.label}>
            {
              component?.attributes?.map((innerAttr, j) => {
                return <NestedAccordionSelect
                  key={ `${component?.apiID}-attr${j}` }
                  attr={ {...innerAttr, index: j} }
                  parent={ { ...component, index: component.index } }
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
                    parent={ { ...content, index: content.index } }
                    filterContent={ filterContent }
                    filterComponent={ filterComponent }
                    selectedContent={ selectedContent }
                    sendValue={ setValue }
                  />
                })
              }
            </NestedAccordion>
        // : attr.type === "enumeration"
        //   ? <SingleSelect onChange={setSelected} value={selected} key={j} label={attr.label} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables">
        //       {
        //         attr.enum.map((label, k) => <SingleSelectOption key={`contents-option-${k}`} value={label}>{label}</SingleSelectOption>)
        //       }
        //     </SingleSelect>
          : ( attr.label !== "id" && attr.label !== "createdBy" && attr.label !== "updatedBy" )
            ?
              // <>
              //   <Typography>{attr.label}</Typography>
              //   <Flex>
              //     <MultiLevelSelect key={j} label={selectedContent.label} attributes={filterContent({apiID:selectedContent})?.attributes} filterContent={filterContent} filterComponent={filterComponent}></MultiLevelSelect>
              //   </Flex>
              // </>
              <SingleSelect
                onChange={setSelected}
                value={attr.value[0]}
                label={attr.label}
              >
                {
                  selectedContent?.attributes?.map((contentAttr, k) => <SingleSelectOption key={`contents-option-${k}`} value={contentAttr.label}>{contentAttr.label}</SingleSelectOption>)
                }
              </SingleSelect>
            : <></> 
    }
  </>
};

