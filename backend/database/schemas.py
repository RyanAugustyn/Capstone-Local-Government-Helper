from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields
from database.models import User, Car, Request, Message

ma = Marshmallow()

# Auth Schemas
class RegisterSchema(ma.Schema):
    """
    Schema used for registration, includes password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    password = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    street_address = fields.String(required=True)
    city = fields.String(required=True)
    zip = fields.Integer(required=True)
    phone = fields.Integer()
    class Meta:
        fields = ("id", "username",  "password", "first_name", "last_name", "email", "street_address", "city", "zip", "phone")

    @post_load
    def create_user(self, data, **kwargs):
        return User(**data)
    
register_schema = RegisterSchema()
    
class UserSchema(ma.Schema):
    """
    Schema used for displaying users, does NOT include password
    """
    id = fields.Integer(primary_key=True)
    username = fields.String(required=True)
    first_name = fields.String(required=True)
    last_name = fields.String(required=True)
    email = fields.String(required=True)
    street_address = fields.String(required=True)
    city = fields.String(required=True)
    zip = fields.Integer(required=True)
    phone = fields.Integer()
    blocked = fields.Boolean()
    position = fields.String(required=True)
    class Meta:
        fields = ("id", "username", "first_name", "last_name", "email", "street_address", "city", "zip", "phone", "blocked", "position")


user_schema = UserSchema()
users_schema = UserSchema(many=True)


# Car Schemas
class CarSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    make = fields.String(required=True)
    model = fields.String(required=True)
    year = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta:
        fields = ("id", "make", "model", "year", "user_id", "user")
    
    @post_load
    def create_car(self, data, **kwargs):
        return Car(**data)

car_schema = CarSchema()
cars_schema = CarSchema(many=True)


# TODO: Add your schemas below

class RequestSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    type = fields.String(required=True)
    description = fields.String(required=True)
    progress = fields.Integer()
    seen = fields.Boolean()
    assigned_to = fields.String()
    latitude = fields.Integer(required=True)
    longitude = fields.Integer(required=True)
    requester = fields.String(required=True)
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta: 
        fields = ("id", "type", "progress", "seen", "official_owner_id", "official_owner", "latitude", "longitude", "requester")

    @post_load
    def create_constitunet(self, data, **kwargs):
        return Request(**data)
    
request_schema = RequestSchema()
requests_schema = RequestSchema(many=True)


class MessageSchema(ma.Schema):
    id = fields.Integer(primary_key=True)
    name = fields.String(required=True)
    is_official = fields.String(required=True)
    votes = fields.Integer()
    user_id = fields.Integer()
    user = ma.Nested(UserSchema, many=False)
    class Meta: 
        fields = ("id", "name", "is_official", "votes", "user_id", "user")

    @post_load
    def create_constitunet(self, data, **kwargs):
        return Message(**data)
    
message_schema = MessageSchema()
messages_schema = MessageSchema(many=True)