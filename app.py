from flask import Flask, jsonify, request, render_template
import requests

app = Flask(__name__)

API_KEY = "506a80532eade5d8241b2807f8da4dd3"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/clima', methods=['GET'])
def get_clima():
    cidade = request.args.get('cidade', 'São Paulo') 
    url = f"http://api.openweathermap.org/data/2.5/weather?q={cidade}&appid={API_KEY}&units=metric&lang=pt_br"

    resposta = requests.get(url)
    if resposta.status_code == 200:
        dados = resposta.json()
        clima_info = {
            "cidade": dados["name"],
            "temperatura": dados["main"]["temp"],
            "descricao": dados["weather"][0]["description"],
            "umidade": dados["main"]["humidity"],
            "vento": dados["wind"]["speed"],
            "icone": f"http://openweathermap.org/img/wn/{dados['weather'][0]['icon']}.png"
        }
        return jsonify(clima_info), 200, {'Content-Type': 'application/json; charset=utf-8'}

    else:
        return jsonify({"erro": "Cidade não encontrada"}), 404

if __name__ == '__main__':
    app.run(debug=True)
