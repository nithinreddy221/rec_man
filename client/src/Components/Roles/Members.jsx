import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";


const Members = () => {
  const [membersData, setMembersData] = useState([{}]);
  let { id } = useParams();
  useEffect(() => {
    axios.get(`/team_mates/${id}`).then((data) => {
        setMembersData(data.data);
      console.log("members data ---> ", data, data.data);
    });
  }, []);

  const updateTable = () => {
    axios.get(`/team_mates/${id}`).then((data) => {
      setMembersData(data.data);
      console.log("members data ---> ", data, data.data);
    });
  }

  const onMemberDelete = (id) => {
    console.log("entered delete team mem");
    axios.delete(`/role/${id}`).then((data) => {
      updateTable();
      console.log("roles delete data ---> ", data, data.data);
    });
  };

  return (
    <div>
    {/* <Link to='/'>back</Link> */}
      <p>Teams</p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Experience</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
        {(membersData && membersData.length) ? membersData.map((member, i) => {
            return (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{member.name}</td>
                <td>{member.emp_name}</td>
                <td>{member.exp}</td>
                <td onClick={() => onMemberDelete(member.id)}>
                    <AiFillDelete />
                  </td>
              </tr>
            );
          }) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Members;
