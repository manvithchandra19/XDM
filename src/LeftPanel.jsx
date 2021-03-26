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
import { Dropdown } from 'primereact/dropdown';
import './Dropdown.css';

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

    const getLabelNamesDataType = () => {
        setlabelSchemaDescription('Datatype Description');
        setlabelSchemaName('Datatype Name');
        setlabelSchemaTitle('Datatype Title');
        setschemaType('DataType')
        setclasscolor('');
        setmixincolor('');
        setdatatypecolor('primary');
    }
    

    const renderHighLevelProperty1 = (val, i, plusProperty) => {
        console.log("Object Key =====" + i);
        const objKey = Object.keys(val)[0];
        const objVal = val[objKey];
        const keyValues = objKey.split(":");
        let nestedValues = [];
        if (objVal.type == "object") {
            for (let i2 = 0; i2 < objVal.properties.length; i2++)
                nestedValues.push(renderHighLevelProperty1(objVal.properties[i2], i + "." + i2, true));
        }
        return(
            <div style={{ marginLeft: '2.25rem' }}>
                {plusProperty ? <span style={{ marginLeft: '2.25rem' }} ></span> : null}
                <Fab size="small" aria-label="Add" className={classes.margin} onClick={plusHandlerFactory(i)}>
                    <AddIcon />
                </Fab>
                <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Namespace" variant="outlined" name="propertyNamespace"
                    value={keyValues[0]}
                    onChange={updateHandlerFactory("keyT", i)} />
                <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Name" variant="outlined" name="propertyName"
                    value={keyValues[1]}
                    onChange={updateHandlerFactory("keyN", i)} />
                <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Title" variant="outlined" name="propertyTitle"
                    value={objVal.title}
                    onChange={updateHandlerFactory("title", i)} />
                <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Data Type" variant="outlined" name="propertyType" 
                    value={objVal.type} 
                    onChange={updateHandlerFactory("type", i)}/>
                <TextField InputProps={{ className: classes.input }} InputLabelProps={{ shrink: true }} id="outlined-basic" label="Property Description" variant="outlined" name="propertyDescription"
                    value={objVal.description}
                    onChange={updateHandlerFactory("description", i)} />
                <IconButton style={{width: '50px'}} aria-label="Delete" className={classes.margin} onClick={() => deleteProperty(definitions, i)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
                {nestedValues.map((nv, ni) => {
                    console.log("nv",ni);
                    return nv
                })}
            </div>
        )
    }
    console.log('LEFTPANEL', props.schemas)

    return (
        <div>

            {props.schemas.map((obj, index) => {
                return <div 
                        onClick={() => props.setActiveSchema(index)}
                        key={index}
                        style={{height: '500px', width: '95%', background: '', borderRadius: '10px', margin: '20px'}}>
                        <div onClick={() => props.deleteSchema(index)}></div>
                        
                        <div className={classes.root}>
                        <TextField label={labelSchemaName} variant="filled" value={schemaName} onChange={(e) => setschemaName(e.target.value)} />
                        <TextField label={labelSchematitle} variant="filled" value={schemaTitle} onChange={(e) => setTitleMain(e.target.value)} />
                        <TextField label={labelschemaDescription} variant="filled" value={schemadescription} onChange={(e) => setDescription(e.target.value)} />
                        {labelSchemaName === "Class Name" ? <div className="dropdown-demo" style  = {{marginLeft : 10}}>
                        <Dropdown value={mixinBehaviour} options={behaviourVal} onChange={onmixinChange} optionLabel="name" placeholder="Behaviour" />
                        <br/><br/>
                        </div> : null}
                        {labelSchemaName === "Mixin Name" ? <div className="dropdown-demo" style  = {{marginLeft : 10}}>
                        <Dropdown value={className} options={classess} onChange={onClassChange} optionLabel="name" placeholder="Class Name" />
                        <br/><br/>
                        </div> : null}


                        </div>
                        

                        <div style={{ marginLeft: '2.25rem' }}>
            
            </div>
            <Button variant="contained" onClick={(e) => addDynamicPropertyRow()} >Add Property</Button>
            <br /><br />
            <table>
            <tbody>
                <tr>{definitions.CLAZZ.properties.map((val, index) =>
                (renderHighLevelProperty1(val, index, false)))}
                </tr>
                    </tbody>
                    </table>







                </div>
            })}
            

        </div>

    )

    
}

export default LeftPanel
