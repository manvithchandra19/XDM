import React, { useEffect, useState } from 'react'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en';
import { Octokit } from "@octokit/core";
import { addPropertyHandler, finalJsonOutput, getDefaultDefinitions, getDefaultJson, initialObject, plusHandler, updateValue, deleteProp } from "./xdm2";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
// import {useDialogContainer} from '@adobe/react-spectrum';



const RightPanel = (props) => {

    console.log('RIGHTPANEL', props)
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
        // console.log('RIGHTPANEL', props.jsonData)
        const copy = JSON.parse(JSON.stringify(props.jsonData));
        setJsonData(copy)
    }, [props.jsonData])

    return (<div style={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '5px' }}>
        <div style={{ height: '100px', align: 'center' }}>


            <TextField id="outlined-basic" label="PR Title" variant="outlined" value={prTitle} onChange={(e) => setPrTitle(e.target.value)} />
            &nbsp;
            <TextField id="outlined-basic" label="PR Description" variant="outlined" value={prBody} onChange={(e) => setPrBody(e.target.value)} />
            &nbsp;
            <TextField id="outlined-basic" label="PR Branch" variant="outlined" value={prBranch} onChange={(e) => setPrBranch(e.target.value)} />
            &nbsp;
            <TextField id="outlined-basic" label="Username" variant="outlined" value={prUsername} onChange={(e) => setPrUsername(e.target.value)} />
            &nbsp;
            <Button variant="contained" onClick={() => { createPR(); }}>Create PR</Button>


        </div>
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
