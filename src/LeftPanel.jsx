import React from 'react'

const LeftPanel = (props) => {

    console.log('LEFTPANEL', props.schemas)

    return (
        <div>

            {props.schemas.map((obj, index) => {
                return <div 
                        onClick={() => props.setActiveSchema(index)}
                        key={index}
                        style={{height: '500px', width: '95%', background: 'lightgrey', borderRadius: '10px', margin: '20px'}}>
                        <div onClick={() => props.deleteSchema(index)}>delete button</div>
                    {obj.type}
                </div>
            })}
            

        </div>
    )
}

export default LeftPanel
