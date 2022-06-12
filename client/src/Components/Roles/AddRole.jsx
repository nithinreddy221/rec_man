import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const AddRole = () => {
  const [name, setName] = useState("");
  const [empName, setEmpName] = useState("");
  const [exp, setExp] = useState("");
  const [teamId, setTeamId] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamFromRole, setSelectedTeamFromRole] = useState("");
  const [teamData, setTeamData] = useState([{}]);

  useEffect(() => {
    axios.get("/teams").then((data) => {
      let teamsData = [
        { id: "", title: "Select Team", description: "Select Team" },
        ...data.data,
      ];
      setTeamData(teamsData);
      console.log("teams data ---> ", data, data.data);
    });
  }, []);

  const onSubmitTeamForm = () => {
    let obj = {
      name: name,
      emp_name: empName,
      exp: +exp,
      team_id: +selectedTeam,
    };
    console.log("obj ---> ", obj);
    axios.post(`/role`, obj).then((data) => {
      setName("");
      setEmpName("");
      setExp("");
      setTeamId("");
      setSelectedTeamFromRole('');
      if (data.status === 201) setStatusMsg("Role Created Successfully");
      console.log("add role data ---> ", data, data.data);
    });
  };

  return (
    <div>
      {/* <Link to='/'>back</Link> */}
      <p>Add Role</p>
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setStatusMsg("");
                setName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Employee Name</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Employee Name"
              value={empName}
              onChange={(e) => {
                setStatusMsg("");
                setEmpName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Experience</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              placeholder="Experience"
              value={exp}
              onChange={(e) => {
                setStatusMsg("");
                setExp(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Team</label>
          <div className="col-sm-10">
            <select
              className="form-control"
              onChange={(e) => {
                console.log("----", e.target.value);
                setSelectedTeam(e.target.value);
                setSelectedTeamFromRole(e.target.value);
              }}
              value={selectedTeamFromRole}
            >
              {teamData.map((team) => {
                return (
                  <option value={team.id}>
                    {team.id + " - " + team.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onSubmitTeamForm}
        >
          Submit
        </button>
      </form>
      {statusMsg ? <p>{statusMsg}</p> : null}
    </div>
  );
};

export default AddRole;
