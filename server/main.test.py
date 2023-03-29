import unittest
from main import app, db, Todo

class TodoTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_create_todo(self):
        todo = Todo(title='Test Todo')
        db.session.add(todo)
        db.session.commit()

        todos = Todo.query.all()
        self.assertEqual(len(todos), 1)
        self.assertEqual(todos.title, 'Test Todo')

    def test_delete_todo(self):
        todo = Todo(title='Test Todo')
        db.session.add(todo)
        db.session.commit()

        response = self.client.delete(f'/api/todos/{todo.id}')
        self.assertEqual(response.status_code, 204)

        todos = Todo.query.all()
        self.assertEqual(len(todos), 0)

if __name__ == '__main__':
    unittest.main()