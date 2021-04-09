import { Splitter, SplitterPanel } from 'primereact/splitter'
import LeftPanel from './LeftPanel'
import RightPanel from './rightPanel'
import './Schema2.css'
import React, { useState, useEffect, useReducer } from "react";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'bootstrap/dist/css/bootstrap.css';
import { addPropertyHandler, finalJsonOutput, getDefaultDefinitions, getDefaultJson, initialObject, plusHandler, updateValue, deleteProp,getFirstValueFromMap } from "./xdm2";
import { ActionButton } from '@react-spectrum/button';
import ClassComponent from './ClassType';


const baseObject = {
    "meta:license": [
        "Copyright 2020 Adobe Systems Incorporated. All rights reserved.",
        "This work is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license",
        "you may not use this file except in compliance with the License. You may obtain a copy",
        "of the License at https://creativecommons.org/licenses/by/4.0/"
    ],
    "$id": "https://ns.adobe.com/xdm/classes/",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "",
    "type": "object",

    "meta:extensible": true, // ALL ARE TRUE EXCEPT WHEN USER SELECTS SCHEMA
    "meta:abstract": true, // ALL ARE TRUE EXCEPT SELECTS SCHEMA
    "description" : "",
    "definitions": {"CLAZZ": {
        "properties": []
    }},
    "allOf": [],
    "meta:status": "experimental"
}


