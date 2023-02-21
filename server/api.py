from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"]= 'mysql://root:password123@localhost/grocerydatabase'
db = SQLAlchemy(app)

class groceryList(db.Model):
    __tablename__ = 'groceryList'
    grocery_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    grocery = db.Column(db.String(250), nullable=False)
    quantity = db.Column(db.Integer)
    date_to_get = db.Column(db.DateTime, nullable=False)
    reminder = db.Column(db.Boolean, nullable=False, default=False)
    int_date = db.Column(db.DateTime, default=db.func.now())

    # def __str__(self):
    #     return f'{self.grocery_id} x {self.quantity}; getBy: {self.date_to_get}; reminder{self.reminder}'

def grocery_serializer(grocery):
    return {
        'grocery_id': grocery.grocery_id,
        'grocery': grocery.grocery,
        'quantity': grocery.quantity,
        'date_to_get': grocery.date_to_get,
        'reminder': grocery.reminder,
        'int_date': grocery.int_date
    }
# Get data
@app.route('/api',methods = ['GET'])
def grocIndex():
    return jsonify([*map(grocery_serializer, groceryList.query.all())])

# Add Groceries
@app.route ('/api/add', methods = ['POST'])
def postGroceries ():
    request_data = json.loads(request.data)
    groceries = groceryList(
        grocery = request_data['grocery'],
        quantity = request_data['quantity'],
        date_to_get =request_data['date_to_get']
    )
    db.session.add(groceries)
    db.session.commit()
    return {'201' : 'grocery data created sucessfully'}

# Delete Groceries
@app.route('/api/<int:grocery_id>', methods=['DELETE'])
def deleteGrocery(grocery_id):
        request_data = json.loads(request.data)
        # groceryID=request_data['grocery_id']
        # grocery = request_data['grocery']
        groceryList.query.filter_by(grocery_id = request_data['grocery_id']).delete()
        db.session.commit()
        return {'204':"Delete Success"}

# # Authenticate User
# @app.route ('/api/auth', method = ["PUT"])   
# def logginAuth():
#     request_data = json.loads(request.data)
#     username = request_data['username']
#     password = request_data['password']



if __name__ == '__main__':
    app.run(debug=True)