from flask_bcrypt import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

user_request = db.Table('user_request',
                        db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                        db.Column('request_id', db.Integer, db.ForeignKey('request.id')),
                        db.Column('liked', db.Boolean)
                        )

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    street_address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.String(255))
    blocked = db.Column(db.Boolean, default=False)
    upvoted_requests = db.relationship('Request', secondary=user_request, backref='user')
    position = db.Column(db.String(255))

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

class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=False)
    progress = db.Column(db.Integer, default=0)
    seen = db.Column(db.Boolean, default = False)
    assigned_to = db.Column(db.String(255))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    requester = db.Column(db.Integer, db.ForeignKey('user.id'))
    votes = db.Column(db.Integer, default = 0)
    messages = db.relationship("Message")
   

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable = False)
    username = db.Column(db.String(255), nullable = False)
    text = db.Column(db.String(2500), nullable = False)
    is_official = db.Column(db.Boolean, default= False, nullable = False)
    request_id = db.Column(db.Integer, db.ForeignKey('request.id'))
    request = db.relationship("Request") 