// MAIN COMPONENT
const Schema2 = () => {


    const schemaTypes = [
        {type: 'class', label: 'Add Class', style: {background: '#9498DC'}},
        {type: 'mixin', label: 'Add Mixin', style: {background: '#B582A3'}},
        {type: 'dataType', label: 'Add DT', style: {background: '#D66D6C'}}
    ];
    
    const [_schemaType, setschemaType] = useState('Class')
    const [schemaName, setschemaName] = useState('');
    const [schemaTitle, setschemaTitle] = useState('');
    const [schemadescription, setDescription] = useState('');
    const [metaStatus, setmetastatus] = useState('');
    const [behaviour, setbehaviour] = useState('');
    const [clazzName, setClazzName] = useState('');

    const [addClasses, setClasses] = useState([]);

    const [onClickClassButton , setonClickClass] = useState(false);

    const [labelSchemaName, setlabelSchemaName] = useState('Class Name');
    const [labelSchematitle, setlabelSchemaTitle] = useState('Class Title');
    const [labelschemaDescription, setlabelSchemaDescription] = useState('Class Description');
    const [labelBehaviour, setlabelBehaviour] = useState('Behaviour');
    // const [definitions, setDefinitions] = useState([getDefaultDefinitions()]);
    
    const [definitions, setDefinitions] = useState(getDefaultDefinitions());
    
    const jsonData = {
        schemaType: _schemaType,
        schemaName: schemaName,
        title: schemaTitle,
        description: schemadescription,
        metaStatus: metaStatus,
        behaviour: behaviour,
        clazzName: clazzName,
        definition : definitions
    };

    const handleInputChange = (e, changingProp, objKey) => {
        console.log("AASSSSS",e);
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        var keyobj = objKey.toString(); 
        var definationCopy = {}
        if (keyobj.includes(".")){
            const keysArr = objKey.split(".");
            definationCopy = schemaObjectsCopy[keysArr[0]].jsonData.class.definitions 
        }else{
            definationCopy =   schemaObjectsCopy[objKey].jsonData.class.definitions
        }
        // var definationCopy =   schemaObjectsCopy[objKey].jsonData.class.definitions 
        const newDefinitions = updateValue(definationCopy, objKey, changingProp, e);
        setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
        console.log("DEFINATION", definitions);
         definationCopy = newDefinitions
        setDefinitions(getDefaultDefinitions())
        if (keyobj.includes(".")){
            const keysArr = objKey.split("."); 
            activeSchemaCopy.jsonData.class.definitions = definationCopy
            console.log(activeSchemaCopy.jsonData.adddefination);
            schemaObjectsCopy[keysArr[0]].jsonData.class.definitions = definationCopy
        }else{
            activeSchemaCopy.jsonData.class.definitions = definationCopy
            console.log(activeSchemaCopy.jsonData.definition);
            schemaObjectsCopy[objKey].jsonData.class.definitions = definationCopy
        }
      
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
        // setDefinitions(getDefaultDefinitions())
    };

    const handlePlusChange = (e, objKey) => {
        console.log(e.target.name);
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        var keyobj = objKey.toString(); 
        var definationCopy = {}
        if (keyobj.includes(".")){
            const keysArr = objKey.split(".");
            definationCopy = schemaObjectsCopy[keysArr[0]].jsonData.class.definitions 
        }else{
            definationCopy =   schemaObjectsCopy[objKey].jsonData.class.definitions
        }
          
        const newDefinitions = plusHandler(definationCopy, objKey);
        setDefinitions({"CLAZZ": newDefinitions.CLAZZ} )
        definationCopy = newDefinitions
       if (keyobj.includes(".")){
           const keysArr = objKey.split("."); 
           activeSchemaCopy.jsonData.class.definitions = definationCopy
           console.log(activeSchemaCopy.jsonData.adddefination);
           schemaObjectsCopy[keysArr[0]].jsonData.class.definitions = definationCopy
       }else{
           activeSchemaCopy.jsonData.class.definitions = definationCopy
           console.log(activeSchemaCopy.jsonData.definition);
           schemaObjectsCopy[objKey].jsonData.class.definitions = definationCopy
       }
        
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
        setDefinitions(getDefaultDefinitions())
    };

    const updateHandlerFactory = (changingProp, objKey) => {
        return (e) => {
            handleInputChange(e, changingProp, objKey);
        }
    }

    const plusHandlerFactory = (objKey) => {
        return (e) => {
            handlePlusChange(e, objKey);
        }
    }

    const addDynamicPropertyRow = (index) => {
        console.log("clicked add properties");
        const newDefinitions = addPropertyHandler(definitions);
        // setDefinitions([...definitions,{ "CLAZZ": newDefinitions.CLAZZ }]);
        
        setDefinitions({"CLAZZ": newDefinitions.CLAZZ} )
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        activeSchemaCopy.jsonData.class.definitions = newDefinitions
        schemaObjectsCopy[index].jsonData.class.definitions = newDefinitions
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
        setDefinitions(getDefaultDefinitions())
        
    }

    const deleteProperty = (jsonObject, i) => {
        const result = deleteProp(jsonObject, i);
        // setDefinitions([...definitions,{ "CLAZZ": result.CLAZZ }]);
        setDefinitions({"CLAZZ": result.CLAZZ} )
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        activeSchemaCopy.jsonData.class.definitions = result
        schemaObjectsCopy[i].jsonData.class.definitions = result
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
        setDefinitions(getDefaultDefinitions())
    }
    


    // dummy state
    const [schemaObjects, setSchemaObjects] = useState([
        // {type: 'class', minimized: false, jsonData: {key: 'CLASS', someOtherKey: 'VALUE'}},
        // {type: 'mixin', minimized: false,jsonData: {key: 'MIXIN', someOtherKey: 'VALUE2'}},
        // {type: 'datatype', minimized: false,jsonData: {key: 'DATA TYPE', someOtherKey: 'VALUE2'}},
    ])

    const [activeSchema, setActiveSchema] = useState(undefined)

    const onDeleteSchema = (i) => {

        // Create a copy of the schemaObjects, delete at index on the copy, set copy as new schemaObjects
        let schemObjectsCP = JSON.parse(JSON.stringify(schemaObjects));
        setActiveSchema(undefined);
        setSchemaObjects(schemObjectsCP.filter((item, index) => index !== i));

     }


    const onJRTESTChangeHandler = (e,index,name) => {
        console.log("name",e);
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        console.log(activeSchemaCopy.jsonData);
        switch (name) {
            case "schemaName":
                setschemaName(e);
                activeSchemaCopy.jsonData.class.$id = `https://ns.adobe.com/xdm/Class/${e}`
                schemaObjectsCopy[index].jsonData.class.$id = `https://ns.adobe.com/xdm/Class/${e}`;
                // activeSchemaCopy.jsonData.class.definitions = {[e]: {
                //     "properties" : []
                // }};
                // schemaObjectsCopy[index].jsonData.class.definitions = {[e]: {
                //     "properties" : []
                // }};
               
                activeSchemaCopy.jsonData.class.allOf = [{'$ref':`#/definitions/${e}`}];
                schemaObjectsCopy[index].jsonData.class.allOf =[{'$ref':`#/definitions/${e}`}];
                
                break;
                case "schemaTitle":
                    setschemaTitle(e);
                    activeSchemaCopy.jsonData.class.title = e
                    schemaObjectsCopy[index].jsonData.class.title = e;
                    break;
            case "schemaDescription":
                setDescription(e);
                activeSchemaCopy.jsonData.class.description = e
                schemaObjectsCopy[index].jsonData.class.description = e;
                break;
                
        }
        // change values
        
        console.log('COPY', activeSchemaCopy);
        console.log('activeSchema', activeSchema)
        
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
        // setschemaName('')
        // setschemaTitle('')
        // setDescription('')
        // setDefinitions(getDefaultDefini0tions()) 
    }

    const clearData = () => {
        
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        activeSchemaCopy.jsonData.$id = `https://ns.adobe.com/xdm/Class/`
        activeSchemaCopy.jsonData.definition = {'': {
            "properties" : {}
        }};
        setActiveSchema(activeSchemaCopy);
    }

    const onWindowAction = (isMinimized, index) => {
        console.log('HERE', isMinimized, index)
        // Make copies
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));
        // change values
        activeSchemaCopy.minimized = isMinimized;
        schemaObjectsCopy[index].minimized = isMinimized;

        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);
    }

    const onAddSchema = async (type) => {
        let schemaObjectsCP = JSON.parse(JSON.stringify(schemaObjects));
        switch (type) {
            case 'class':
                const classSchema = {type: 'class', minimized: false, jsonData: {class:baseObject,
                     adddefination : undefined} 
                // finalJsonOutput(definitions,jsonData)
                };
                setActiveSchema(classSchema)
                schemaObjectsCP.push(classSchema);
                setschemaType("Class")
                setClasses([...addClasses,addClasses.length])
                setSchemaObjects(schemaObjectsCP);
               clearData()
                // setlabelSchemaDescription('Class Description');
                // setlabelSchemaName('Class Name');
                // setlabelSchemaTitle('Class Title');
                // setlabelBehaviour('Behaviour');
                setonClickClass(true);
                break;
            case 'mixin':
                // await setDefinitions(getDefaultDefinitions())
                console.log('JSONDATA',jsonData);
                clearData()
                const mixinSchema = {type: 'mixin', minimized: false,  jsonData: {class:baseObject, adddefination : {}} 
                //  jsonData: finalJsonOutput(definitions,jsonData)
                };
                setActiveSchema(mixinSchema)
                schemaObjectsCP.push(mixinSchema);
                setSchemaObjects(schemaObjectsCP);
                break;
            case 'dataType':
                const dataTypeSchema = {type: 'dataType', minimized: false,  jsonData: {class:baseObject, adddefination : definitions} 
                // jsonData: finalJsonOutput(definitions,jsonData)
            };
                setActiveSchema(dataTypeSchema)
                schemaObjectsCP.push(dataTypeSchema);
                setSchemaObjects(schemaObjectsCP);
                setschemaName('')
                setschemaTitle('')
                setDescription('')
                // setDefinitions(getDefaultDefinitions())
                break;
            default:
                break;
        }
    }
    

    return (<>
        {/* Navigation Bar */}
        <div style={{ background: "linear-gradient(to left, #e66465, #9198e5)", color: 'white', height : 48,textAlign : "center", paddingTop : 10}}>Experience Data Model (XDM) Tool</div>
        
        {/* Main Container */}
        <div style={{width: '100%', height: '100vh', background: 'blue', display: 'flex'}}>
            {/* Control Panel */}
            <div style={{background: '#DEE2E6', width: '120px', padding: '10px'}}>

                {
                    schemaTypes.map((schemaType, index) => {
                        return <ActionButton key={index} width="100px" marginBottom="10px"
                        UNSAFE_style={{...schemaType.style, color: '#ffffff'}} 
                        onPress={() => onAddSchema(schemaType.type)}>
                            {schemaType.label}
                        </ActionButton>
                    })
                }
                
            </div>

            {/* Left and Right Splitter Pane */}
            <Splitter style={{height: '100%', width: '100%'}} layout="horizontal">
                <SplitterPanel >
                    <LeftPanel   onWindowAction={(type, index) => onWindowAction(type, index)}
                     onJRTESTChange={(e, index,name) => onJRTESTChangeHandler(e, index,name)}
                     schemas={schemaObjects} 
                     deleteSchema={(index) => onDeleteSchema(index)}
                     schemaDescription = {schemadescription}
                     schemaName = {schemaName}
                     schemaTitle = {schemaTitle}
                     labelSchemaName = {labelSchemaName}
                     behaviour = {behaviour}
                     labelSchematitle = {labelSchematitle}
                     labelschemaDescription = {labelschemaDescription}
                     updateHandlerFactory = {updateHandlerFactory}
                     addDynamicPropertyRow = {(index)=>addDynamicPropertyRow(index)}
                     definitions = {definitions}
                     plusHandlerFactory = {plusHandlerFactory}
                     deleteProperty = {deleteProperty}
                     setActiveSchema={(index) => setActiveSchema(schemaObjects[index])}
                   />
                   {/* {addClasses.map((m) => <ClassComponent  /> )} */}
                 

                </SplitterPanel>
                <SplitterPanel>
                    {/* <RightPanel  jsonData={finalJsonOutput(definitions, jsonData)} /> */}
                    {console.log('ACTIVESCHEMA', activeSchema?.jsonData ?? undefined)}
                    <RightPanel jsonData={activeSchema?.jsonData.class ?? undefined}/>
                </SplitterPanel>
            </Splitter>

        </div>

    </>)
}

export default Schema2
