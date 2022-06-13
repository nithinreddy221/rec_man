# resource_management
Teams and employee management system with flask and react.
<p>#Requriments<br>
   Linux 20.04<br>
   Python 3.8.10<br>
   npm 8.11.0<br>
   node 16.15.1<br>
   psql (PostgreSQL) 12.11 <br>
</p>
 <p>
   <h3>Database setup:</h3><br/>
  Install PostgreSQL(https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04)
  Create database `mydb` for user `myuser` with password of `mypass`
 </p>

 Project Clone:<br>
 Open your terminal and type below command:
 <pre>git clone https://github.com/nithinreddy221/rec_man.git</pre>
 <h3>#Flask setup</h3><br>
<p>Go to flask root directory of project by below command
  <pre> cd rec_man/flask-server</pre>
  Install pip
  <pre>sudo apt-get install python3-pip</pre>
  Install virtual env
  <pre>sudo pip3 install virtualenv</pre>
  Setup virtual env to project
  <pre>virtualenv -p python@3.8 venv</pre>
  Activate viryual env for project 
  <pre>source venv/bin/activate</pre>
  install all reqiriments for backend flask app
  <pre>pip3 install -r requirements.txt</pre>
  If you alreay installed db with differnt config then open `flask-server/app.py`, and replace bold text with your crediantials.
  <pre>app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://<b>myuser</b>:<b>mypass</b>@localhost:5432/<b>mydb</b>"</pre>
  Type python in terminal and type `Python3` it will open python shell and follow below
  <pre>from app import db</pre>
  <pre>db.create_all()</pre>
  and exit from shell.<br><br>
  Now we can run the project
  <pre>python3 app.py</pre>
</p><br><br>
<p>
You can check all urls by Insomnia application (https://docs.insomnia.rest/insomnia/install)
You can export `projectURLS` file to that application and you can test all endpoints from there.
<p><br><br>
<h3>#React Setup:</h3><br>
   <b>NOTE:</b> should have npm and node installed in our system (REF: https://linuxhint.com/install-node-js-npm-ubuntu-s20-04/)<br>
  Go to react root folder
   <pre>cd rec_man/client</pre>
  Install dependencies by
   <pre>npm install</pre>
  Now start react by
  <pre>npm start</pre>
</p>
<br>
<br>
<br>


<h2>Project & Endpoints</h2><br>
<h3>Flask(backend):</h3>
   Default it will run on the port <b>5000</b> so we can access on http://127.0.0.1:5000/<br>
   <p>
      Mainly the complete project runs on 2 tables(Models) Team, Role<br>
    <h4>Team End points:</h4>
   <p>1. It will pull all Teams in our project GET req : (http://127.0.0.1:5000/teams), responce below
   <pre>[
	{
		"description": "Handels all deployment activities (CICD)",
		"id": 1,
		"title": "Deployment"
	},
	{
		"description": "Handels all Development activities (Backend)",
		"id": 2,
		"title": "Backend Development Team"
	},
	{
		"description": "Handels all Development activities (FrontEnd)",
		"id": 4,
		"title": "FrontEnd Development Team"
	}
]</pre>
   formate: list of dict<br>
   In case no recards found empty list will be returnd
   </p><br>
   <p> get teams by id if found below responce with 200 other wise returns 404 (http://127.0.0.1:5000/team/<b>id</b>)
<pre>
{
	"description": "Handels all deployment activities (CICD)",
	"id": 1,
	"title": "Deployment"
}
</pre>
</p><br>
   <p>Create team POST req: (http://127.0.0.1:5000/team)
   Post data:
      <pre>{
	"title": "Testing",
	"description": "Handels all testing activities"
}</pre><br>
and it will crate data in db and return responce 

<pre>{
	"description": "Handels all Development activities (FrontEnd)",
	"id": 5,
	"title": "FrontEnd Development Team"
}
</pre></p><br>

   <p>Update http://127.0.0.1:5000/team/<b>id</b>
<pre>{
		"description": "Handels all deployment activities (CICD)",
		"title": "Deployment"
	}
</pre></p><br>
   <p>Delete : http://127.0.0.1:5000/team/<b>id</b><br>
      It will delet that id team if found otherwise it will return 404
      </p><br><br><br>


<h4>Role End points</h4>
<p>1. To get all rolls (GET req) returns list if dict(http://127.0.0.1:5000/roles)<pre>[
	{
		"emp_name": "MAn",
		"exp": 3,
		"id": 17,
		"name": "Devops Support",
		"team_id": 4
	},
	{
		"emp_name": "MAn",
		"exp": 6,
		"id": 18,
		"name": "Devops",
		"team_id": 4
	}]</pre></p><br>
   
<p>2. get Team by ID (http://127.0.0.1:5000/role/<b>id</b>) if found returns below otherwise 404.<pre>{
	"emp_name": "MAn",
	"exp": 6,
	"id": 18,
	"name": "Devops",
	"team_id": 4
}</pre></p><br>
<p>3. Create rile POST to http://127.0.0.1:5000/role it should valid team_id other wise it will raise team not found erroe<pre>
<b>POST Data</b>{
	"name": "vongar",
	"emp_name": "calm",
	"exp": 2,
	"team_id": 2
}</pre><pre><b>if Team not found</b>
{
	"Error": "Role cratio failed - Team not found with Team ID {team_id}"
}
</pre></p><br>
<p>4. Update (PUT): http://127.0.0.1:5000/role/<b>id</b><pre>
{
	"name": "Devops Support",
	"emp_name": "Bittu",
	"exp": 6,
	"team_id": 4
}</pre></p><br>
<p>5.Delete: http://127.0.0.1:5000/role/<b>id</b></p><br>
