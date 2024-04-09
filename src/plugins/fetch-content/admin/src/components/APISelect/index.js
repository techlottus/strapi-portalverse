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
  MultiSelectOption,
  EmptyStateLayout,
  TextInput,
  NumberInput,
  DatePicker,
  Switch,
  ToggleInput
} from '@strapi/design-system';
import { useCMEditViewDataManager, getFetchClient  } from '@strapi/helper-plugin';
import { Plus, Component, Cross, Filter } from '@strapi/icons';
import NestedAccordionSelect from '../NestedAccordionSelect';
import NestedAccordion from '../NestedAccordion';
import MultiLevelSelect from '../MultiLevelSelect';

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
  const [filters, setFilters] = useState(prefilledContent?.filters || []);
  
  const { modifiedData } = useCMEditViewDataManager()
  const { get,  } = getFetchClient();
  useEffect(() => {
    getcontentTypes()
    getComponents()
  }, [])

  useEffect(() => {
    // console.log('modifiedData')
  }, [modifiedData])

  useEffect(() => {
    // console.log('selectedContent: ', selectedContent);
    // console.log('selectedComponents: ', selectedComponents);
    triggerChange()

  }, [selectedContent, selectedComponents, filters])

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
  const filterContent = ({apiID = false, uid = false}) => {
    if (apiID || uid) {
      // console.log('apiID: ', apiID)
      // console.log('uid: ', uid)
      const content = apiID
        ? contentTypes?.filter(content => content?.apiID === apiID)[0]
        : contentTypes?.filter(content => content?.uid === uid)[0]
      // console.log('content: ', content)
      return content
    }
    return {label: 'error'}
  }
  const addFilter = () => {
    setFilters([...filters, {operator: '', attr: '', labels: [], condition: '', value: ''}])
  }
  const patchFilter = (index, { attr, condition, value, operator, labels }) => {
    // console.log('index: ', index);
    // console.log('attr: ', attr);
    // console.log('condition: ', condition);
    // console.log('value: ', value);
    // console.log('operator: ', operator);
    // console.log('labels: ', labels);
    const filteredContent = filterContent({ apiID: selectedContent })
    const filteredOperator  = logicalOperators.filter(lo => lo.value === operator)[0]
    const filteredCondition  = filterConditions.filter(c => c.value === condition)[0]
    if (labels ) {
      // console.log('array');
      // console.log('attr: ', attr);
      attr = labels?.reduce((acc, curr, i, arr) => {
        if (i === 0) {
          const attr = filteredContent?.attributes?.filter(a => a.label === curr)[0]
          acc.trace =  [ ...acc.trace, attr ]
          if (i < arr.length) acc.value = attr

        } else {
          // console.log('curr: ', curr)
          const comp = acc.trace[i-1]?.component
          // console.log('comp: ', comp);
          const attr = filterComponent(comp)?.attributes?.filter(a => a.label === curr)[0]
          // console.log('attr: ', attr);
          acc.trace = [...acc.trace, attr]
          if (i < arr.length) acc.value = attr
        } 

        
        return acc
      }, {trace: [], value: {}} )
      // attr = attr.map(part => filteredContent?.attributes.filter(a => a.label === part)[0] )
      // console.log('attr: ', attr);
    }
    // const filteredAttribute = filteredContent?.attributes.filter(a => a.label === attr)[0] 
    if (value instanceof Date ) {
      // console.log('date');
      value = new Date(value).toDateString()
    }
    Promise.all(filters.map(async (filter, i) => {
      if (i === index) {
        if (operator) filter.operator = filteredOperator
        if (attr) filter.attr = attr



        if (filter.attr.value.type === "relation") {
          console.log('attr.value: ', attr.value);
          const data = await getAPI(attr.value.targetModel)
          console.log('data: ', data);
        }



        if (condition) filter.condition = filteredCondition
        if (labels) filter.labels = labels
        if (value !== undefined) filter.value = value
      }
      if ( i === 0 ) filter
      return filter
    })).then((newFilters) => {
      console.log('newFilters: ', newFilters);
      console.log('newFilters[index]: ', newFilters[index]);
      setFilters([...newFilters])
    })
  }
  const removeFilter = (index) => {
    const newFilters = filters.reduce((acc, curr, i) => {
      if (i !== index) {
        acc = [...acc, curr]
      }
      return acc
    }, [])
    setFilters([...newFilters])

  }
  const triggerChange =() => {
    // console.log('triggering change');
    const content = filterContent({apiID: selectedContent}) || (prefilledContent?.content || null)
    const value = JSON.stringify({
      content: content,
      components: selectedComponents,
      filters: filters
    })
    // console.groupCollapsed('trigger data')
    // console.log('content: ', content);
    // console.log('selectedComponents: ', selectedComponents);
    // console.log('filters: ', filters);
    // console.groupEnd()

    onChange({ target: { name, value, type: attribute.type } })
  }
  const getValue = ( propvalue ) => {
    // console.log('propvalue:', propvalue);
    // console.log('selectedComponents:', selectedComponents);
    if (propvalue)  {

      // console.log('getValue API SELECT propvalue:', propvalue);
      const component = selectedComponents[propvalue?.parentIndex || propvalue?.index]
      // console.log('getValue API SELECT component:', component);
      const attributes = component?.attributes
      // console.log('getValue API SELECT attributes:', attributes);
      if ( attributes && (attributes[propvalue?.index]?.type === propvalue.type || (propvalue?.type === "relation" || propvalue?.type === "component"))) {
        
        attributes[propvalue?.index] =  propvalue
        component.attributes = attributes
        const components = [ ...selectedComponents ]
        components[propvalue.parentIndex] = component
        // console.log('getValue API SELECT components:', components);
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
    // console.groupCollapsed('parseContent: ', content.uid)
    // console.log('content: ', content);
    // console.log('typeof content.attributes: ', typeof content.attributes);
    const attrs = content.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => ({ ...attrs[key], label: key}))
    const parsedContent = { ...content, attributes, type:'relation'}
    // console.groupEnd()

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
          const content = parseContent({...curr, label})
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
    // console.groupCollapsed('parseComponent: ', component.apiID)
    // console.log('component: ', component);
    // console.log('typeof component.attributes: ', typeof component.attributes);
    const attrs = component.attributes
    const keys = Object.keys(attrs)
    const attributes = keys.map((key, i) => {
      return { ...attrs[key], label: key, value: [], index: i, related: true }
    })
    const parsedComponent = { ...component, attributes, label: component?.apiID }
    // console.log('parsedComponent: ', parsedComponent);
    // console.groupEnd('parseComponent')

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
  const getAPI = async (api) => {
    console.log('api: ', api);
    const response = await get(`/levels`); // get data from related api to filter
    // const response = await entityService.get(api);
    console.log('response: ', response);
    return response
  }

  // {value : "$between", label : "between"}, Add thios filter when add case to support it
  const filterConditions = [
    {value : "$not", label : "not"},
    {value : "$eq", label : "equal"},
    {value : "$eqi", label : "equal case insensitive"},
    {value : "$ne", label : "no equal"},
    {value : "$nei", label : "not equal case insensitive"},
    {value : "$in", label : "contained in list"},
    {value : "$notIn", label : "not contained in list"},
    {value : "$lt", label : "less than"},
    {value : "$lte", label : "less than or equal"},
    {value : "$gt", label : "greater than"},
    {value : "$gte", label : "greater than or equal"},
    {value : "$contains", label : "contains"},
    {value : "$notContains", label : "not contains"},
    {value : "$containsi", label : "contains case insensitive"},
    {value : "$notContainsi", label : "not contains case insensitive"},
    {value : "$startsWith", label : "starts with"},
    {value : "$endsWith", label : "ends with"},
    {value : "$null", label : "null"},
    {value : "$notNull", label : "notNull"},
  ]
  const logicalOperators = [
    {value: "$and", label: "and"},
    {value: "$or", label: "or"},
    {value: "$not", label: "not"},
  ]

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


          <AccordionGroup
            borderColor="primary100"
            footer={
              <Flex justifyContent="center" height="48px" background="neutral140">
                <TextButton startIcon={<Plus />} onClick={() => addFilter()}>
                  Add a filter
                </TextButton>
              </Flex>
            }
            label="filters" 
          >
            {
              filters.map((filter, i) => {
                return <Box>
                  <NestedAccordion
                    title={
                      <Flex alignItems="center">
                        <Box paddingRight={2}>

                          <Filter/>
                        </Box>
                        <Typography>
                          {filter.operator?.label ? filter.operator.label + ' : ' : ''}
                          {filter.attr?.value?.label ? filter.attr.value.label + ' | ' : ''}
                          {filter.condition?.label ? filter.condition.label + ' | ' : ''}
                          {
                            (filter.value === false && 'False') ||
                            (filter.value === true && 'True') ||
                            filter.value
                          }
                        </Typography>
                      </Flex>
                    }
                    handleDelete={() => removeFilter(i)}
                    showDelete={(filters.length === 1 && i === 0) || i > 0}
                  >
                    { 
                      i > 0 && <SingleSelect onChange={(e) => patchFilter(i, { operator: e })} label="logical operator" value={filter?.operator?.value} required placeholder="Select a filter" hint="You can filter your related data" disabled={disabled}>
                        {
                          logicalOperators.map((operator, i) => <SingleSelectOption key={`logical-operator-${i}`} value={operator.value}>{operator.label}</SingleSelectOption>)
                        }
                      </SingleSelect>
                    }
                    {/* <SingleSelect onChange={(e) => patchFilter(i, { attr: e })} label={`attribute${filter.attr?.type ? ' [type:' + filter.attr.type + ']' : ''}`} value={filter.attr?.label} required placeholder="Select an attribute" hint="You can filter your related data by attributes" disabled={disabled}>
                      {
                        filterContent({ apiID: selectedContent })?.attributes?.filter(attr => !['richtext', 'media'].includes(attr?.type)).map((attr, i) => <SingleSelectOption key={`content-attribute-${i}`} value={attr.label}>{attr.label}</SingleSelectOption>)
                      }
                    </SingleSelect> */}
                    <MultiLevelSelect
                      showAttrTypes={['component']}
                      allowedTypes={['relation', 'component', 'string', 'integer', 'decimal', 'date', 'datetime', 'enumeration', 'boolean', ]}
                      onChange={(e) => patchFilter(i, { labels: e })}
                      label={`attribute${filter.attr?.type ? ' [type:' + filter.attr.type + ']' : ''}`}
                      value={filter.labels}
                      parentResponse={filter.labels}
                      attributes={filterContent({ apiID: selectedContent })?.attributes.filter(attr => !['richtext', 'media'].includes(attr?.type))}
                      filterContent={filterContent}
                      filterComponent={filterComponent}
                    />
                    <SingleSelect onChange={(e) => patchFilter(i, { condition: e })} label="condition" value={filter?.condition?.value} required placeholder="Select a filter" hint="You can filter your related data" disabled={disabled}>
                      {
                        filterConditions.map((condition, i) => <SingleSelectOption key={`filter-condition-${i}`} value={condition.value}>{condition.label}</SingleSelectOption>)
                      }
                    </SingleSelect>
                    {
                      filter.attr?.value?.type === "relation" && console.log('filter: ', filter)

                    }
                    {
                      filter.attr?.value?.type === "relation"
                        ? <SingleSelect onChange={e =>  patchFilter(i, { value: e })} value={filter.value} label={filter.attr.label} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables">
                            {
                              // filter.attr?.value?.enum.map((label, i) => <SingleSelectOption key={`contents-option-${i}`} value={label}>{label}</SingleSelectOption>)
                              // getAPI(filter.attr?.targetModel)
                            }
                          </SingleSelect>
                        : filter.attr?.value?.type === "enumeration"
                          ? <SingleSelect onChange={e =>  patchFilter(i, { value: e })} value={filter.value} label={filter.attr.label} required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables">
                              {
                                filter.attr?.value?.enum.map((label, i) => <SingleSelectOption key={`contents-option-${i}`} value={label}>{label}</SingleSelectOption>)
                              }
                            </SingleSelect>
                          : filter.attr?.value?.type === "integer" || filter.attr?.value?.type === "decimal"
                            ? <NumberInput onValueChange={value => patchFilter(i, { value })} value={filter.value} label='value' required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables"/>
                            : filter.attr?.value?.type === "date" || filter.attr?.value?.type === "datetime"
                              ?  <DatePicker onChange={value => patchFilter(i, { value })} selectedDate={filter.value} label='value' />
                              : filter.attr?.value?.type === "boolean"
                                ? <ToggleInput label='value' onLabel='True' offLabel = 'False' checked={filter.value} onChange={e => patchFilter(i, { value: e.target.checked })} />
                                : <TextInput onChange={e =>  patchFilter(i, { value: e.target.value })} value={filter.value} label='value' required placeholder="Select a content type" hint="Content type is used to get attributes and generate its variables" />  
                    }
                  </NestedAccordion>
                </Box>
              })
            }
          </AccordionGroup>
          
          {
            selectedComponents.length === 0 
              ? <Box padding={8} background="neutral100">
                  <EmptyStateLayout icon={<Cross />} content="You don't have any components yet..." action={<TextButton startIcon={<Plus />} onClick={() => setIsModalVisible(prev => !prev)}>
                        Add a component
                      </TextButton>} />
                </Box>
              : <AccordionGroup
                  borderColor="primary100"
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
                      return <Box>
                        <NestedAccordion title={component.info.displayName} handleDelete={() => removeComponent(component.apiID)}>
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
                      </Box>
                    })
                  }
                </AccordionGroup>
          }
          {
            isModalVisible && <ModalLayout onClose={() => setIsModalVisible(prev => !prev)} labelledBy="title">
              <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                  Choose a component
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
