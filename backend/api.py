import cherrypy
import os.path

import db


class Root(object):

    @cherrypy.expose
    def index(self):
        return (
"""<html><body>
<p>issue_type - <a href="issue_type">(bez parametru)</a>, <a href="issue_type?id=1">id=1</a></p>
<p>issue - <a href="issue">(bez parametru)</a>, <a href="issue?id=1">id=1</a></p>
<p>response - <a href="response?issue=1">issue=1</a></p>
<p>vote - <a href="vote?response=1">response=1</a>, POST <a href="vote?issue=1&response=1&message=Message">issue=1&response=1&message=Message</a> s hlavičkou "Content-Length: 0" nebo tak nějak</p>
</body></html>""")

    
@cherrypy.expose
class IssueTypeApi(object):

    def GET(self, id=None):
        if id is None:
            return db.to_json([
                item.to_dict()
                for item in db.IssueType.select()
            ])
        else:
            return db.IssueType.get_by_id(id).to_json()
        

def get_issue(id):
    try:
        return db.Issue.get_by_id(id)
    except Exception as e:
        issue_id = db.IssueCode.get_by_id(id).issue
        return db.Issue.get_by_id(issue_id)
        
@cherrypy.expose
class IssueApi(object):

    def GET(self, id=None):
        if id is None:
            return db.to_json([
                item.to_dict()
                for item in db.Issue.select()
            ])
        else:
            return get_issue(id).to_json()

    def POST(self, id, text, image_url="", issue_type=0):
        item = db.Issue.create(id=id, text=text, image_url=image_url, issue_type=issue_type)
        return item.to_json()

    
@cherrypy.expose
class ResponseApi(object):

    def GET(self, issue=None, id=None):
        if id is None and issue is None:
            return db.to_json([
                item.to_dict()
                for item in db.Response.select()
            ])
        if id is None:
            issue = get_issue(issue)
            return db.to_json([
                item.to_dict()
                for item in issue.responses
            ])
        else:
            return db.Response.get_by_id(id).to_json()

@cherrypy.expose
class VoteApi(object):

    def GET(self, response):
        response = db.Response.get_by_id(response)
        return db.to_json([
            item.to_dict()
            for item in response.votes
        ])

    def POST(self, issue, response, message=None):
        item = db.Vote.create(issue=issue, response=response, message=message)
        return item.to_json()

        
if __name__ == '__main__':
    db.init()

    global_conf = {
        'global': {
            'server.ssl_module': 'builtin',
            "server.ssl_certificate": "cert.pem",
            "server.ssl_private_key": "privkey.pem",
            'server.environment': 'production',
            'engine.autoreload_on': True,
            'engine.autoreload_frequency': 5,
            'tools.response_headers.on': True,
            'tools.response_headers.headers': [('Access-Control-Allow-Origin', '*')],
            'server.socket_host': '0.0.0.0',
            'server.socket_port': 8080,
            'tools.staticdir.root': os.path.abspath(os.getcwd()),
        }
    }
    rest_conf = {
        '/': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        }
    }

    cherrypy.config.update(global_conf)

    cherrypy.tree.mount(Root(), "/", {
        '/codes': {
            'tools.staticdir.on': True,
            'tools.staticdir.dir': './codes',
        }
    })
    cherrypy.tree.mount(IssueTypeApi(), "/issue_type", rest_conf)
    cherrypy.tree.mount(IssueApi(), "/issue", rest_conf)
    cherrypy.tree.mount(ResponseApi(), "/response", rest_conf)
    cherrypy.tree.mount(VoteApi(), "/vote", rest_conf)

    cherrypy.engine.start()
    cherrypy.engine.block()
