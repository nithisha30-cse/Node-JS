import unittest
from app import app

class CartTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_homepage_loads(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_add_item(self):
        response = self.app.post('/add', data=dict(item="Book", price="100"))
        self.assertIn(b"Book", response.data)

if __name__ == '__main__':
    unittest.main()
