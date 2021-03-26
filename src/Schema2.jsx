import { Splitter, SplitterPanel } from 'primereact/splitter'
import LeftPanel from './LeftPanel'
import RightPanel from './rightPanel'
import './Schema2.css'
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
import TextField from "@material-ui/core/TextField";
import DeleteIcon from '@material-ui/icons/Delete';
import { addPropertyHandler, finalJsonOutput, getDefaultDefinitions, getDefaultJson, initialObject, plusHandler, updateValue, deleteProp } from "./xdm2";



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

// MAIN COMPONENT
const Schema2 = () => {



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
    
    const classess = [
        { name: 'profile'},
        { name: 'experience event' },
        {name : 'product'}
    ];

    const behaviourVal = [
        { name: 'record'},
        { name: 'timeseries' }
    ];
    const onClassChange = (e) => {
        console.log(e.value.name);
        setClassName(e.value);
        setbehaviour(e.value.name)
    }

    const onmixinChange = (e) => {
        setMixinBehaviour(e.value);
        setbehaviour(e.value.name)
    }
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
        const { name, value } = e.target;
        console.log(e.target.name);
        const newDefinitions = updateValue(definitions, objKey, changingProp, value);
        setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
    };

    const handlePlusChange = (e, objKey) => {
        console.log(e.target.name);
        const newDefinitions = plusHandler(definitions, objKey);
        setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
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

    const addDynamicPropertyRow = () => {
        console.log("clicked add properties");
        const newDefinitions = addPropertyHandler(definitions);
        setDefinitions({ "CLAZZ": newDefinitions.CLAZZ });
    }

    const deleteProperty = (jsonObject, i) => {
        const result = deleteProp(jsonObject, i);
        setDefinitions({ "CLAZZ": result.CLAZZ })
    }
    
    const getLabelNamesClass = () => {
        setlabelSchemaDescription('Class Description');
        setlabelSchemaName('Class Name');
        setlabelSchemaTitle('Class Title');
        setlabelBehaviour('Behaviour')
        setschemaType('Class')
        setclasscolor('primary')
        setmixincolor('');
        setdatatypecolor('');
    }
    const getLabelNamesMixin = () => {
        setlabelSchemaDescription('Mixin Description');
        setlabelSchemaName('Mixin Name');
        setlabelSchemaTitle('Mixin Title');
        setlabelBehaviour('Class Name');
        setschemaType('Mixin')
        setclasscolor('');
        setmixincolor('primary')
        setdatatypecolor('');
    }
    const getLabelNamesDataType = () => {
        setlabelSchemaDescription('Datatype Description');
        setlabelSchemaName('Datatype Name');
        setlabelSchemaTitle('Datatype Title');
        setschemaType('DataType')
        setclasscolor('');
        setmixincolor('');
        setdatatypecolor('primary');
    }



    // dummy state
    const [schemaObjects, setSchemaObjects] = useState([
        {type: 'class', jsonData: {key: 'CLASS', someOtherKey: 'VALUE'}},
        {type: 'mixin', jsonData: {key: 'MIXIN', someOtherKey: 'VALUE2'}},
        // {type: 'datatype', jsonData: {key: 'DATATYPE', someOtherKey: 'VALUE3'}}
    ])

    const [activeSchema, setActiveSchema] = useState(schemaObjects[0])

    const onDeleteSchema = (index) => {
        alert('handle delete schema, remove index from schmeObjects Array')
    }


    const onJRTESTChangeHandler = (value, index) => {
        // console.log('ACTIVESCHEMA', activeSchema);
        // make copies of state
        const activeSchemaCopy = JSON.parse(JSON.stringify(activeSchema));
        const schemaObjectsCopy = JSON.parse(JSON.stringify(schemaObjects));

        // change values
        activeSchemaCopy.jsonData.key = value;
        schemaObjectsCopy[index].jsonData.key = value;

        // console.log('COPY', activeSchemaCopy)
        
        setActiveSchema(activeSchemaCopy);
        setSchemaObjects(schemaObjectsCopy);

        // console.log('VALUE', value, index)
    }
    
    console.log('SCHEMA2', finalJsonOutput(definitions, jsonData))

    return (<>
        {/* Navigation Bar */}
        <div style={{ background: "linear-gradient(to left, #e66465, #9198e5)", color: 'white', height : 48,textAlign : "center", paddingTop : 10}}>Experience Data Model (XDM) Tool</div>
        
        {/* Main Container */}
        <div style={{width: '100%', height: '100vh', background: 'blue', display: 'flex'}}>
            {/* Control Panel */}
            <div style={{background: '#DEE2E6', width: '100px'}}>
            {/* <div>Class</div>
                <div>Mixin</div>
                <div>Data Type</div> */}
                <div>
                    <Button variant="contained" color={classColor} className={classes.button} onClick={getLabelNamesClass}>
                        Class </Button>
                        <br />
                        </div>
                <div>
                    <Button variant="contained" color={classColor} className={classes.button} onClick={getLabelNamesMixin}>
                        Mixin </Button>
                        <br />
                        </div>
                <div>
                    <Button variant="contained" color={classColor} className={classes.button} onClick={getLabelNamesDataType}>
                        Datatype</Button>
                        <br />
                        </div>
            </div>

            {/* Left and Right Splitter Pane */}
            <Splitter style={{height: '100%', width: '100%'}} layout="horizontal">
                <SplitterPanel >
                    <LeftPanel 
                    onJRTESTChange={(value, index) => onJRTESTChangeHandler(value, index)}
                    schemas={schemaObjects} 
                    deleteSchema={(index) => onDeleteSchema(index)} 
                    setActiveSchema={(index) => setActiveSchema(schemaObjects[index])}/>
                    

                </SplitterPanel>
                <SplitterPanel>
                    {/* <RightPanel  jsonData={finalJsonOutput(definitions, jsonData)} /> */}
                    <RightPanel jsonData={activeSchema?.jsonData ?? {}}/>
                </SplitterPanel>
            </Splitter>

        </div>

    </>)
}

export default Schema2
