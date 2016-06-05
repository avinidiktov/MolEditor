#coding: utf-8

from flask import Flask
from flask import render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.debug = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:qwertyuiop@localhost/DiplomaDb'
db = SQLAlchemy(app)

from models import Task

tasks = Task.query.all()

@app.route('/')
def index():
    return render_template('index.html',title_task = tasks[0].title);

@app.route('/SMILES-tutorial')
def SMILES_tutorial():
    return render_template('smiles-tutorial.html');

@app.route('/about')
def about():
    return render_template('about.html');

@app.route('/json', methods=['POST', 'GET'])
def upload():
    print (request.files['file'])
    return "post"


if __name__ == '__main__':
    app.run()
