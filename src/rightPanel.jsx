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
// import Button from '@material-ui/core/Button';
// import { Button } from '@react-spectrum';
// import {useDialogContainer} from '@adobe/react-spectrum';



const RightPanel = (props) => {

    // console.log('RIGHTPANEL', props)
    const [jsonData, setJsonData] = useState({});
    const [schemaName, setschemaName] = useState('');
    const [definitions, setDefinitions] = useState(getDefaultDefinitions());

    const [prTitle, setPrTitle] = useState("");
    const [prBody, setPrBody] = useState("");
    const [prBranch, setPrBranch] = useState("");
    const [prUsername, setPrUsername] = useState("");

    const { createPullRequest } = require("octokit-plugin-create-pull-request");
    const MyOctokit = Octokit.plugin(createPullRequest);
    const TOKEN = "1d65d15095869a5ac1f31e985588438afe27e95e"; // create token at https://github.com/settings/tokens/new?scopes=repo
    const octokit = new MyOctokit({
        auth: TOKEN,
    });

    const createPR = () => {
        console.log(schemaName);
        console.log(prTitle);
        console.log(prBody);
        console.log(prBranch);
        console.log(prUsername);
        octokit
            .createPullRequest({
                owner: "manvithchandra19",
                repo: "test1",
                title: `${prTitle} Created by ${prUsername}`,
                body: `${prBody} `,
                base: "master" /* optional: defaults to default branch */,
                head: `${prBranch}`,
                changes: [
                    {
                        files: {
                            [`${schemaName}.schema.json`]: {
                                content: JSON.stringify(finalJsonOutput(definitions, jsonData), undefined, 4),
                            },
                        },
                        commit: `commiting ${schemaName}.schema.json changes`,
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

    

    return (<div style={{display: 'flex', flexDirection: 'column', width: '100%', margin: '5px'}}>
        <div style={{position: 'absolute', right: '30px', bottom: '10px', margin: '10px', zIndex: '10'}}>
            
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
                        <TextField label="Title" placeholder="Pull Request Title" autoFocus />
                        <TextField label="Description" placeholder="Pull Request Description" />
                        <TextField label="Branch" placeholder="main" />
                        <TextField label="Username" placeholder="mprabhak@adobe.com" />
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
                        <Button variant="cta" onPress={close}>
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
            id="panel1"
            placeholder={jsonData ?? {}} // data to display
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
