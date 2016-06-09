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

index = 0

@app.route('/tasks/<task_id>')
def replace_task(task_id):
    if int(task_id) >=0 and int(task_id) <= len(tasks)-1:
        global index
        index = int(task_id)

    print(index)
    return jsonify(task = tasks[index].title)

@app.route('/checked/<result>')
def find_Elements(result):

    global index
    print(index)
    print (tasks[index].result+"  "+ result)
    if tasks[index].result == result:
        return jsonify(isFinded = "true")
    else:
        return jsonify(isFinded = "false")










if __name__ == '__main__':
    app.run()
