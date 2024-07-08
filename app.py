from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#get -> consultar
@app.route('/usuarios', methods=['GET'])
def ver_productos():
    db = mysql.connector.connect(
        host='localhost',
        user='root', #mi usuario
        password='slipknot0123qwe.', #mi contraseña
        database='usuarioscac' #nombre de la base de datos
    )

    cursor = db.cursor(dictionary=True) #en lugar de tener una lista con tuplas, tener un diccionario con clave(campo) y valor(dato)
    cursor.execute("SELECT * FROM usuarios")

    productos = cursor.fetchall()

    cursor.close()
    return jsonify(productos) #generamos un json como respuesta


#delete -> eliminar
#'/eliminar_usuario/1' elimina el registro con id 1
@app.route('/eliminar_usuario/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    db = mysql.connector.connect(
        host='milepeletay13gg.mysql.pythonanywhere-services.com',
        user='root', #mi usuario
        password='slipknot0123qwe.', #mi contraseña
        database='root$usuarioscac' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id = %s", (id,))

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"USUARIO ELIMINADO CON EXITO!!!"})


#post -> crear un nuevo elemento en el servidor
@app.route('/agregar_usuario', methods=['POST'])
def crear_usuario():
    info = request.json
    '''
    info = { "nombre": "monitor", "cantidad": 45 , "precio":100500}
    '''
    db = mysql.connector.connect(
        host='milepeletay13gg.mysql.pythonanywhere-services.com',
        user='root', #mi usuario
        password='slipknot0123qwe.', #mi contraseña
        database='root$usuarioscac' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("INSERT INTO usuarios(nombre,apellido,email,pw,provincia) VALUES(%s,%s,%s,%s,%s)", (info["nombre"],info["apellido"],info["email"],info["pw"],info["provincia"])) 

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"USUARIO CREADO CON EXITO!!!"})



#put -> actualizar
@app.route('/actualizar_usuario/<int:id>', methods=['PUT'])
def modificar_usuario(id):
    info = request.json
    '''
    info = { "nombre": "monitor", "categoria": 45 , "precio":100500}
    '''
    db = mysql.connector.connect(
        host='milepeletay13gg.mysql.pythonanywhere-services.com',
        user='root', #mi usuario
        password='slipknot0123qwe.', #mi contraseña
        database='root$usuarioscac' #nombre de la base de datos
    )

    cursor = db.cursor()
    cursor.execute("UPDATE usuarios SET nombre= %s, apellido= %s, email= %s, pw= %s, provincia= %s WHERE id = %s", (info["nombre"],info["apellido"],info["email"],info["pw"],info["provincia"] , id)) 

    db.commit()
    cursor.close()
    return jsonify({"mensaje":"USUARIO ACTUALIZADO CON EXITO!!!"})


if __name__ == '__main__':
    app.run(debug=True)