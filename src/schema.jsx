import React, { useState, useEffect } from "react";
import "./schema.css";
import {NavLink} from "reactstrap";
import { Octokit } from "@octokit/core";

const { createPullRequest } = require("octokit-plugin-create-pull-request");

const Schema = () => {
  const [schemaType, setSchemaType] = useState("class");
  const [schemaName, setSchemaName] = useState("");
  const [titlemain, setTitle] = useState("");
  const [titleXmd, setTitleXmd] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionXmd, setDescriptionXmd] = useState("");
  const [behaviour, setBehaviour] = useState("record");
  const [className, setClassName] = useState("profile");
  const [typemain, setType] = useState("string");
  const [metaStatus, setmetastatus] = useState("experimental");
  const [jsonOutput, setjsonOutput] = useState("");
  
  
  // const octokit = new Octokit({ 
  //   auth: '328087a394cd90ff8fe51d17912cd136178456a8',
  // }), owner = 'manvithchandra19',
  //     repo = 'test',
  //     title = 'My Test Pull Request',
  //     body  = 'This pull request is a test!',
  //     head  = 'gh-pages',
  //     base  = 'gh-pages';

  const MyOctokit = Octokit.plugin(createPullRequest);

  const TOKEN = "328087a394cd90ff8fe51d17912cd136178456a8"; // create token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new MyOctokit({
    auth: TOKEN,
  });

  const [inputList, setInputList] = useState([{ titleID: '', titleXDM: "", typeXDM: "",descriptionXDM : '' }]);

  const schema_Type = ["class", "mixin", "datatype"];
  const behaviours = ["record", "timeseries"];
  const classname = ["profile", "experience event", "product"];
  const types = ["string", "integer", "data-time", "date", "array", "object"];
  const metastatus = ["experimental", "stable"];

  const [labeloption, setlabel] = useState("Behaviour");
  const [valueoption, setvalue] = useState(behaviours);

  const handleInputChange = (e, index) => {
    
    const { name, value } = e.target;
    console.log(e.target.name);
    
    const list = [...inputList];
    console.log(list);
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { titleID: '', titleXDM: "", typeXDM: "",descriptionXDM : '' }]);
    console.log(inputList);
  };

  const submitApi = () => {
    var details = {
      metaStatus: metaStatus,
      descriptionXmd: descriptionXmd,
      type: typemain,
      description: description,
      title: titlemain,
      titleXmd: inputList.titleXDM,
      behaviour: behaviour,
      className: className,
      schemaName: schemaName,
      schemaType: schemaType,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const pdfData = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    };
    fetch("http://localhost:5000/getData", pdfData)
      .then((response) => response.json())
      .then((response) => {
        setjsonOutput(JSON.stringify(response, undefined, 4));
        console.log(response); // pass to pr
        clearText();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const clearText = () => {
    setSchemaName("");
    setSchemaType("");
    setDescriptionXmd("");
    setDescription("");
    setTitleXmd("");
    setSchemaType("class");
    setmetastatus("");
    // setType
    setTitle("");
  };

  //let labeloption = 'Behaviour', valueoption = behaviours;
  const handleOption = (e) => {
    setSchemaType(e.target.value);
    if (e.target.value === "class") {
      setlabel("Behaviour");
      setvalue(behaviours);
    } else if (e.target.value === "mixin") {
      setlabel("Class Name");
      setvalue(classname);
    }
  };

  const handleclass = (e) => {
    if (schemaType === "class") {
      setBehaviour(e.target.value);

    } else if (schemaType === "mixin") {
      setClassName(e.target.value);
    }
  };

  const createPR = () => {

    octokit.createPullRequest({
      owner: "manvithchandra19",
      repo: "test",
      title: "pull request title",
      body: "pull request description",
      base: "master" /* optional: defaults to default branch */,
      head: "pull-request-branch-name",
      changes: [
        {
          /* optional: if `files` is not passed, an empty commit is created instead */
          // files: {
          //   "path/to/file1.txt": "Content for file1",
          //   "path/to/file2.png": {
          //     content: "_base64_encoded_content_",
          //     encoding: "base64",
          //   },
          //   // deletes file if it exists,
          //   "path/to/file3.txt": null,
          //   // updates file based on current content
          //   "path/to/file4.txt": ({ exists, encoding, content }) => {
          //     // do not create the file if it does not exist
          //     if (!exists) return null;
  
          //     return Buffer.from(content, encoding)
          //       .toString("utf-8")
          //       .toUpperCase();
          //   },
          // },
          commit: "creating file1.txt, file2.png, deleting file3.txt, updating file4.txt (if it exists)",
        },
      ],
    })
    .then((pr) => console.log(pr.data.number));
    

  }

  

  return (
    <div>
        <h3 style={{ textAlign: "center" }}>XDM Tool</h3>
      
      <div className="split left">
        <div className="centered ">
          <label>Schema Type </label>
          <select onChange={handleOption}>
            {schema_Type.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <label>{labeloption}</label>
          <select onChange={handleclass}>
            {valueoption.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <label>Schema Name</label>
          <input
            type="text"
            value={schemaName}
            onChange={(e) => setSchemaName(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Schema Title</label>
          <input
            type="text"
            value={titlemain}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <br /> <br />
          <label>Schema Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />{" "}
          <br /> <br />
          {inputList.map((x, i) => {
              return (  <div key={i}>
                    <label> XDM TitleID</label>
                <input
                  type="text"
                  name = "titleID"
                  value={x.titleID}
                  onChange={e => handleInputChange(e, i)}
                />{" "}  <br />
                <br />
              

                <label> XDM Title</label>
                <input
                  type="text"
                  name = "titleXDM"
                  value={x.titleXDM}
                  onChange={e => handleInputChange(e, i)}
                />{" "}
                <br /> <br />
                <label> XDM Type </label>
                <select onChange={e => handleInputChange(e, i)}>
                  {types.map((item) => (
                    <option key={item} name = 'typeXDM' value={x.typeXDM}>
                      {item}
                    </option>
                  ))}
                </select>{" "}
                <br />
                <br />
                <label> XDM Description </label>
                <input
                  type="text"
                  value={x.descriptionXDM}
                  name = 'descriptionXDM'
                  onChange={e => handleInputChange(e, i)}
                />{" "}

                <br /> <br />   
              </div>)
          
          })}
          <label>Meta Status </label>
          <select onChange={(e) => setmetastatus(e.target.value)}>
            {metastatus.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>{" "}
          <br />
          <br />
          <button onClick={handleAddClick}>Add Properties</button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button onClick={submitApi}>Add Object</button>
          <br />
          <br />
          <button onClick={submitApi}>Submit</button>
          <button onClick={() => { createPR()}}>Create PR</button>
          <NavLink href="https://github.com/manvithchandra19/test/compare"> {" "} Submit to GitHub </NavLink>
          <br />
          <br />
        </div>
      </div>
      <div className="split right">

        <textarea className="textArea" defaultValue={jsonOutput}></textarea>
      </div>
    </div>
  );
};

export default Schema;
