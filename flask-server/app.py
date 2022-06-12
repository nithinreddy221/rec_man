from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from marshmallow import Schema, fields
# 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


app = Flask(__name__)


app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://myuser:mypass@localhost:5432/mydb"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class Team(db.Model):
    __tablename__ = "team"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text)
    roles = db.relationship('Role', backref='post')

    def __repr__(self):
        return f'<Team "{self.title}">'

    @classmethod
    def get_all_teams(cls):
        return cls.query.all()

    @classmethod
    def get_team_by_id(cls, id):
        return cls.query.get_or_404(id)

    @staticmethod
    def get_team_by_name(cls, title):
        return cls.query.get_or_404(title)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class TeamsSchema(Schema):
    class Meta():
        fields = ('id', 'title', 'description')
    di = fields.Integer()
    title = fields.String()
    description = fields.String()


class Role(db.Model):
    __tablename__ = "role"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    emp_name = db.Column(db.String(100))
    exp = db.Column(db.Integer)
    team_id = db.Column(db.Integer, db.ForeignKey('team.id'))

    def __repr__(self):
        return f'<Role "{self.name} - {self.emp_name}">'

    @classmethod
    def get_all_rolls(cls):
        return cls.query.all()

    @classmethod
    def get_role_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_all_team_mates_by_team_id(cls, id):
        return cls.query.filter(team_id=id)


    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class RoleSchema(Schema):
    class Meta:
        fields = ('id', 'name', 'emp_name', 'exp', 'team_id')

    di = fields.Integer()
    name = fields.String()
    emp_name = fields.String()
    exp = fields.Integer()
    team = fields.Integer()

# All Routs

# Teams route


@app.route('/teams', methods=['GET'])
def get_all_teams():
    tem = Team.get_all_teams()
    serializer = TeamsSchema(many=True)
    data = serializer.dump(tem)

    return jsonify(data)


@app.route('/team', methods=['POST'])
def create_team():
    data = request.get_json()
    new_tem = Team(
        title=data.get("title"),
        description=data.get("description")
    )
    new_tem.save()

    seralizer = TeamsSchema()
    data = seralizer.dump(new_tem)

    return jsonify(data), 201


@app.route('/team/<int:id>', methods=['GET'])
def get_team(id):
    tem = Team.get_team_by_id(id)
    serializer = TeamsSchema()
    data = serializer.dump(tem)

    return jsonify(data), 200


@app.route('/team/<int:id>', methods=['PUT'])
def update_team(id):
    tem_to_update = Team.get_team_by_id(id)
    data = request.get_json()
    tem_to_update.title = data.get('title')
    tem_to_update.description = data.get('description')

    db.session.commit()

    seralizer = TeamsSchema()
    team_data = seralizer.dump(tem_to_update)

    return jsonify(team_data), 200


@app.route('/team/<int:id>', methods=['DELETE'])
def delete_team(id):
    tem_to_delete = Team.get_team_by_id(id)
    # del_title = tem_to_delete.title
    tem_to_delete.delete()

    return jsonify({"message": "Deleted"}), 204


# roles route

@app.route('/roles', methods=['GET'])
def get_all_roles():
    rol = Role.get_all_rolls()
    serializer = RoleSchema(many=True)
    data = serializer.dump(rol)

    return jsonify(data)


@app.route('/role', methods=['POST'])
def create_role():
    data = request.get_json()
    team_id = data.get("team_id")
    try:
        team_obj = Team.get_team_by_id(team_id)
    except Exception as e:
        return jsonify({"Error": "Role cratio faoled - Team not found with Team ID {team_id}"}), 404

    new_role = Role(
        name=data.get("name"),
        emp_name=data.get("emp_name"),
        exp=data.get("exp"),
        team_id=team_id
    )
    new_role.save()

    seralizer = RoleSchema()
    data = seralizer.dump(new_role)

    return jsonify(data), 201


@app.route('/role/<int:id>', methods=['GET'])
def get_role(id):
    rol = Role.get_role_by_id(id)
    serializer = RoleSchema()
    data = serializer.dump(rol)

    return jsonify(data), 200

@app.route('/team_mates/<int:team_id>', methods=['GET'])
def get_team_mates(team_id):
    tm_met = Role.query.filter(Role.team_id==team_id)
    serializer = RoleSchema(many=True)
    data = serializer.dump(tm_met)

    return jsonify(data), 200

@app.route('/teams_strength/', methods=['GET'])
def get_team_strength():
    tm_cn = Role.query.all()
    data = {}
    for rl in tm_cn:
        if rl.team_id in data.keys():
            data[rl.team_id] += 1
        else:
            data[rl.team_id] = 1

    return jsonify(data), 200

@app.route('/role/<int:id>', methods=['PUT'])
def update_role(id):
    data = request.get_json()
    team_id = data.get("team_id")
    try:
        team_obj = Team.get_team_by_id(team_id)
    except Exception as e:
        return jsonify({"Error": "Update failed - Team not found with Team ID {team_id}"}), 404

    rol_to_update = Role.get_role_by_id(id)
    if data.get('name'):
        rol_to_update.name = data.get('name')
    if data.get('emp_name'):
        rol_to_update.emp_name = data.get('emp_name')
    if data.get('exp'):
        rol_to_update.exp = data.get('exp')

    rol_to_update.team_id = team_id

    db.session.commit()

    seralizer = RoleSchema()
    role_data = seralizer.dump(rol_to_update)

    return jsonify(role_data), 200


@app.route('/role/<int:id>', methods=['DELETE'])
def delete_role(id):
    rol_to_delete = Role.get_role_by_id(id)
    rol_to_delete.delete()

    return jsonify({"message": "Deleted"}), 204


if __name__ == "__main__":
    app.run(debug=False)
