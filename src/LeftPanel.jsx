import React, { useState, useEffect, useReducer } from "react";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'bootstrap/dist/css/bootstrap.css';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import { addPropertyHandler, finalJsonOutput, getDefaultDefinitions, getDefaultJson, initialObject, plusHandler, updateValue, deleteProp } from "./xdm2";
import { Dropdown } from 'primereact/dropdown';
import { ActionButton, DialogTrigger, Flex, Text, TextField, AlertDialog } from '@adobe/react-spectrum'
import './Dropdown.css';
import DeleteOutline from "@spectrum-icons/workflow/DeleteOutline";
import Minimize from "@spectrum-icons/workflow/Minimize";
import Maximize from "@spectrum-icons/workflow/Maximize";

const baseObject = {
    "meta:license": [
    "Copyright 2020 Adobe Systems Incorporated. All rights reserved.",
    "This work is licensed under a Creative Commons Attribution 4.0 International (CC BY 4.0) license",
    "you may not use this file except in compliance with the License. You may obtain a copy",
    "of the License at https://creativecommons.org/licenses/by/4.0/"
    ],
    "$id": "https://ns.adobe.com/xdm/classes/${ CLASSNAME / MIXINNAME / DATATYPENAME / SCHEMA}",
    "$schema": "http://json-schema.org/draft-06/schema#",
    "title": "${ CLASSTITLE / MIXINTTILE / DATATYPETITLE / SCHEMA }",
    "type": "object",
    
    "meta:extensible": true, // ALL ARE TRUE EXCEPT WHEN USER SELECTS SCHEMA
    "meta:abstract": true, // ALL ARE TRUE EXCEPT SELECTS SCHEMA

}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: 167
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    button: {
        margin: theme.spacing.unit,
        width: 80,
    },
    input: {
        // display: 'none',
        height: 28
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 140,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const LeftPanel = (props) => {


    const classes = useStyles();
    
    const [_schemaType, setschemaType] = useState('Class')
    const [schemaName, setschemaName] = useState('');
    const [schemaTitle, setTitleMain] = useState('');
    const [schemadescription, setDescription] = useState('');
    const [metaStatus, setmetastatus] = useState('');
    const [behaviour, setbehaviour] = useState('');
    const [clazzName, setClazzName] = useState('')

    const [labelSchemaName, setlabelSchemaName] = useState('Class Name');
    const [labelSchematitle, setlabelSchemaTitle] = useState('Class Title');
    const [labelschemaDescription, setlabelSchemaDescription] = useState('Class Description');
    const [labelBehaviour, setlabelBehaviour] = useState('Behaviour');
    const [classColor, setclasscolor] = useState('primary');
    const [mixinColor, setmixincolor] = useState('');
    const [datatypeColor, setdatatypecolor] = useState('');
    const [definitions, setDefinitions] = useState(getDefaultDefinitions());
    
    const [className, setClassName] = useState("");
    const [mixinBehaviour, setMixinBehaviour] = useState('');
    
    // const classess = [
    //     { name: 'profile'},
    //     { name: 'experience event' },
    //     {name : 'product'}
    // ];

    // const behaviourVal = [
    //     { name: 'record'},
    //     { name: 'timeseries' }
    // ];
    // const onClassChange = (e) => {
    //     console.log(e.value.name);
    //     setClassName(e.value);
    //     setbehaviour(e.value.name)
    // }

    // const onmixinChange = (e) => {
    //     setMixinBehaviour(e.value);
    //     setbehaviour(e.value.name)
    // }
    // const jsonData = {
    //     schemaType: _schemaType,
    //     schemaName: schemaName,
    //     title: schemaTitle,
    //     description: schemadescription,
    //     metaStatus: metaStatus,
    //     behaviour: behaviour,
    //     clazzName: clazzName,
    //     definition : definitions
    // };

    // const handleInputChange = (e, changingProp, objKey) => {
    //     console.log('HANDLEINPUTCHANTE',e)
    //     const { name, value } = e.target;
    //     console.log(e.target.name);
    //     const newDefinitions = updateValue(definitions, objKey, changingProp, value);
    //     setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
    // };

    // const handlePlusChange = (e, objKey) => {
    //     console.log(e.target.name);
    //     const newDefinitions = plusHandler(definitions, objKey);
    //     setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
    // };

    // const updateHandlerFactory = (changingProp, objKey) => {
    //     return (e) => {
    //         handleInputChange(e, changingProp, objKey);
    //     }
    // }

    // const plusHandlerFactory = (objKey) => {
    //     return (e) => {
    //         handlePlusChange(e, objKey);
    //     }
    // }

//     const addDynamicPropertyRow = () => {
//         console.log("clicked add properties");
//         const newDefinitions = addPropertyHandler(definitions);
//         setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
//     }

//     const deleteProperty = (jsonObject, i) => {
//         const result = deleteProp(jsonObject, i);
//         setDefinitions({ "CLAZZ": result.CLAZZ })
//     }
//     const getLabelNamesMixin = () => {
//         setlabelSchemaDescription('Mixin Description');
//         setlabelSchemaName('Mixin Name');
//         setlabelSchemaTitle('Mixin Title');
//         setlabelBehaviour('Class Name');
//         setschemaType('Mixin')
//         setclasscolor('');
//         setmixincolor('primary')
//         setdatatypecolor('');
//     }


    
// const getLabelNamesClass = () => {
//         setlabelSchemaDescription('Class Description');
//         setlabelSchemaName('Class Name');
//         setlabelSchemaTitle('Class Title');
//         setlabelBehaviour('Behaviour')
//         setschemaType('Class')
//         setclasscolor('primary')
//         setmixincolor('');
//         setdatatypecolor('');
//     }

//     const getLabelNamesDataType = () => {
//         setlabelSchemaDescription('Datatype Description');
//         setlabelSchemaName('Datatype Name');
//         setlabelSchemaTitle('Datatype Title');
//         setschemaType('DataType')
//         setclasscolor('');
//         setmixincolor('');
//         setdatatypecolor('primary');
//     }
    

    // const renderHighLevelProperty1 = (val, i, plusProperty) => {
    //     console.log("Object Key =====" + i);
    //     const objKey = Object.keys(val)[0];
    //     const objVal = val[objKey];
    //     const keyValues = objKey.split(":");
    //     let nestedValues = [];
    //     if (objVal.type == "object") {
    //         for (let i2 = 0; i2 < objVal.properties.length; i2++)
    //             nestedValues.push(renderHighLevelProperty1(objVal.properties[i2], i + "." + i2, true));
    //     }
    //     return(
    //         <div style={{ marginLeft: '2.25rem' }}>
    //             {plusProperty ? <span style={{ marginLeft: '2.25rem' }} ></span> : null}
    //             <Fab size="small" aria-label="Add" className={classes.margin} onClick={plusHandlerFactory(i)}>
    //                 <AddIcon />
    //             </Fab>
    //             <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Namespace" variant="outlined" name="propertyNamespace"
    //                 value={keyValues[0]}
    //                 onChange={updateHandlerFactory("keyT", i)} />
    //             <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Name" variant="outlined" name="propertyName"
    //                 value={keyValues[1]}
    //                 onChange={updateHandlerFactory("keyN", i)} />
    //             <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Title" variant="outlined" name="propertyTitle"
    //                 value={objVal.title}
    //                 onChange={updateHandlerFactory("title", i)} />
    //             <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Data Type" variant="outlined" name="propertyType" 
    //                 value={objVal.type} 
    //                 onChange={updateHandlerFactory("type", i)}/>
    //             <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Description" variant="outlined" name="propertyDescription"
    //                 value={objVal.description}
    //                 onChange={updateHandlerFactory("description", i)} />
    //             <IconButton style={{width: '50px'}} aria-label="Delete" className={classes.margin} onClick={() => deleteProperty(definitions, i)}>
    //                 <DeleteIcon fontSize="small" />
    //             </IconButton>
    //             {nestedValues.map((nv, ni) => {
    //                 console.log("nv",ni);
    //                 return nv
    //             })}
    //         </div>
    //     )
    // }


    return (
        <div style={{display: 'flex', flexDirection: 'column-reverse'}}>

            {props.schemas.map((obj, index) => {
                console.log('SCHEMAMAP', obj)
                if (obj.minimized) {
                    return <div
                    onClick={() => props.setActiveSchema(index)}
                    key={index}
                    style={{
                        border: `5px solid ${obj.type === 'class' ? '#9498DC' : obj.type === 'mixin' ? '#B582A3' : '#D66D6C'}`, 
                        height: '100px', 
                        minWidth: '300px', 
                        background: 'lightgrey', 
                        borderRadius: '10px', 
                        margin: '20px', 
                        padding: '10px'}}>
                                <Flex justifyContent="end">
                                    <ActionButton width="size-115" marginEnd="size-10"
                                        onPress={() => props.onWindowAction(false, index)}
                                    >
                                        <Maximize/>
                                    </ActionButton>
                                    <DialogTrigger>
                                        <ActionButton width="size-115"><DeleteOutline/></ActionButton>
                                        <AlertDialog
                                            variant="destructive"
                                            title={`Delete ${obj.type} Schema`}
                                            primaryActionLabel="Delete"
                                            onPrimaryAction={() => props.deleteSchema(index)}
                                            cancelLabel="Cancel">
                                            This will permanently delete the selected Schema. Continue?
                                        </AlertDialog>
                                    </DialogTrigger>
                                </Flex>

                        </div>
                } else {
                    return <div 
                    onClick={() => props.setActiveSchema(index)}
                    key={index}
                    style={{
                        border: `5px solid ${obj.type === 'class' ? '#9498DC' : obj.type === 'mixin' ? '#B582A3' : '#D66D6C'}`, 
                        height: '500px', 
                        minWidth: '800px', 
                        background: 'lightgrey', 
                        borderRadius: '10px', 
                        margin: '20px', 
                        padding: '10px'}}>
                        
                                <Flex justifyContent="end">
                                    <ActionButton width="size-115" marginEnd="size-10"
                                        onPress={() => props.onWindowAction(true, index)}
                                    >
                                        <Minimize/>
                                    </ActionButton>
                                    <DialogTrigger>
                                        <ActionButton width="size-115"><DeleteOutline/></ActionButton>
                                        <AlertDialog
                                            variant="destructive"
                                            title={`Delete ${obj.type} Schema`}
                                            primaryActionLabel="Delete"
                                            onPrimaryAction={() => props.deleteSchema(index)}
                                            cancelLabel="Cancel">
                                            This will permanently delete the selected Schema. Continue?
                                        </AlertDialog>
                                    </DialogTrigger>
                                </Flex>
                        
                            <div>

                        {/* {console.log('OBJ', obj.jsonData)} */}

                            <TextField 
                                label="Class Name" 
                                variant="filled" 
                                defaultValue={obj.jsonData.key} 
                                onChange={(e) => console.log(e)}/>

                            <TextField 
                                label="Class Name" 
                                variant="filled" 
                                defaultValue={obj.jsonData.key} 
                                onChange={(e) => console.log(e)}/>
                            
                            <TextField 
                                label="Class Description" 
                                variant="filled" 
                                defaultValue={obj.jsonData.key} 
                                onChange={(e) => console.log(e)}/>

                            <TextField 
                                label="Class Description" 
                                variant="filled" 
                                defaultValue={obj.jsonData.key} 
                                onChange={(e) => console.log(e)}/>

                            </div>
                            

                            <div style={{ marginLeft: '2.25rem' }}>
                
                        </div>

                    </div>
                }
                
            })}
                

    </div>)

    
}

export default LeftPanel
