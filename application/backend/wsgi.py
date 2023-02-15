from root import app
from route import *
from gevent.pywsgi import WSGIServer

if __name__ == "__main__":
    WSGIServer(('0.0.0.0', 8000), app).serve_forever()
