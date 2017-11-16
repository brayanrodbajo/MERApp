# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, jsonify, redirect
import os, sys
import csv

reload(sys)
sys.setdefaultencoding('utf8')
app = Flask(__name__)
data = [{
        "name":"Cartagena",
        "department": "Bolívar",
        "image": "/static/images/cartagena.jpg",
        "costo": 500000,
        "hotels":[{
                    "id": "hcb1",
                    "image": "/static/images/cartagena/hotels/hotelpirata.jpg",
                    "name": "Hotel Isla del Pirata",
                    "costo": 1221910
                }, {
                    "id": "hcb2",
                    "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                    "name": "Apartamentos Morros Cartagena",
                    "costo": 452128
                }, {
                    "id": "hcb3",
                   "image": "/static/images/cartagena/hotels/hotelmakondo.jpeg",
                   "name": "Hotel Makondo",
                   "costo": 1221910
                }, {
                    "id": "hcb4",
                    "image": "/static/images/cartagena/hotels/casanadiasandro.jpg",
                    "name": "Hotel Casa Nadia & Sandro",
                    "costo": 452128
                }
            ],
    },
    {
        "name":"Pavas",
        "department": "Valle del Cauca",
        "image": "/static/images/pavas.jpg",
        "costo": 20000,
        "hotels":[{
                    "id": "hcb5",
                    "image": "/static/images/pavas/cabanaslaprimavera.jpg",
                    "name": "Cabañas La Primavera",
                    "costo": 160000
                }, {
                    "id": "hcb6",
                    "image": "/static/images/pavas/hostalelmarquez.jpg",
                    "name": "Hostal El Marquez",
                    "costo": 120000
                }, {
                    "id": "hcb7",
                   "image": "/static/images/pavas/hotelvillasaman.jpg",
                   "name": "Hotel Villa Samán",
                   "costo": 130000
                }, {
                    "id": "hcb8",
                    "image": "/static/images/pavas/recintodelossuenos.jpg",
                    "name": "Hotel Recito De Los Sueños",
                    "costo": 45128
                }
            ],
    },
    {
        "name":"Honda",
        "department": "Tolima",
        "image": "/static/images/honda.jpg",
        "costo": 100000,
        "hotels":[{
                    "id": "hcb9",
                    "image": "/static/images/honda/elvirreyhotel.jpg",
                    "name": "El Virrey Hotel Boutique",
                    "costo": 100555
                }, {
                    "id": "hcb10",
                    "image": "/static/images/honda/hotelacuaticoaguasol.jpg",
                    "name": "Hotel y Parque Acuatico Agua Sol Alegría",
                    "costo": 148000
                }, {
                    "id": "hcb11",
                   "image": "/static/images/honda/lapiragua.jpg",
                   "name": "Hotel la Piragua",
                   "costo": 50000
                }, {
                    "id": "hcb12",
                    "image": "/static/images/honda/hotellaspiscinas.jpg",
                    "name": "Hotel Las Piscinas",
                    "costo": 125000
                }
            ],
    },

    {
        "name":"Medellín",
        "department": "Antioquia",
        "image": "/static/images/medellin.jpg",
        "costo": 200000,
        "hotels":[{
                    "id": "hcb13",
                    "image": "/static/images/medellin/hotelcasaprado.jpg",
                    "name": "Hostal Casa Prado",
                    "costo": 25000
                }, {
                    "id": "hcb14",
                    "image": "/static/images/medellin/lacampanahotel.jpg",
                    "name": "La Campana Hotel Boutique",
                    "costo": 157475
                }, {
                    "id": "hcb15",
                   "image": "/static/images/medellin/thecharleelifestyle.jpg",
                   "name": "The Charlee Lifestyle",
                   "costo": 579223
                }, {
                    "id": "hcb16",
                    "image": "/static/images/medellin/estelarblue.jpg",
                    "name": "Hotel Estelar Blue",
                    "costo": 226950
                }
            ],
    },
  ]

global id_session

def get_id():
    id_session=1
    print(os.path.isfile("id_file.csv"))
    if os.path.isfile("id_file.csv"):
        with open("id_file.csv", 'r') as f:
            last_row = list(csv.reader(f))[-1]
            print last_row
            id_session = int(last_row[0])+1
    return id_session


@app.route('/',  methods = ['GET', 'POST'])
def load():
    if request.method == 'GET':
        print 'Entro en GET'
        global id_session
        id_session = get_id()
        print id_session
        return render_template('index.html', data= data, id=id_session)
    if request.method == 'POST':
        print 'Entro en POST'
        city=str(request.form.getlist('fooby1'))
        hotel=str(request.form.getlist('fooby2'))
        text_file = open("Output"+str(id_session)+".txt", "w")
        text_file.write(city + "\n" + hotel)
        text_file.close()
        return redirect('/loading')
        # return redirect("https://docs.google.com/forms/d/e/1FAIpQLSdFDa7emxPgC0sO3D0U7Rc_i3rrrKu7rhjkTVMkmGjbKfbqNw/viewform?usp=sf_link")

@app.route('/events',  methods=['POST'])
def load_events():
    with open('id_file.csv', 'a') as file:
        file.write("\n"+str(id_session)+", events"+str(id_session)+".csv")
    header = [["IDSession", "TipoEvento", "Valor", "Tiempo(s)"]]
    data = request.get_json()
    events = data['events']
    all_data = header + events
    with open("events"+str(id_session)+".csv", "wb") as f:
        writer = csv.writer(f)
        writer.writerows(all_data)
    return 'OK Events'

@app.route('/loading',  methods=['GET', 'POST'])
def joke_loading():
    if request.method == 'GET':
        return render_template('jokeLoading.html', id=id_session)
    if request.method == 'POST':
        return redirect('/satisfaction')

@app.route('/satisfaction',  methods=['GET', 'POST'])
def satisfaction():
    if request.method == 'GET':
        return render_template('satisfaction.html', id=id_session)
    if request.method == 'POST':
        return redirect("https://docs.google.com/forms/d/e/1FAIpQLSdFDa7emxPgC0sO3D0U7Rc_i3rrrKu7rhjkTVMkmGjbKfbqNw/viewform?usp=sf_link")


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=12345, use_reloader=True)
