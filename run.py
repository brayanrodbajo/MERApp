# -*- coding: utf-8 -*-
from flask import Flask, request, render_template
import os, sys
reload(sys)
sys.setdefaultencoding('utf8')
app = Flask(__name__)


@app.route('/')
def cargar():
	print 'Entro en cargar'
	return render_template('index.html')


if __name__ == '__main__': 
	app.run(host='0.0.0.0', debug=True, port=12345, use_reloader=True)
