from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db
from database.schemas import message_schema, messages_schema, request_schema, requests_schema
from database.models import Message, Request

class MessageResource(Resource):
    def get(self, message_id):
        message = Message.query.get_or_404(message_id)
        return message_schema.dump(message), 200
    
    #only text is able to be updated for now
    @jwt_required()
    def put(self, message_id):
        try:
            verify_jwt_in_request()
            #user_id = get_jwt_identity()
            message = Message.query.get_or_404(message_id)
            if 'text' in request.json:
                message.text = request.json['text']
            db.session.commit()
            return message_schema.dump(message), 200
        except:
            return "Unauthorized", 401
  
    @jwt_required()
    def delete(self, message_id):
        try:
            verify_jwt_in_request()
            message_from_db = Message.query.get_or_404(message_id)
            db.session.delete(message_from_db)
            db.session.commit()
            return '', 204    
        except:
            return "Unauthorized", 401


class AllMessagesResource(Resource):
    def get(self):
        messages = Message.query.all()
        return messages_schema.dump(messages), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        form_data["user_id"] = int(user_id)
        message = message_schema.load(form_data)
        db.session.add(message)
        db.session.commit()
        return message_schema.dump(message), 201



class RequestResource(Resource):
    def get(self, request_id):
        request_object = Request.query.get_or_404(request_id)
        return request_schema.dump(request_object), 200
    
    #only description able to update for now
    @jwt_required()
    def put(self, request_id):
        try:
            verify_jwt_in_request()
            #user_id = get_jwt_identity()
            request_object = Request.query.get_or_404(request_id)
            if 'description' in request.json:
                request_object.description = request.json['description']
            db.session.commit()
            return request_schema.dump(request_object), 200
        except:
            return "Unauthorized", 401
  
    @jwt_required()
    def delete(self, request_id):
        try:
            verify_jwt_in_request()
            request_object = Request.query.get_or_404(request_id)
            db.session.delete(request_object)
            db.session.commit()
            return '', 204    
        except:
            return "Unauthorized", 401
        

class AllRequestsResource(Resource):
    def get(self):
        requests_object = Request.query.all()
        return requests_schema.dump(requests_object), 200
    
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        form_data["user_id"] = int(user_id)
        request_object = request_schema.load(form_data)
        db.session.add(request_object)
        db.session.commit()
        return request_schema.dump(request_object), 201
