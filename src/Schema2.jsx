import { Splitter, SplitterPanel } from 'primereact/splitter'
import React, { useState } from 'react'
import LeftPanel from './LeftPanel'
import RightPanel from './rightPanel'
import './Schema2.css'

// MAIN COMPONENT
const Schema2 = () => {

    // dummy state
    const [schemaObjects, setSchemaObjects] = useState([
        {type: 'class', jsonData: {key: 'CLASS', someOtherKey: 'VALUE'}},
        // {type: 'mixin', jsonData: {key: 'MIXIN', someOtherKey: 'VALUE2'}},
        // {type: 'datatype', jsonData: {key: 'DATATYPE', someOtherKey: 'VALUE3'}}
    ])

    const [activeSchema, setActiveSchema] = useState(schemaObjects[0])

    const onDeleteSchema = (index) => {
        alert('handle delete schema, remove index from schmeObjects Array')
    }
    

    return (<>
        {/* Navigation Bar */}
        <div style={{ background: "linear-gradient(to left, #e66465, #9198e5)", color: 'white', height : 48,textAlign : "center", paddingTop : 10}}>Experience Data Model (XDM) Tool</div>
        
        {/* Main Container */}
        <div style={{width: '100%', height: '100vh', background: 'blue', display: 'flex'}}>
            {/* Control Panel */}
            <div style={{background: '#DEE2E6', width: '70px'}}>
                <div>Class</div>
                <div>Mixin</div>
                <div>Data Type</div>
            </div>
            {/* Left and Right Splitter Pane */}
            <Splitter style={{height: '100%', width: '100%'}} layout="horizontal">
                <SplitterPanel >
                    <LeftPanel schemas={schemaObjects} deleteSchema={(index) => onDeleteSchema(index)} setActiveSchema={(index) => setActiveSchema(schemaObjects[index])}/>
                </SplitterPanel>
                <SplitterPanel>
                    <RightPanel  jsonData={activeSchema?.jsonData ?? {}} onPRClick={() => alert('HANDLE ON PR CLICK')}/>
                </SplitterPanel>
            </Splitter>

        </div>

    </>)
}

export default Schema2
