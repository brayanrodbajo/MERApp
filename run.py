# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, jsonify
import os, sys
reload(sys)
sys.setdefaultencoding('utf8')
app = Flask(__name__)


@app.route('/')
def cargar():
	print 'Entro en cargar'
	return render_template('index.html')



@app.route('/summary')
def summary():
    data = [{
               	"name":"Cartagena",
               	"department": "Bolívar",
               	"image": "/static/images/cartagena.jpg",
               	"costo": 500000,
                "hotels":[{
                            "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                            "name": "Hotel Isla del Pirata",
                            "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }, {
                           "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                           "name": "Hotel Isla del Pirata",
                           "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }
                    ],
            },
            {
                "name":"Pavas",
                "department": "Valle del Cauca",
                "image": "/static/images/ranchoclaro.jpg",
                "costo": 20000,
                "hotels":[{
                            "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                            "name": "Hotel Isla del Pirata",
                            "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }, {
                           "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                           "name": "Hotel Isla del Pirata",
                           "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }
                    ],
            },
            {
                "name":"Honda",
                "department": "Tolima",
                "image": "/static/images/honda.jpg",
                "costo": 20000,
                "hotels":[{
                            "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                            "name": "Hotel Isla del Pirata",
                            "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }, {
                           "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                           "name": "Hotel Isla del Pirata",
                           "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }
                    ],
            },

            {
                "name":"Medellín",
                "department": "Antioquia",
                "image": "/static/images/medellin.jpg",
                "costo": 20000,
                "hotels":[{
                            "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                            "name": "Hotel Isla del Pirata",
                            "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }, {
                           "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                           "name": "Hotel Isla del Pirata",
                           "costo": 1221910
                        }, {
                            "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                            "name": "Apartamentos Morros Cartagena",
                            "costo": 452128
                        }
                    ],
            },
          ]
    return render_template('index.html', data= data)

if __name__ == '__main__': 
	app.run(host='0.0.0.0', debug=True, port=12345, use_reloader=True)
