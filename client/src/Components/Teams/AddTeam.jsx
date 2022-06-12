import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const AddTeam = () => {
 
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const onSubmitTeamForm = () => {
        let obj = {
            "title": title,
	        "description": desc
        }
        console.log("obj ---> ", obj);
        axios.post(`/team`, obj).then((data) => {
            setTitle('');
            setDesc('');
            if(data.status === 201) setStatusMsg('Team Created Successfully')
            console.log("add team data ---> ", data, data.data);
          });
    }

  return (
    <div>
      {/* <Link to='/'>back</Link> */}
      <p>Add Team</p>
      <form>
        <div className="form-group row">
          <label  className="col-sm-2 col-form-label">
            Title
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e)=>{
                setStatusMsg(''                 )
                setTitle(e.target.value)}}
            />
          </div>
        </div>
        <div className="form-group row">
          <label  className="col-sm-2 col-form-label">
            Description
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={desc}
              onChange={(e)=>{
                setStatusMsg('')
                setDesc(e.target.value)}}
            />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={onSubmitTeamForm}>Submit</button>
      </form>
      {statusMsg ? <p>{statusMsg}</p> : null}
    </div>
  );
};

export default AddTeam;
