from flask import Flask, jsonify
from flask_cors import CORS

# Cria a aplicação Flask
app = Flask(__name__)

# Libera o CORS para o Front-End conseguir acessar a API
CORS(app)

# Rota principal (GET /) para testar se a API está funcionando
@app.route('/', methods=['GET'])
def status_api():
    return jsonify({
        "status": "sucesso",
        "mensagem": "API do Rivalidade Escolar rodando com sucesso na Etapa 1!"
    }), 200

# Inicia o servidor na porta 5000 quando o arquivo for executado
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
