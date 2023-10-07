/**
 *
 * APISelect
 *
 */

import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { TextInput } from '@strapi/design-system/TextInput';
import { Stack } from '@strapi/design-system/Stack';
import { Button } from '@strapi/design-system/Button';
import { Textarea, SingleSelect, SingleSelectOption, Loader, Box, Accordion, AccordionToggle, AccordionContent, Typography } from '@strapi/design-system';
import { auth } from '@strapi/helper-plugin'
import { useCMEditViewDataManager, getFetchClient  } from '@strapi/helper-plugin';
import NestedAccordion from '../NestedAccordion';


export default function APISelect({
  name,
  error,
  description,
  onChange,
  value,
  intlLabel,
  attribute,
}) {
  const prefilledContent = value ?  JSON.parse(value) : null 
  console.log('value: ', value);
  console.log('prefilledContent: ', prefilledContent);
  const { formatMessage } = useIntl();
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false); 
  const [err, setErr] = useState(''); 
  const [disabled, toggleDisabled] = useState(false);
  const [contentTypes, setContentTypes] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedContent, setSelectedContent] = useState(prefilledContent);

  const { modifiedData } = useCMEditViewDataManager ()
  const [expandedContentID, setExpandedContentID] = useState(null);
  const handleToggleContent = (id) => () => {
    setExpandedContentID(s => s === id ? null : id);
    setExpandedContentID2(s => null);
    setExpandedContentID3(s => null);
  };
  const [expandedContentID2, setExpandedContentID2] = useState(null);
  const handleToggleContent2 = (id) => () => {
    setExpandedContentID2(s => s === id ? null : id);
    setExpandedContentID3(s => null);
  };
  const [expandedContentID3, setExpandedContentID3] = useState(null);
  const handleToggleContent3 = (id) => () => {
    setExpandedContentID3(s => s === id ? null : id);
  };
  const handleToggleComponent = (id) => () => {
    setExpandedComponentID(s => s === id ? null : id);
    setExpandedComponentID2(s => null);
    setExpandedComponentID3(s => null);
  };
  const [expandedComponentID2, setExpandedComponentID2] = useState(null);
  const handleToggleComponent2 = (id) => () => {
    setExpandedComponentID2(s => s === id ? null : id);
    setExpandedComponentID3(s => null);
  };
  const [expandedComponentID3, setExpandedComponentID3] = useState(null);
  const handleToggleComponent3 = (id) => () => {
    setExpandedComponentID3(s => s === id ? null : id);
  };

  const { get } = getFetchClient();
  
  useEffect(() => {

      console.log('modifiedData: ', modifiedData)

  }, [modifiedData])
  useEffect(async () => {
    // await getComponents()
    // console.log('components: ', components);
    await getcontentTypes()
    // console.log('contentTypes: ', contentTypes);
  }, [])
  useEffect(() => {
    console.log('contentTypes: ', contentTypes);
  }, [contentTypes])
  useEffect(() => {
    console.log('selectedContent: ', selectedContent);
    console.log('selectedContent?.attributes: ', selectedContent?.attributes);
  }, [selectedContent])

  const selectContent = (apiID) => {
    const content = contentTypes.filter(content => content.apiID === apiID)[0]
    if (content) {
      setSelectedContent(content)
    }
    onChange({ target: { name, value: JSON.stringify(content), type: attribute.type } })
  }

  const parseContent = (content, models, skip, componentList) => {
    // console.groupCollapsed('parseContent: ', content.uid)
    // console.log('content: ', content);
    // console.log('typeof content.attributes: ', typeof content.attributes);
    // console.log('componentList: ', componentList);
    const attrs = content.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => {
      if (attrs[key].type === "relation") {
        // console.log('key: ', key);
        // console.log('skip: ', skip);
        // console.log('attrs[key].targetModel: ', attrs[key].targetModel);
        // console.log('content.uid !== attrs[key].targetModel: ', content.uid !== attrs[key].targetModel);
        // console.log('skip !== attrs[key].targetModel: ', skip !== attrs[key].targetModel);
        if (content.uid !== attrs[key].targetModel && skip !== attrs[key].targetModel ) {
          const innerContent = models.filter(content => content.uid === attrs[key].targetModel)[0]
          // console.log('innerContent: ', innerContent);
          // console.groupCollapsed(`Parsing attributes ${i}`)
            const newInnerContent = parseContent(innerContent, models, content.uid, componentList)
            // console.log('newInnerContent: ', newInnerContent);
          // console.groupEnd()
          return { ...attrs[key], label: key, ...newInnerContent}
        }
        return { ...attrs[key], label: key}
      } else if (attrs[key].type === "component") {

        // console.groupCollapsed('component: ', attrs[key].component);
        // console.log('attrs[key]: ', attrs[key]);
        const innerComponent = componentList.filter(component => component.uid === attrs[key].component)[0]
        // console.log('innerComponent: ', innerComponent);
        // console.groupEnd()
        return { ...attrs[key], label: key, ...innerComponent}

      } else if (attrs[key].type === "dynamiczone") {

        // console.groupCollapsed('synamic zone: ', attrs[key].label);
        // console.log('attrs[key]: ', attrs[key]);
        // console.log('attrs[key].components: ', attrs[key].components);
        const innerComponents = attrs[key].components.map(comp => {
          
          const innerComponent = componentList.filter(component => component.uid === comp)[0]
          // console.log('innerComponent: ', innerComponent);
          return innerComponent
        })
        // console.log('innerComponents: ', innerComponents);
        // console.groupEnd()
        return { ...attrs[key], label: key, components: innerComponents}

      }
      return { ...attrs[key], label: key }
    })
    const parsedContent = { ...content, attributes}
    // console.groupEnd()

    return parsedContent
  }
  const getcontentTypes = async () => {
    const componentsResponse = await getComponents()
    setLoading(true)
    try {
      const response = await get(`/content-manager/content-types/`);
      // console.log('response: ', response);
      const models = response.data.data.reduce((acc, curr, i, arr) => {
        const { apiID, uid, attributes } = curr
        if (uid.includes('api::')) {
          const label = apiID.split('-').map(([first, ...rest]) => `${first.toUpperCase()}${rest.join('')}`).join(' ')
          const model = parseContent({apiID, uid, attributes, label}, arr, uid, componentsResponse)
          // console.log('model: ', model);
           acc = [...acc, model]
        }
        return acc
      }, [])

      setContentTypes(models)
      setLoading(false)

    } catch (err) {
      setErr(err.message);
      setLoading(false)
    }

  }
  const parseComponents = (component, components, skip) => {
    // console.groupCollapsed('parseComponent')
    // console.log('component: ', component);
    // console.log('typeof component.attributes: ', typeof component.attributes);
    const attrs = component.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => {
      // if (attrs[key].type === "relation") {
        // // console.log('key: ', key);
        // // console.log('skip: ', skip);
        // // console.log('attrs[key].targetModel: ', attrs[key].targetModel);
        // // console.log('component.uid !== attrs[key].targetModel: ', component.uid !== attrs[key].targetModel);
        // // console.log('skip !== attrs[key].targetModel: ', skip !== attrs[key].targetModel);
        // if (component.uid !== attrs[key].targetModel && skip !== attrs[key].targetModel ) {
        //   const innerComponent = components.filter(component => component.uid === attrs[key].targetModel)[0]
        //   // console.log('innerComponent: ', innerComponent);
        //   // console.groupCollapsed(`Parsing attributes ${i}`)
        //     const newInnerComponent = parseComponent(innerComponent, components, component.uid)
        //     // console.log('newInnerComponent: ', newInnerComponent);
        //   console.groupEnd()
        //   return { ...attrs[key], label: key, ...newInnerComponent}
        // }
        // return { ...attrs[key], label: key}
      // } else 
      if (attrs[key].type === "component") {
        // console.log('key: ', key);
        // console.log('skip: ', skip);
        // console.log('attrs[key].component: ', attrs[key].component);
        // console.log('component.uid !== attrs[key].component: ', component.uid !== attrs[key].component);
        // console.log('skip !== attrs[key].component: ', skip !== attrs[key].component);
        if (component.uid !== attrs[key].component && skip !== attrs[key].component ) {
          const innerComponent = components.filter(component => component.uid === attrs[key].component)[0]
          // console.log('innerComponent: ', innerComponent);
          // console.groupCollapsed(`Parsing attributes ${i}`)
            const newInnerComponent = parseComponents(innerComponent, components, component.uid)
          //   console.log('newInnerComponent: ', newInnerComponent);
          // console.groupEnd()
          return { ...attrs[key], label: key, ...newInnerComponent}
        }
        return { ...attrs[key], label: key}
      }
      return { ...attrs[key], label: key }
    })
    const parsedComponent = { ...component, attributes}
    // console.log('parsedComponent: ', parsedComponent);
    // console.groupEnd('parseComponent')

    return parsedComponent
  }
  const getComponents = async () => {
    setLoading(true)
    try {
      const response = await get(`/content-manager/components/`);
      const components = response.data.data.reduce((acc, curr, i, arr) => {
        
        const component = parseComponents(curr, arr, curr.uid)
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
      {
        loading && <Stack>

          <Loader/>
        </Stack>
      }
      {
        !loading && <>
          <SingleSelect onChange={selectContent} label={intlLabel.defaultMessage} value={selectedContent?.apiID || value} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables" error={error} disabled={disabled}>
            {
              contentTypes.map(content => <SingleSelectOption value={content.apiID}>{content.label}</SingleSelectOption>)
            }
          </SingleSelect>
          {
            selectedContent && <NestedAccordion variant="secondary" title={selectedContent.label} >
              <ul>
                {
                  selectedContent?.attributes?.map((attr, i1) => {
                    if (attr.type === "relation" || attr.type === "component") {
                      return attr.attributes 
                        ? <NestedAccordion variant="secondary" title={attr.label} >
                            <ul>
                              {
                                attr.attributes?.map((secondAttr, i2) => {
                                  if (secondAttr.type === "relation" || secondAttr.type === "component") {
                                    return secondAttr.attributes 
                                      ? <NestedAccordion variant="secondary" title={secondAttr.label} >
                                          <ul>
                                            {
                                              secondAttr.attributes?.map((thirdAttr, i3) => {
                                                if (thirdAttr.type === "relation" || thirdAttr.type === "component") {
                                                  return <>
                                                    { !!thirdAttr.attributes 
                                                        ? <NestedAccordion variant="secondary" title={thirdAttr.label} >
                                                            <ul>
                                                              {
                                                                thirdAttr.attributes?.map(fourthAttr => {
                                                                  if (fourthAttr.type === "relation" || fourthAttr.type === "component") {
                                                                    return <>
                                                                    {
                                                                      !!fourthAttr.attributes 
                                                                        ? <NestedAccordion variant="secondary" title={fourthAttr.label} >
                                                                            <ul>
                                                                              {
                                                                                fourthAttr.attributes?.map(fifthAttr => <li className='px-3' style={{'margin': '8px'}}><Typography>{ fifthAttr.label }</Typography></li>)
                                                                              }
                                                                            </ul>
                                                                          </NestedAccordion>
                                                                        // delete if dont want to show relation without attributes, not parsed because parent is same model
                                                                        : fourthAttr.type === "relation" && contentTypes.filter(content => content.uid === fourthAttr.target)[0]
                                                                          ? <NestedAccordion variant="secondary" title={fourthAttr.label} >
                                                                              <ul>
                                                                                {
                                                                                  contentTypes.filter(content => content.uid === fourthAttr.target)[0].attributes?.map(fifthAttr => <li className='px-3' style={{'margin': '8px'}}><Typography>{ fifthAttr.label }</Typography></li>)
                                                                                }
                                                                              </ul>
                                                                            </NestedAccordion>
                                                                              
                                                                          : <li className='px-3' style={{'margin': '8px'}}><Typography>{ fourthAttr.label }</Typography></li>
                                                                      }
                                                                    </> 
                                                                    
                                                                  } else {
                                                                    return <li className='px-3' style={{'margin': '8px'}}><Typography>{ fourthAttr.label }</Typography></li>
                                                                  }
                                                                })
                                                              }
                                                            </ul>
                                                          </NestedAccordion> // delete if dont want to show relation without attributes, not parsed because parent is same model
                                                        : thirdAttr.type === "relation" && contentTypes.filter(content => content.uid === thirdAttr.target)[0]
                                                          ? <NestedAccordion variant="secondary" title={thirdAttr.label} >
                                                              <ul>
                                                                {
                                                                  contentTypes.filter(content => content.uid === thirdAttr.target)[0].attributes?.map(fourthAttr => <li className='px-3' style={{'margin': '8px'}}><Typography>{ fourthAttr.label }</Typography></li>)
                                                                }
                                                              </ul>
                                                            </NestedAccordion>
                                                              
                                                          : <li className='px-3' style={{'margin': '8px'}}><Typography>{ thirdAttr.label }</Typography></li>
                                                      }
                                                  </> 
                                                  
                                                } else {
                                                  return <li className='px-3' style={{'margin': '8px'}}><Typography>{ thirdAttr.label }</Typography></li>
                                                }
                                              })
                                            }
                                          </ul>
                                        </NestedAccordion>
                                      : secondAttr.type === "relation" && contentTypes.filter(content => content.uid === secondAttr.target)[0]
                                        ? <NestedAccordion variant="secondary" title={secondAttr.label} >
                                            <ul>
                                              {
                                                contentTypes.filter(content => content.uid === secondAttr.target)[0].attributes?.map(thirdAttr => <li className='px-3' style={{'margin': '8px'}}><Typography>{ thirdAttr.label }</Typography></li>)
                                              }
                                            </ul>
                                          </NestedAccordion>
                                            
                                        : <li className='px-3' style={{'margin': '8px'}}><Typography>{ secondAttr.label }</Typography></li>
                                  } else {
                                    return <li className='px-3' style={{'margin': '8px'}}><Typography>{ secondAttr.label }</Typography></li>
                                  }
                                })
                              }
                            </ul>
                          </NestedAccordion>
                        : attr.type === "relation" && contentTypes.filter(content => content.uid === attr.target)[0]
                          ? <NestedAccordion variant="secondary" title={attr.label} >
                              <ul>
                                {
                                  contentTypes.filter(content => content.uid === attr.target)[0].attributes?.map(secondAttr => <li className='px-3' style={{'margin': '8px'}}><Typography>{ secondAttr.label }</Typography></li>)
                                }
                              </ul>
                            </NestedAccordion>
                              
                          : <li style={{'margin': '8px'}}><Typography>{ attr.label }</Typography></li>
                    } else {
                      return <li style={{'margin': '8px'}}><Typography>{ attr.label }</Typography></li>
                    }
                  })
                }
              </ul>
            </NestedAccordion>
          }
        </>
      }
        
      {/* <Accordion expanded={expandedContentID === 'acc-1'} onToggle={handleToggleContent('acc-1')} id="acc-2" variant="secondary">
            <AccordionToggle title={attr.label} />
            <AccordionContent>
              <Box padding={3}>
                <li className='px-3' style={{'margin': '8px'}}>
                  { thirdAttr.label }
                </li>
                {
                  thirdAttr.attributes && <ul>
                    {
                      thirdAttr.attributes?.map(fourthAttr => {
                        console.log(fourthAttr);
                        if (fourthAttr.type === "relation") {
                          return <>
                            <li className='px-3' style={{'margin': '8px'}}>
                              { fourthAttr.label }
                            </li>
                          </>
                          
                        } else {
                          return <li className='px-3' style={{'margin': '8px'}}>{ fourthAttr.label }</li>
                        }
                      })
                    }
                  </ul>
                  }
              </Box>
            </AccordionContent>
          </Accordion> */}
    </Stack>
  </>
};
