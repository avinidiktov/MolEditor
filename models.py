#coding: utf-8
from app import db


class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String())
    result = db.Column(db.String())

    def __init__(self, title, result):
        self.title = title
        self.result = result

    def __repr__(self):
        return '<id {}>'.format(self.id)
