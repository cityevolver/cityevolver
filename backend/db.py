import datetime
import json
import os.path
from peewee import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import qrcode
import uuid

import realtime


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
    INFORMATION = 1
    COMPLAINT = 2
    BALLOT = 3
    GATHERING = 4
    text = CharField()

class Issue(MyModel):
    title = CharField()
    description = TextField()
    author = CharField()
    image_url = CharField(null=True)
    issue_type = ForeignKeyField(IssueType)
    geo_x = FloatField()
    geo_y = FloatField()

    def add_qr(self):
        issue_code = IssueCode.create(id=uuid.uuid4(), issue=self.id, force_insert=True)
        return issue_code.make_qr()
    
    def to_dict(self):
        d = super(Issue, self).to_dict()
        if self.description.startswith("@get_current_meteodata"):
            param = self.description.split(" ")[1]
            d.update({"description": realtime.get_current_meteodata(param)})
        d.update({"qr": [code.url() for code in self.codes]})
        return d
    
class IssueCode(MyModel):
    id = UUIDField(primary_key=True)
    issue = ForeignKeyField(Issue, backref="codes")

    def url(self):
        return "https://naprava.cz:8080/codes/{}.png".format(self.id)
    
    def make_qr(self):
        filename = "codes/{}.png".format(self.id)
        qrcode.make("https://cityevolver.github.io/#{}".format(self.id)).save(filename)
        return self.url()
    
class Response(MyModel):
    issue = ForeignKeyField(Issue, backref="responses")
    text = CharField()
    icon_code = CharField(null=True)
    can_have_message = BooleanField()

    def to_dict(self):
        d = super(Response, self).to_dict()
        d.update({"vote_count": len(self.votes)})
        return d

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
        db.create_tables([IssueType, Issue, IssueCode, Response, Vote])
        
        IssueType.create(id=IssueType.INFORMATION, text="Information")
        IssueType.create(id=IssueType.COMPLAINT, text="Complaint")
        IssueType.create(id=IssueType.BALLOT, text="Ballot")
        IssueType.create(id=IssueType.GATHERING, text="Gathering")
        
        issue = Issue.create(id=1, title="Old town square reconstruction",
                             description="...", author="MHMP",
                             image_url="http://www4.pictures.zimbio.com/bg/Nicolas+Cage+Nicolas+Cage+Salt+Lake+City+Airport+ihMV26dY4Hul.jpg",
                             issue_type=IssueType.BALLOT, geo_x=14.4210554, geo_y=50.0875187)
        issue.add_qr()
        Response.create(issue=1, id=1, text="Plant more trees.", can_have_message=False)
        Vote.create(issue=1, response=1)
        Vote.create(issue=1, response=1)
        Response.create(issue=1, id=2, text="We need more parking spaces.", can_have_message=False)
        Vote.create(issue=1, response=2)
        Response.create(issue=1, id=3, text="No reconstruction!", can_have_message=False)
        
        issue = Issue.create(id=2, title="Should I. P. Pavlova metro station have another entrance?",
                             description="It's very busy station and another entrance would cut travel time for a lot of people.",
                             author="MHMP",
                             issue_type=IssueType.BALLOT, geo_x=14.4304700, geo_y=50.0753122)
        issue.add_qr()
        Response.create(issue=2, id=4, text="Yes", can_have_message=True, icon_code="check_circle")
        Vote.create(issue=2, response=4)
        Response.create(issue=2, id=5, text="No", can_have_message=True, icon_code="times_circle")
        Vote.create(issue=2, response=5)
        Vote.create(issue=2, response=5, message="No to jste se asi posrali, DEBILOVÉ!!!")

        issue = Issue.create(id=3, title="Pozvánka na 4. řádné zasedání Zastupitelstva MČ Praha 7",
                             description="4. řádné zasedání Zastupitelstva MČ Praha 7 se koná v pondělí dne 13. května 2019 od 17:00 hodin ve velké zasedací místnosti č. 227 Úřadu městské části, nábř. Kpt. Jaroše 1000, Praha 7.",
                             author="MČ Praha 7",
                             image_url="https://www.praha7.cz/wp-content/uploads/2018/02/%C3%BA%C5%99ad.jpg",
                             issue_type=IssueType.GATHERING, geo_x=14.4339447, geo_y=50.0969988)
        issue.add_qr()

        issue = Issue.create(id=4, title="What was the best part of the hackaton?",
                             description="Our app allows the citizens to get involved. Why not use it as well for the hackaton?",
                             author="CitiQR team", issue_type=IssueType.BALLOT, geo_x=14.4174666, geo_y=50.0729676)
        Response.create(issue=4, id=6, text="The hacking.", can_have_message=False)
        Response.create(issue=4, id=7, text="The people.", can_have_message=False)
        Response.create(issue=4, id=8, text="The food.", can_have_message=False)
        Response.create(issue=4, id=9, text="The idea.", can_have_message=False)
        issue.add_qr()
        
        print("OK")

def close():
    return db.close()
