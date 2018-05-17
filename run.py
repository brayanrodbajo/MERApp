# -*- coding: utf-8 -*-
from flask import Flask, request, render_template, jsonify, redirect, session
import os, sys, random, datetime, glob, random
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
                    "costo": 1221910,
                    "amenities": [
                        "notallowedsmoking.png",
                        "openbar.png",
                        "reception.png",
                        "poolparty.jpg",
                        "disco.png"
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb2",
                    "image": "/static/images/cartagena/hotels/aptosmorros.jpg",
                    "name": "Apartamentos Morros Cartagena",
                    "costo": 452128,
                    "amenities": [
                        "allowedsmoking.png",
                        "openbar.png",
                        "reception.png",
                        "poolparty.jpg",
                        "disco.png"
                    ],
                    "profile": "rumbero"
                }, {
                    "id": "hcb3",
                   "image": "/static/images/cartagena/hotels/hotelmakondo.jpeg",
                   "name": "Hotel Makondo",
                   "costo": 1221910,
                    "amenities": [
                        "breakfast.png",
                        "allowedsmoking.png",
                        "casino.png",
                        "clown.jpeg",
                        "cradle.jpg",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb4",
                    "image": "/static/images/cartagena/hotels/casanadiasandro.jpg",
                    "name": "Hotel Casa Nadia & Sandro",
                    "costo": 452128,
                    "amenities": [
                        "allowedsmoking.png",
                        "clown.jpeg",
                        "disco.png",
                        "kids.png",
                        "moto.png",
                    ],
                    "profile": "nothing"
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
                    "costo": 160000,
                    "amenities": [
                        "wifi.png",
                        "notkids.jpeg",
                        "breakfast.png",
                        "moto.png",
                        "spa.svg",
                    ],
                    "profile": "estudiante"
                }, {
                    "id": "hcb6",
                    "image": "/static/images/pavas/hostalelmarquez.jpg",
                    "name": "Hostal El Marquez",
                    "costo": 120000,
                    "amenities": [
                        "casino.png",
                        "disco.png",
                        "poolparty.jpg",
                        "notkids.jpeg",
                        "breakfast.png",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb7",
                   "image": "/static/images/pavas/hotelvillasaman.jpg",
                   "name": "Hotel Villa Samán",
                   "costo": 130000,
                    "amenities": [
                        "parking.png",
                        "openbar.png",
                        "tv.png",
                        "reception.png",
                        "wifi.png"
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb8",
                    "image": "/static/images/pavas/recintodelossuenos.jpg",
                    "name": "Hotel Recito De Los Sueños",
                    "costo": 45128,
                    "amenities": [
                        "parking.png",
                        "notallowedsmoking.png",
                        "notkids.jpeg",
                        "reception.png",
                        "spa.svg",
                    ],
                    "profile": "nothing"
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
                    "costo": 100555,
                    "amenities": [
                        "moto.png",
                        "notkids.jpeg",
                        "tv.png",
                        "wifi.png",
                        "clown.jpeg",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb10",
                    "image": "/static/images/honda/hotelacuaticoaguasol.jpg",
                    "name": "Hotel y Parque Acuático Agua Sol Alegría",
                    "costo": 148000,
                    "amenities": [
                        "notallowedsmoking.png",
                        "kids.png",
                        "kidpool.png",
                        "cradle.jpg",
                        "wifi.png",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb11",
                   "image": "/static/images/honda/lapiragua.jpg",
                   "name": "Hotel la Piragua",
                   "costo": 50000,
                    "amenities": [
                        "breakfast.png",
                        "reception.png",
                        "tv.png",
                        "openbar.png",
                        "parking.png",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb12",
                    "image": "/static/images/honda/hotellaspiscinas.jpg",
                    "name": "Hotel Las Piscinas",
                    "costo": 125000,
                    "amenities": [
                        "allowedsmoking.png",
                        "clown.jpeg",
                        "casino.png",
                        "disco.png",
                        "kidpool.png",
                    ],
                    "profile": "nothing"
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
                    "costo": 25000,
                    "amenities": [
                        "kids.png",
                        "kidpool.png",
                        "notallowedsmoking.png",
                        "clown.jpeg",
                        "casino.png",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb14",
                    "image": "/static/images/medellin/lacampanahotel.jpg",
                    "name": "La Campana Hotel Boutique",
                    "costo": 157475,
                    "amenities": [
                        "openbar.png",
                        "poolparty.jpg",
                        "spa.svg",
                        "tv.png",
                        "wifi.png"
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb15",
                   "image": "/static/images/medellin/thecharleelifestyle.jpg",
                   "name": "The Charlee Lifestyle",
                   "costo": 579223,
                    "amenities": [
                        "wifi.png",
                        "reception.png",
                        "notkids.jpeg",
                        "breakfast.png",
                        "disco.png",
                    ],
                    "profile": "nothing"
                }, {
                    "id": "hcb16",
                    "image": "/static/images/medellin/estelarblue.jpg",
                    "name": "Hotel Estelar Blue",
                    "costo": 226950,
                    "amenities": [
                        "notallowedsmoking.png",
                        "kidpool.png",
                        "parking.png",
                        "breakfast.png",
                        "cradle.jpg",
                    ],
                    "profile": "familia"
                }
            ],
    },
  ]


folder_data = "data/"
global id_file
id_file = folder_data+"id_file.csv"
def define_prof():
    rum = ("rumbero", "Esta persona es un hombre de 20 años que busca unas vacaciones de rumba en las que pueda disfrutar del alcohol y el cigarrillo. Él espera que su lugar de hospedaje tenga recepción 24 horas, casino, discoteca un cuarto para él solo, que ofrezca diversión para adultos y pool party todas las noches. Además, desearía que el hotel esté ubicada en la zona rosa más importante del área. Espera gastar lo menos posible en comida.")
    fam = ("familia", "Esta es una familia constituida por el padre, la madre, una niña de seis años y un bebé de un año. Ellos esperan que en el lugar de hospedaje no se permita fumar, tenga piscina para niños con recreacionista, estacionamiento de auto y desayuno gratis. En la habitación requieren una cama doble, un sofá cama y una cuna para bebé. Además, desean tener presupuesto para comer frecuentemente fuera del hotel.")
    est = ("estudiante", "Ella es una estudiante universitaria de 20 años que viaja de vacaciones sola y espera llegar a un lugar tranquilo en el que no hayan niños o niñas, con televisión y el cual tenga internet WiFi gratis con amplia cobertura. Espera que el lugar ofrezca espacios de relajación y diversión como Spá y gimnasio. Además, desea conocer los alrededores del lugar, esperando que se ofrezca transporte gratuito. Ella desea contar con desayuno gratuito y tener suficiente presupuesto para conocer la cultura culinaria del sector.")
    list = [rum, fam, est]
    return random.choice(list)

def get_id(): #sums 1 to the last id_session in id_file
    id_session=1
    if os.path.isfile(id_file):
        with open(id_file, 'r') as f:
            last_row = list(csv.reader(f))[-1]
            id_session = int(last_row[0])+1
    return id_session

def choose_song(sti = 'A'):
    folder = "static/songs/" + sti
    session['sti'] = sti
    music_file_path = random.choice(os.listdir(folder))
    print music_file_path
    return "/" + folder + "/" + music_file_path

def write_id():
    id_session = session['id_session']
    events_fname = folder_data + 'events' + str(id_session)+'-' + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S").replace(" ", "") + '.csv'
    session['events_fname'] = events_fname
    with open(id_file, 'a') as file:
        file.write("\n" + str(id_session) +", " + events_fname)


@app.route('/',  methods = ['GET', 'POST'])
def play():
    if request.method == 'GET':
        session.pop('id_session', None)
        return render_template('play.html')
    if request.method == 'POST':
        return redirect('/index')

@app.route('/index',  methods = ['GET', 'POST'])
def index():
    if request.method == 'GET':
        print 'Entro en GET'
        if not 'id_session' in session:
            id_session = get_id()
            session['id_session'] = id_session
        id_session = session['id_session']
        write_id()
        print id_session
        music_path = choose_song('A')
        (prof_name, prof) = define_prof()
        session['prof_name'] = prof_name
        return render_template('index.html', data= data, id=id_session, music_path=music_path, prof_name=prof_name, prof=prof)
    if request.method == 'POST':
        print 'Entro en POST'# the events file has been created
        return redirect('/loading')
        # return redirect("https://docs.google.com/forms/d/e/1FAIpQLSdFDa7emxPgC0sO3D0U7Rc_i3rrrKu7rhjkTVMkmGjbKfbqNw/viewform?usp=sf_link")

@app.route('/events',  methods=['POST'])
def load_events():
    id_session = session['id_session']
    data = request.get_json()
    events = data['events']
    events_fname =  session['events_fname']
    exists = False #if the file for this ID exists
    for file in glob.glob(folder_data+'events'+str(id_session)+'*'): #if a file with this id_session exists replace the file name with the existing one
        events_fname=file
        exists= True
    if not exists:
        sti = [[session['sti'], session['prof_name']]]
        header = [["IDSession", "TipoEvento", "Valor", "Tiempo(s)", "Hora"]]
        events = sti + header + events
    with open(events_fname, 'a') as f:
        writer = csv.writer(f)
        writer.writerows(events)
    return 'OK Events'

@app.route('/loading',  methods=['GET', 'POST'])
def joke_loading():
    id_session = session['id_session']
    if request.method == 'GET':
        return render_template('jokeLoading.html', id=id_session)
    if request.method == 'POST':
        return redirect('/satisfaction')

@app.route('/satisfaction',  methods=['GET', 'POST'])
def satisfaction():
    id_session = session['id_session']
    if request.method == 'GET':
        return render_template('satisfaction.html', id=id_session, path='/static/images/satisfaction/man1/')
    if request.method == 'POST':
        return redirect('/survey')

@app.route('/survey',  methods=['GET', 'POST'])
def survey():
    id_session = session['id_session']
    if request.method == 'GET':
        return render_template('survey.html', id=id_session)
    if request.method == 'POST':
        return redirect('/')


# set the secret key.  keep this really secret:
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, use_reloader=True)
