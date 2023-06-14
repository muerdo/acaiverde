import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from reportlab.pdfgen import canvas
from io import BytesIO
from datetime import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1"}})


@app.route('/api', methods=['POST'])
def processar():
    dados = request.get_json()

    # Verifique se os dados foram recebidos corretamente
    if not dados:
        return jsonify({'success': False, 'message': 'Dados não encontrados'})

    # Criar um dicionário para armazenar os dados do formulário
    form_data = {
        'nome_completo': dados.get('nome-completo'),
        'nascimento': dados.get('nascimento'),
        'sexo': dados.get('sexo'),
        # Restante dos campos omitidos para maior clareza
    }

    # Salvar os dados em um arquivo JSON
    file_path = 'form_data.json'
    with open(file_path, 'a') as file:
        json.dump(form_data, file)
        file.write('\n')

    # Gerar o PDF preenchido com os dados do formulário
    pdf_buffer = BytesIO()
    pdf = canvas.Canvas(pdf_buffer)

    # Defina as posições iniciais para cada linha do conteúdo
    y_position = 700
    line_height = 20

    # Adicione cada campo ao PDF
    for field, value in form_data.items():
        pdf.drawString(100, y_position, f"{field.replace('_', ' ').title()}: {value}")
        y_position -= line_height

    # Adicione a data e hora atual
    data_hora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    y_position -= line_height * 2
    pdf.drawString(100, y_position, f"Data e Hora: {data_hora}")

    # Adicione um campo para assinatura
    y_position -= line_height * 3
    pdf.drawString(100, y_position, "Assinatura:")

    pdf.save()


    # Reinicie o ponteiro do buffer para o início
    pdf_buffer.seek(0)

    return send_file(pdf_buffer, attachment_filename='formulario_registro.pdf', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
