from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    def hash_password(self):
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
        return self.username

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(255), nullable=False)
    model = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    # Adds user_id as an Integer column on the car table which references the id column on user table
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    # Establishes object relation between car-user so we can grab values like car.user.username
    user = db.relationship("User")

# TODO: Add your models below, remember to add a new migration and upgrade database
class Constituent(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    street_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Integer)
    blocked = db.Column(db.Boolean, default=False)
    request_id = db.Column(db.Integer, db.ForeignKey('request.requester'))
    request = db.relationship("Request")


class LocalOfficial(db.Model): 
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    position = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    street_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Integer, nullable=False)

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False)
    progress = db.Column(db.String(255), nullable=False)
    seen = db.Column(db.Boolean, default = False)
    official_owner_id = db.Column(db.Integer, db.ForeignKey('localofficial.id'))
    official_owner = db.relationship("LocalOfficial")
    latitude = db.Column(db.Integer)
    longitude = db.Column(db.Integer)
    requester = db.Column(db.String(255), nullable=False)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    is_official = db.Column(db.Boolean, default= False, nullable = False)
    votes = db.Column(db.Integer, default = 0)
    