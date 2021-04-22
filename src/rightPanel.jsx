import React, { useEffect, useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale    from 'react-json-editor-ajrm/locale/en';
import { Octokit } from "@octokit/core";
import { addPropertyHandler, finalJsonOutput, getDefaultDefinitions, getDefaultJson, initialObject, plusHandler, updateValue, deleteProp } from "./xdm2";
// import TextField from "@material-ui/core/TextField";
import { ActionButton, Button } from '@react-spectrum/button';
import { AlertDialog, Dialog, DialogTrigger } from '@react-spectrum/dialog';
import { Heading } from '@react-spectrum/text';
import { Flex } from '@react-spectrum/layout';
import { Link } from '@react-spectrum/link';
import { Header, Divider, Content, Form, Footer, Checkbox, ButtonGroup, Text, TextField} from '@adobe/react-spectrum'
import Alias from '@spectrum-icons/workflow/Alias';
import Minimize from "@spectrum-icons/workflow/Minimize";
import Maximize from "@spectrum-icons/workflow/Maximize";



const RightPanel = (props) => {

    // console.log('RIGHTPANEL', props)
    const [jsonData, setJsonData] = useState({});
    const [minimized , setMinimized] = useState(false)
    const [schemaName, setschemaName] = useState('');
    // const [definitions, setDefinitions] = useState(getDefaultDefinitions());

    const [prTitle, setPrTitle] = useState("");
    const [prBody, setPrBody] = useState("");
    const [prBranch, setPrBranch] = useState("");
    const [prUsername, setPrUsername] = useState("");

    const { createPullRequest } = require("octokit-plugin-create-pull-request");
    const MyOctokit = Octokit.plugin(createPullRequest);
    const TOKEN = "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"; // create token at https://github.com/settings/tokens/new?scopes=repo
    const octokit = new MyOctokit({
        auth: TOKEN,
    });

    const createPR = () => {
        console.log(props.schemaName);
        console.log(prTitle);
        console.log(prBody);
        console.log(prBranch);
        console.log(prUsername);
       //path = components/mixins/profile
       let xdmPah = ""
       if (props.type === 'mixin'){
        xdmPah = `components/mixins/${props.behaviour}/${props.schemaName}.schema.json`
    }else{
        xdmPah = `components/classes/${props.schemaName}.schema.json`
    }
    
    
        octokit
            .createPullRequest({
                owner: "manvithchandra19",
                repo: "XDM1",
                title: `${prTitle} Created by ${prUsername}`,
                body: `${prBody} `,
                base: "main" /* optional: defaults to default branch */,
                head: `${prBranch}`,
                changes: [
                    {
                        files: {
                            [xdmPah]: {
                                content:  JSON.stringify(jsonData, null, "\t")  
                            },
                        },
                        commit: `commiting ${props.schemaName}.schema.json changes`,
                    },
                ],
            })
            .then((pr) => {
                console.log(pr.data.number)
                alert("PR Created")
                setPrTitle('');
                setPrBody('');
                setPrBranch('');
                setPrUsername('');
            });
    };

    useEffect(() => {
        if (props.jsonData) {
            // console.log('RIGHTPANEL', props.jsonData)
            
            let jsonString = JSON.stringify(props.jsonData)
            console.log(jsonString);
            jsonString = jsonString.replace("definitionName",props.schemaName)
            if (props.type === 'mixin'){
                jsonString = jsonString.replace("meta:extends", "meta:intendedToExtend")
            }
            const copy = JSON.parse(jsonString);
            setJsonData(copy)
        } else {
            setJsonData(undefined)
        }
    }, [props.jsonData]) 

    const onWindowAction = (val) => {
        setMinimized(val)
    }
    
    function IsValidJSONString(str) {
        try {
            JSON.parse(JSON.stringify(str));
        } catch (e) {
            return false;
        }
        return true;
    }

    const onChangeJson = (e)  => {
        const validjson = IsValidJSONString(e)
        
            if (validjson){
            return  props.getobjectfromJson(e)
            }
        
        
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: '5px' ,backgroundColor : '#1E1E1E' }}>
        {!minimized ? <div >
        <div style={{position: 'absolute', right: '30px', bottom: '10px', margin: '10px', zIndex: '10'}}>
        <ActionButton width="size-115" marginEnd="size-10"
                                onPress={() => onWindowAction(true)}
                            >
                                <Minimize/>
                            </ActionButton>
            <DialogTrigger>
            
                <ActionButton width="size-100"><Alias></Alias></ActionButton>
                {(close) => (
                    <Dialog>
                    <Heading>
                        <Flex alignItems="center" gap="size-100">
                        {/* <Book size="S" /> */}
                        <Text>Create a Pull Request</Text>
                        </Flex>
                    </Heading>

                    <Divider />
                    <Content>
                        <Form>
                        <TextField label="Title" placeholder="Pull Request Title" autoFocus  onChange={setPrTitle} />
                        <TextField label="Description" placeholder="Pull Request Description" onChange={setPrBody} />
                        <TextField label="Branch" placeholder="main" onChange={setPrBranch}/>
                        <TextField label="Username" placeholder="mprabhak@adobe.com" onChange={setPrUsername} />
                        </Form>
                    </Content>
                    <Footer>
                        {/* <Checkbox>
                        I want to receive updates for exclusive offers in my area.
                        </Checkbox> */}
                    </Footer>
                    <ButtonGroup>
                        <Button variant="secondary" onPress={close}>
                        Cancel
                        </Button>
                        <Button variant="cta" onPress={close} onPress={() => {createPR(); }}>
                        Create
                        </Button>
                    </ButtonGroup>
                    </Dialog>
                )}
            </DialogTrigger>
            {/* <TextField id="outlined-basic" label="PR Title" variant="outlined" value={prTitle} onChange={(e) => setPrTitle(e.target.value)}/>
            &nbsp;
            <TextField  id="outlined-basic" label="PR Description" variant="outlined" value={prBody} onChange={(e) => setPrBody(e.target.value)}/>
            &nbsp;
            <TextField  id="outlined-basic" label="PR Branch" variant="outlined" value={prBranch} onChange={(e) => setPrBranch(e.target.value)}/>
            &nbsp;
            <TextField   id="outlined-basic" label="Username" variant="outlined" value={prUsername} onChange={(e) => setPrUsername(e.target.value)}/>
            &nbsp;
            <Button variant="contained"   onClick={() => { createPR(); }}>Create PR</Button>
             */}
        
        </div>
        <JSONInput
            id="json-panel-1"
            placeholder={ jsonData ?? {}} // data to display
            locale={locale}
            confirmGood={false}
            // reset={true}
            width="100%"
            height="100%"
            onChange = {(e) => onChangeJson(e.jsObject)}
            colors={{
                string: "#DAA520" // overrides theme colors with whatever color value you want
            }}
            // height="100%"
        />
        
    </div> : <div> <ActionButton width="size-115" marginEnd="size-10"
                                onPress={() => onWindowAction(false)}
                            >
                                <Maximize/>
                                {/* <Maximize /> */}
                            </ActionButton></div>}
        </div>
    )
}

export default RightPanel
