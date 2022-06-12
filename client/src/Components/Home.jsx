import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="row mx-md-n5 mt-3">
        <h2 className="text-center">Resourse Management</h2>
      <div className="row px-md-5">
        <div className="p-3 border bg-light">
          <Link className="list-group-item text-center" to="/teams">
            Get all teams
          </Link>
        </div>
      </div>
      <div className="row px-md-5 mt-3">
        <div className="p-3 border bg-light">
          {" "}
          <Link className="list-group-item text-center" to="/roles">
            Get all roles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
