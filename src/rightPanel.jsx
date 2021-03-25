import React, { useEffect, useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en';

const RightPanel = (props) => {

    const [jsonData, setJsonData] = useState({});

    useEffect(() => {
        const copy = JSON.parse(JSON.stringify(props.jsonData));
        setJsonData(copy)
    }, [props.jsonData])

    return (<div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <div style={{height: '70px'}}>BUTTONS FOR PR</div>
        <JSONInput
            id="panel1"
            placeholder={jsonData} // data to display
            locale={locale}
            confirmGood={false}
            reset={true}
            width="100%"
            height="100%"
            colors={{
                string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            height="100%"
        />
        
    </div>)
}

export default RightPanel
