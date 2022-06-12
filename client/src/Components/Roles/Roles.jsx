import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { GiMove } from "react-icons/gi";
import { IoAddCircleSharp } from "react-icons/io5";

const Roles = () => {
  const [roleData, setRoleData] = useState([{}]);
  const [teamData, setTeamData] = useState([{}]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedTeamFromRole, setSelectedTeamFromRole] = useState({});
  const [showTable, setShowTable] = useState(true);

  useEffect(() => {
    axios.get("/roles").then((data) => {
      setRoleData(data.data);
      console.log("roles data ---> ", data, data.data);
    });
    axios.get("/teams").then((data) => {
      let teamsData = [
        // { id: 0, title: "Select Team", description: "Select Team" },
        ...data.data,
      ];
      setTeamData(teamsData);
      console.log("teams data ---> ", data, data.data);
    });
  }, [showTable]);

  const onRolesDelete = (id) => {
    console.log("entered delete role");
    axios.delete(`/role/${id}`).then((data) => {
      // setRoleData(data.data);
      // setShowTable(true);
      updateTable();

      console.log("roles delete data ---> ", data, data.data);
    });
  };

  const onSubmit = () => {
    console.log("entered move role", selectedTeam);
    axios
      .put(`/role/${selectedRole}`, {
        team_id: +selectedTeam,
      })
      .then((data) => {
        // setRoleData(data.data);
        setShowTable(true);
        console.log("roles move data ---> ", data, data.data);
      });
  };

  const updateTable = () => {
    axios.get("/roles").then((data) => {
      setRoleData(data.data);
      console.log("roles data ---> ", data, data.data);
    });
  };

  const getTeamById = (id) => {
    axios.get(`/team/${id}`).then((data) => {
      setSelectedTeamFromRole(data.data.id);
      console.log("team by id data ---> ", data, data.data);
    });
  };
  return (
    <div>
      <div class="row">
        <div class="col">
          <Link to="/">back</Link>
        </div>
        <div class="col-5 text-center">
          <h2>Roles</h2>
        </div>
        <div class="col float-right">
        <Link className="link-primary" to="/roles/addRole">
          Add Role<IoAddCircleSharp size={40}></IoAddCircleSharp>
        </Link>
        </div>
      </div>
      {/* <p>
        Roles{" "}
        <Link to="/roles/addRole">
          <IoAddCircleSharp size={40}></IoAddCircleSharp>
        </Link>
      </p> */}
      {roleData && roleData.length ? (
        showTable ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Role</th>
                <th scope="col">Experience</th>
                <th scope="col">Delete</th>
                <th scope="col">Move</th>
              </tr>
            </thead>
            <tbody>
              {roleData && roleData.length
                ? roleData.map((role, i) => {
                    return (
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{role.emp_name}</td>
                        <td>{role.name}</td>
                        <td>{role.exp}</td>
                        <td onClick={() => onRolesDelete(role.id)}>
                          <AiFillDelete />
                        </td>
                        <td
                          className="btn btn-default btn-rounded mb-4"
                          data-toggle="modal"
                          data-target="#modalLoginForm"
                          onClick={() => {
                            setSelectedRole(role.id);
                            setSelectedTeam(role.team_id);
                            // setSelectedTeamFromRole(role.team_id)
                            getTeamById(role.team_id);
                            setShowTable(false);
                          }}
                        >
                          <GiMove />
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        ) : (
          <div>
            <p>Select Team</p>
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
            <button onClick={onSubmit}>Submit</button>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Roles;
