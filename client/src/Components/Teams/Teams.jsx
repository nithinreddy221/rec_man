import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";

const Teams = () => {
  const [teamData, setTeamData] = useState([{}]);

  useEffect(() => {
    axios.get("/teams").then((data) => {
      setTeamData(data.data);
      console.log("teams data ---> ", data, data.data);
    });
  }, []);

  return (
    <div>
      <div class="row">
        <div class="col">
          <Link to="/">back</Link>
        </div>
        <div class="col-6 text-center">
          <h2>Teams</h2>
        </div>
        <div class="col float-right">
          <Link className="link-primary" to="/teams/addTeam">
            Add Team <IoAddCircleSharp size={40}></IoAddCircleSharp>
          </Link>
        </div>
      </div>
      {/* <p>Teams <Link to='/teams/addTeam'><IoAddCircleSharp size={40}></IoAddCircleSharp></Link></p> */}
      {teamData && teamData.length ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {teamData && teamData.length
              ? teamData.map((team, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>
                        <Link to={`/teams/${team.id}`}>{team.title}</Link>
                      </td>
                      <td>{team.description}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Teams;
