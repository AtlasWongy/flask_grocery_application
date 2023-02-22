from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
# import bcrypt
import jwt as jwts
import secrets

app = Flask(__name__)
secret_key = secrets.token_hex(32)
app.config ['SECRET_KEY'] = secret_key
app.config["SQLALCHEMY_DATABASE_URI"]= 'mysql://root:password123@localhost/grocerydatabase'
db = SQLAlchemy(app)
jwt = JWTManager(app)

class groceryList(db.Model):
    __tablename__ = 'groceryList'
    grocery_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    grocery = db.Column(db.String(250), nullable=False)
    quantity = db.Column(db.Integer)
    date_to_get = db.Column(db.DateTime, nullable=False)
    reminder = db.Column(db.Boolean, nullable=False, default=False)
    int_date = db.Column(db.DateTime, default=db.func.now())

    def __str__(self):
        return f'{self.grocery_id} x {self.quantity}; getBy: {self.date_to_get}; reminder{self.reminder}'

    
class users(db.Model):
     __tablename__ = 'groceryUsers'
     id = db.Column(db.Integer, nullable=False, autoincrement = True, primary_key = True)
     username = db.Column(db.String(80), nullable = False, unique=True )
     password = db.Column(db.String(80), nullable = False)

     def __repr__(self):
          return f'<users{self.username}>'
    

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

# Update Groceries
@app.route('/api/<int:grocery_id>', methods=['PUT'])
def updateGrocery(grocery_id):
    grocerylist = groceryList.query.get_or_404(grocery_id)
    request_data = json.loads(request.data)
    grocerylist.grocery = request_data['grocery']
    grocerylist.quantity = request_data['quantity']
    grocerylist.date_to_get = request_data['date_to_get']
    db.session.commit()
    return {'Success' : 'grocery data updated sucessfully'}


# # Authenticate User
# @app.route ('/api/auth', methods = ["POST"])   
# def logginAuth():
#     request_data = json.loads(request.data)
#     print(request_data)
#     username = request_data['user']
#     password = request_data['pass']
#     user = users.query.filter_by(username=username).first()
#     password = users.query.filter_by(password=password).first()
#     if user and password:
#         return jsonify({"message": "Authentication successful"})
#     else:
#         return jsonify({"error": "Invalid username or password"})

@app.route('/api/register', methods=['POST'])
def register():
     try:
        username = request.json['username']
        passwordNH = request.json['password']
        # print(passwordNH)
        password = generate_password_hash(passwordNH)
        print (password)

        user = users(username = username, password = password)
        db.session.add(user)
        print ('DEBUG')
        print(db.session.add(user))
        db.session.commit()
        return jsonify({"message":"user added"})
     except:
        return jsonify({"message":f'Username: {username} exist <br/> Please input a new username'})

@app.route('/api/login', methods =['POST'])
def login():
     username = request.json['username']
     password = request.json['password']
     user = users.query.filter_by(username=username).first()

     if user and check_password_hash(user.password, password):
        # payload = {'sub':user.id}
        access_token = create_access_token(identity=user.id, additional_claims={"sub": user.id})
        # access_token = jwts.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
        return jsonify ({'access_token': access_token}), 200
     return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    
    current_user_id = get_jwt_identity()
    print(current_user_id)
    user = users.query.filter_by(id=current_user_id).first()
    return jsonify({'message': f'Hello {user.username}! This is a protected page!' }),200


if __name__ == '__main__':
    app.run(debug=True)