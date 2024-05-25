from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt
from datetime import timedelta
from models import Card
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashmind.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'marius22'
app.config["JWT_SECRET_KEY"] = "password"  
app.config['JWT_TOKEN_LOCATION'] = ['headers']
db.init_app(app)
CORS(app)

jwt = JWTManager(app)

SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "FlashMind API"
    },
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/token', methods=['POST'])
def get_token():
    if request.json.get("username") == "admin" and request.json.get("password") == "password":
        token = create_access_token(
            identity="admin",
            expires_delta=timedelta(minutes=30),
            additional_claims={'role': ['admin']}
        )
        return jsonify({"token": token}), 200
    elif request.json.get("username") == "user" and request.json.get("password") == "password":
        token = create_access_token(
            identity="user",
            expires_delta=timedelta(minutes=30),
            additional_claims={'role': ['user']}
        )
        return jsonify({"token": token}), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401

def role_required(role):
    def wrapper(fn):
        @jwt_required()
        def decorator(*args, **kwargs):
            claims = get_jwt()
            if 'role' not in claims or role not in claims['role']:
                return jsonify({"msg": "Forbidden"}), 403
            return fn(*args, **kwargs)
        decorator.__name__ = fn.__name__
        return decorator
    return wrapper

@app.route('/flashmind', methods=['POST'])
@role_required('admin')
def create_card():
    data = request.json
    new_card = Card(question=data['question'], answer=data['answer'], subject=data['subject'])
    db.session.add(new_card)
    db.session.commit()
    return jsonify({'message': 'Card created successfully'}), 201

@app.route('/flashmind', methods=['GET'])
@jwt_required()
def get_all_cards():
    cards = Card.query.all()
    output = []
    for card in cards:
        card_data = {'id': card.id, 'question': card.question, 'answer': card.answer, 'subject': card.subject}
        output.append(card_data)
    return jsonify({'cards': output})

@app.route('/flashmind/<int:id>', methods=['PUT'])
@role_required('admin')
def update_card(id):
    data = request.json
    card = Card.query.get(id)
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    card.question = data.get('question', card.question)
    card.answer = data.get('answer', card.answer)
    card.subject = data.get('subject', card.subject)
    db.session.commit()
    return jsonify({'message': 'Card updated successfully'})

@app.route('/flashmind/<int:id>', methods=['DELETE'])
@role_required('admin')
def delete_card(id):
    card = Card.query.get(id)
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    db.session.delete(card)
    db.session.commit()
    return jsonify({'message': 'Card deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
