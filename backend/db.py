import datetime
import json
import os.path
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model


db_filename = "db.db"

def json_datetime(o):
    if isinstance(o, (datetime.date, datetime.datetime)):
        return o.isoformat()

def to_json(o):
    return json.dumps(o, default=json_datetime)

db = SqliteDatabase(db_filename)

class MyModel(Model):
    def to_dict(self):
        return model_to_dict(self)

    def to_json(self):
        return to_json(self.to_dict())
    
    class Meta:
        database = db


class IssueType(MyModel):
    text = CharField()

class Issue(MyModel):
    title = CharField()
    description = TextField()
    image_url = CharField(null=True)
    issue_type = ForeignKeyField(IssueType)

class Response(MyModel):
    issue = ForeignKeyField(Issue, backref="responses")
    text = CharField()
    icon_url = CharField(null=True)
    can_have_message = BooleanField()

class Vote(MyModel):
    issue = ForeignKeyField(Issue, backref="votes")
    response = ForeignKeyField(Response, backref="votes")
    message = TextField(null=True)
    created_date = DateTimeField(default=datetime.datetime.now)


def init():
    exists = os.path.isfile(db_filename)
    db.connect()
    if not exists:
        print("Creating db ... ", sep="")
        db.create_tables([IssueType, Issue, Response, Vote])
        
        IssueType.create(id=1, text="Information")
        IssueType.create(id=2, text="Issue")
        IssueType.create(id=3, text="Vote")
        
        Issue.create(id=1, title="Old town square reconstruction", description="...", issue_type=3)
        Response.create(issue=1, id=1, text="Plant more trees.", can_have_message=False)
        Response.create(issue=1, id=2, text="We need more parking spaces.", can_have_message=False)
        Response.create(issue=1, id=3, text="No reconstruction!", can_have_message=False)
        
        Issue.create(id=2, title="Should I. P. Pavlova metro station have another entrance?", description="It's very busy station and another entrance would cut travel time for a lot of people.", issue_type=3)
        Response.create(issue=2, id=4, text="Yes", can_have_message=True)
        Response.create(issue=2, id=5, text="No", can_have_message=True)

        print("OK")
