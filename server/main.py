from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f'<Todo {self.title}>'
    
@app.route('/api/todos', methods=['GET'])
def get_todos():
   todos = Todo.query.all()
   return jsonify([{'id': todo.id, 'title': todo.title, 'completed': todo.completed} for todo in todos])

@app.route('/api/todos', methods=['POST'])
@cross_origin()
def add_todo():
    title = request.json['title']
    todo = Todo(title=title)
    db.session.add(todo)
    db.session.commit()
    return jsonify({'id': todo.id, 'title': todo.title})

@app.route('/api/todos/<int:todo_id>', methods=['PATCH'])
@cross_origin()
def update_todo(todo_id):
    todo = Todo.query.get(todo_id)
    if not todo:
        return jsonify({'error': 'Todo not found'}), 404
    data = request.get_json()
    if 'title' in data:
        todo.task = data['title']
    if 'completed' in data:
        todo.completed = data['completed']
    db.session.commit()
    return jsonify({'id': todo.id, 'title': todo.title, 'completed': todo.completed})

@app.route('/api/todos/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_todo(id):
    todo = Todo.query.get_or_404(id)
    db.session.delete(todo)
    db.session.commit()
    return jsonify({'id': id})

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True,port='9999')