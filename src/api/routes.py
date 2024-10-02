"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Characters, Planets, Comments, Medias
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = """Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"""
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body['message'] = 'Bad email or password'
        return response_body, 401
    print(user.serialize())
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['message'] = f'Bienvenido {email}'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route('/users')
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Listado de Usuarios y sus publicaciones(GET)'
    response_body['results'] = result
    return response_body, 200


# Endpoints de Publicaciones (Post) CRUD
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        # Opción 2
        # result = []
        # for row in rows:
        #    result.append(row.serialize())
        # Opción 1 - list comprehension
        # var  = [ objetivo for iterador in lista ]
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # Validar si estoy recibiendo todas las claves (campos)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(),
                    image_url = data.get('image_url'),
                    user_id = data.get('user_id'),)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body = {}
    # Validar que id exista en la base de datos
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicación {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'No puede gestionar la publicacion {id}'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Validar que reciba todas las claves en el body
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        row.user_id = data.get('user_id')
        db.session.commit()
        response_body['message'] = f'Publicación: {id} modificada'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Publicación: {id} eliminada'
        response_body['results'] = {}
        return response_body, 200


@api.route('/characters', methods=['GET', 'POST'])
def characters():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Characters)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos los personajes'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Characters(name = data.get('name'),
                         height = data.get('height'),
                         mass = data.get('mass'),
                         hair_color = data.get('hair_color'),
                         skin_color = data.get('skin_color'),
                         eye_color = data.get('eye_color'),
                         birth_year = data.get('birth_year'),
                         gender = data.get('gender'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un personaje'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/characters/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def character(id):
    response_body = {}
    row = db.session.execute(db.select(Characters).where(Characters.id == id)).scalar()
    if not row:
        response_body['message']= f'El personaje {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos del personaje: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name')
        row.height = data.get('height')
        row.mass = data.get('mass')
        row.hair_color = data.get('hair_color')
        row.skin_color = data.get('skin_color')
        row.eye_color = data.get('eye_color')
        row.birth_year = data.get('birth_year')
        row.gender = data.get('gender')
        db.session.commit()
        response_body['message'] = f'Personaje {id} ha sido modificado'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Personaje {id} ha sido eliminado'
        response_body['results'] = {}
        return response_body, 200


@api.route('/planets', methods=['GET', 'POST'])
def planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Planets)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos los Planets'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Planets(name = data.get('name'),
                      diameter = data.get('diameter'),
                      rotation_period = data.get('rotation_period'),
                      orbital_period = data.get('orbital_period'),
                      gravity = data.get('gravity'),
                      population = data.get('population'),
                      climate = data.get('climate'),
                      terrain = data.get('terrain'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un Planet'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/planets/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def planet(id):
    response_body = {}
    row = db.session.execute(db.select(Planets).where(Planets.id == id)).scalar()
    if not row:
        response_body['message'] = f'El planeta {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos del planeta {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.name = data.get('name')
        row.diameter = data.get('diameter')
        row.rotation_period = data.get('rotation_period')
        row.orbital_period = data.get('orbital_period')
        row.gravity = data.get('gravity')
        row.population = data.get('population')
        row.climate = data.get('climate')
        row.terrain = data.get('terrain')
        db.session.commit()
        response_body['message'] = f'El planeta {id} ha sido modificado'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Planet: {id} eliminado'
        response_body['results'] = {}
        return response_body, 200
    

@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas los comentarios'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(body = data.get('body'),
                       user_id = data.get('user_id'),
                       post_id = data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un comentario'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def comment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalar()
    if not row:
        response_body['message'] = f'El comentario {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos de los comentarios: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body = data.get('body')
        row.post_id = data.get('post_id')
        row.user_id = data.get('user_id')
        db.session.commit()
        response_body['message'] = f'El comentario {id} ha sido modificado'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'El comentario {id} ha sido eliminado'
        response_body['results'] = {}
        return response_body, 200


@api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las medias'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Medias(media_type = data.get('media_type'),
                     url = data.get('url'),
                     post_id = data.get('post_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un media'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalar()
    if not row:
        response_body['message'] = f'El media no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos del media {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_type = data.get('media_type')
        row.url = data.get('url')
        row.post_id = data.get('post_id')
        db.session.commit()
        response_body['message'] = f'El media {id} ha sido modificada'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'El media {id} ha sido eliminada'
        response_body['results'] = {}
        return response_body, 200

