/**
 *
 * APISelect
 *
 */

import React, { useEffect, useState } from 'react';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import {
  SingleSelect,
  SingleSelectOption,
  Loader,
  Box,
  Typography,
  Flex,
  TextButton,
  AccordionGroup,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  BaseButton,
  MultiSelect,
  MultiSelectOption
} from '@strapi/design-system';
import { useCMEditViewDataManager, getFetchClient  } from '@strapi/helper-plugin';
import { Plus, Component } from '@strapi/icons';
import NestedAccordionSelect from '../NestedAccordionSelect';
import NestedAccordion from '../NestedAccordion';

export default function APISelect({
  name,
  error,
  onChange,
  value = JSON.stringify({ content : null, components: [ ]}),
  intlLabel,
  attribute,
}) {

  const prefilledContent = value ?  JSON.parse(value) : null 
  // console.log('value: ', value);
  // console.log('prefilledContent: ', prefilledContent);
  const [loading, setLoading] = useState(false); 
  const [err, setErr] = useState(''); 
  const [disabled, toggleDisabled] = useState(false);
  const [contentTypes, setContentTypes] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedContent, setSelectedContent] = useState( prefilledContent ? prefilledContent?.content?.apiID : null);
  const [selectedComponents, setSelectedComponents] = useState(prefilledContent?.components || []);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedContents, setSelectedContents] = useState([]);
  
  const { modifiedData } = useCMEditViewDataManager()
  const { get } = getFetchClient();
  useEffect(() => {
    getcontentTypes()
    getComponents()
  }, [])
  // models = {
  //   programs: {
  //     contents : {
  //       values:{
  //         keys: []
  //       }
  //     }
  //   }
  // }
  // value = ['programs', 'contents', 'values', 'keys']
  // models[value[0]][value[1]][value[2]]
  // getvalue = (model, key) => {
  //   return model[key]
  // }
  useEffect(() => {
    console.log('modifiedData: ', modifiedData)
  }, [modifiedData])

  useEffect(() => {
    console.log('selectedContent: ', selectedContent);
    console.log('selectedComponents: ', selectedComponents);
    triggerChange()

  }, [selectedContent, selectedComponents])

  const patchSelectedComponents = (component) => {
    const newComponents = selectedComponents.map((selectedComponent, i) => {
      if (selectedComponent?.apiID === component.apiID) {
        console.log(component);
        return component
      }
      return selectedComponent
    })
    if (component) {
      setSelectedComponents(newComponents)
    }
  }
  const selectComponent = (apiID) => {
    const component = { ...components.filter(component => component?.apiID === apiID)[0], index: selectedComponents.length }
    if (component) {
      setSelectedComponents([...selectedComponents, component])
    }
  }
  const removeComponent = (apiID) => {
    const newComponents = selectedComponents.reduce((acc, curr) => {
      if (curr.apiID !== apiID) acc = [...acc, curr]
      return acc
    }, [])
    setSelectedComponents(newComponents)
  }
  const filterComponent = (uid) => {
    const component = components.filter(component => component.uid === uid)[0]
    return component
  }
  const filterSelectedComponents = (uid) => {
    const component = selectedComponents.filter(component => component.uid === uid)[0]
    return component
  }
  const filterContent = ({apiID = false, uid = false}) => {
    const content = apiID
      ? contentTypes?.filter(content => content?.apiID === apiID)[0]
      : contentTypes?.filter(content => content?.uid === uid)[0]

    return content
  }
  // const selectContents = (apiID) => {
  //   const content = filterContent({apiID})
  //   if (content) {
  //     setSelectedContents([ ,content])
  //   }
  //   onChange({ target: { name, value: JSON.stringify(content), type: attribute.type } })
  // }
  const triggerChange =() => {
    const value = {
      content: filterContent({apiID: selectedContent}) || (prefilledContent?.content || null),
      components: selectedComponents
    } 
    onChange({ target: { name, value: JSON.stringify(value), type: attribute.type } })
  }
  const getValue = ( propvalue ) => {
    console.log('propvalue:', propvalue);
    console.log('selectedComponents:', selectedComponents);
    if (propvalue)  {

      console.log('getValue API SELECT propvalue:', propvalue);
      const component = selectedComponents[propvalue?.parentIndex]
      const attributes = component.attributes
      if (attributes[propvalue?.index].type === propvalue.type) {
        
        attributes[propvalue?.index] =  propvalue
        component.attributes = attributes
        console.log('getValue API SELECT component:', component);
        const components = [ ...selectedComponents ]
        components[propvalue.parentIndex] = component
        console.log('getValue API SELECT components:', components);
        setSelectedComponents([])
        setSelectedComponents(components)
      }
      // onChange({ target: { name, value: JSON.stringify(value), type: attribute.type } })
      // const finalValue = {
      //   content: filterContent({apiID: selectedContent}) || (prefilledContent?.content || null),
      //   components: selectedComponents
      // } 
      // onChange({ target: { name, value: JSON.stringify(finalValue), type: attribute.type } })
    }
  }
  const parseContent = (content) => {
    console.groupCollapsed('parseContent: ', content.uid)
    console.log('content: ', content);
    console.log('typeof content.attributes: ', typeof content.attributes);
    const attrs = content.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => ({ ...attrs[key], label: key, value: []}))
    const parsedContent = { ...content, attributes}
    console.groupEnd()

    return parsedContent
  }
  const getcontentTypes = async () => {
    setLoading(true)
    try {
      const response = await get(`/content-manager/content-types/`);
      // console.log('response: ', response);
      const contents = response.data.data.reduce((acc, curr) => {
        if (curr.uid.includes('api::')) {
          const label = curr.apiID.split('-').map(([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`).join(' ')
          const content = parseContent({...curr, label, value: []})
          // console.log('content: ', content);
           acc = [...acc, content]
        }
        return acc
      }, [])

      setContentTypes(contents)
      setLoading(false)

    } catch (err) {
      setErr(err.message);
      setLoading(false)
    }
  }
  const parseComponent = (component) => {
    console.groupCollapsed('parseComponent: ', component.apiID)
    console.log('component: ', component);
    console.log('typeof component.attributes: ', typeof component.attributes);
    const attrs = component.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => {
      return { ...attrs[key], label: key, value: [], index: i }
    })
    const parsedComponent = { ...component, attributes, label: component?.apiID, value: [] }
    console.log('parsedComponent: ', parsedComponent);
    console.groupEnd('parseComponent')

    return parsedComponent
  }
  const getComponents = async () => {
    setLoading(true)
    try {
      const response = await get(`/content-manager/components/`);
      const components = response.data.data.reduce((acc, curr, i, arr) => {
        const component = parseComponent(curr)
          acc = [...acc, component]
        return acc
      }, [])

      setComponents(components)
      setLoading(false)
      return components
    } catch (err) {
      setErr(err.message);
      setLoading(false)
    }

  }

  return <>
    <Stack spacing={1}>
      {/* <p className='w-full bg-slate-500 text-white'>prueba tailwind</p> */}
      {
        (loading) && <Loader/>
      }
      {
        (!loading && contentTypes.length > 0) && <>
          <SingleSelect onChange={setSelectedContent} label={intlLabel.defaultMessage} value={selectedContent} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables" error={error} disabled={disabled}>
            {
              contentTypes?.map((content, i) => <SingleSelectOption key={`contents-option-${i}`} value={content.apiID}>{content.label}</SingleSelectOption>)
            }
          </SingleSelect>
          {/* <MultiSelect label="Fruits" required placeholder="My favourite fruit is..." onClear={() => {
              setSelectedContents([]);
            }} value={selectedContents} onChange={setSelectedContents}
            withTags
          >
            {
              contentTypes.map((content, i) => <MultiSelectOption key={`contents-option-${i}`} value={content.apiID}>{content.label}</MultiSelectOption>)
            }
          </MultiSelect>; */}
          
          <AccordionGroup
            footer={
              <Flex justifyContent="center" height="48px" background="neutral140">
                <TextButton startIcon={<Plus />} onClick={() => setIsModalVisible(prev => !prev)}>
                  Add a component
                </TextButton>
              </Flex>
            }
            label="sections" 
          >
            {
              selectedComponents.map((component, i) => {
                return <NestedAccordion title={component.info.displayName} handleDelete={() => removeComponent(component.apiID)}>
                  {
                     component.attributes?.map((attr, j) => {
                      return <NestedAccordionSelect
                        key={ `comp${i}-attr${j}` }
                        attr={ {...attr, index: j} }
                        filterContent={ filterContent }
                        filterComponent={ filterComponent }
                        selectedContent={ filterContent({ apiID: selectedContent }) }
                        sendValue={ getValue }
                        parent={{ ...component, index: i, first: true }}
                      />
                    })
                  }
                </NestedAccordion>
              })
            }
          </AccordionGroup>
          {
            isModalVisible && <ModalLayout onClose={() => setIsModalVisible(prev => !prev)} labelledBy="title">
              <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                  Title
                </Typography>
              </ModalHeader>
              <ModalBody>
                <Flex wrap="wrap">
                  {
                    components.map((component, i) => {
                        if (component.category === "sections") {
                          return <Box padding={2} key={i}>
                            <BaseButton size="S" variant="secondary" width="130px !important" height="130px !important" key={`components-option-${i}`} onClick={() => { selectComponent(component.apiID); setIsModalVisible(prev => !prev); }}>
                              <Flex direction="column" justifyContent="center" width="100%">
                                {/* <Icon as={Component} width="40px" height="40px" /> */}
                                <Component width="40px" height="40px" />
                                <Typography fontSize={1}>{component.info.displayName}</Typography>
                              </Flex>
                            </BaseButton>
                          </Box>
                        } else {
                          return <></>
                        }
                    })
                  }
                </Flex>
              </ModalBody>
              <ModalFooter endActions={
                  <Button onClick={() => setIsModalVisible(prev => !prev)} variant="tertiary">
                    Cancel
                  </Button>
                }
              />
            </ModalLayout>
          }
        </>
      }
    </Stack>
  </>
};
