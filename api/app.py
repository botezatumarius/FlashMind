from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_swagger_ui import get_swaggerui_blueprint
from models import Card
from db import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashmind.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
CORS(app)

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

@app.route('/flashmind', methods=['POST'])
def create_card():
    data = request.json
    new_card = Card(question=data['question'], answer=data['answer'], subject=data['subject'])
    db.session.add(new_card)
    db.session.commit()
    return jsonify({'message': 'Card created successfully'}), 201

@app.route('/flashmind', methods=['GET'])
def get_all_cards():
    cards = Card.query.all()
    output = []
    for card in cards:
        card_data = {'id': card.id, 'question': card.question, 'answer': card.answer, 'subject': card.subject}
        output.append(card_data)
    return jsonify({'cards': output})

@app.route('/flashmind/<int:id>', methods=['PUT'])
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
def delete_card(id):
    card = Card.query.get(id)
    if not card:
        return jsonify({'message': 'Card not found'}), 404
    db.session.delete(card)
    db.session.commit()
    return jsonify({'message': 'Card deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
