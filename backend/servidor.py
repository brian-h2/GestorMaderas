from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from openpyxl import load_workbook
import io, os, json

app = Flask(__name__)

# En producción (Railway/Render) seteá ALLOWED_ORIGIN con tu URL de Vercel
allowed_origin = os.environ.get("ALLOWED_ORIGIN", "*")
CORS(app, origins=allowed_origin)


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "Maderas Caroya API"})


@app.route("/insertar", methods=["POST"])
def insertar():
    if "archivo" not in request.files:
        return jsonify({"error": "No se recibió el archivo"}), 400

    archivo = request.files["archivo"]
    filas_json = request.form.get("filas", "[]")

    try:
        filas = json.loads(filas_json)
    except json.JSONDecodeError:
        return jsonify({"error": "JSON de filas inválido"}), 400

    contenido = archivo.read()

    try:
        wb = load_workbook(filename=io.BytesIO(contenido))
    except Exception as e:
        return jsonify({"error": f"No se pudo leer el archivo Excel: {str(e)}"}), 400

    ws = wb.active

    # Primera fila vacía a partir de la 11
    start_row = 11
    while ws.cell(row=start_row, column=1).value is not None:
        start_row += 1

    for i, f in enumerate(filas):
        r = start_row + i
        ws.cell(row=r, column=1).value  = f.get("nombre", "")
        ws.cell(row=r, column=2).value  = f.get("material", "")
        largo = f.get("largo", "")
        ws.cell(row=r, column=3).value  = float(largo) if largo else None
        ancho = f.get("ancho", "")
        ws.cell(row=r, column=4).value  = float(ancho) if ancho else None
        cant = f.get("cantidad", "1")
        ws.cell(row=r, column=5).value  = int(cant) if cant else 1
        ws.cell(row=r, column=6).value  = f.get("veta", "")
        ws.cell(row=r, column=7).value  = f.get("canto_largo_sup", "")
        ws.cell(row=r, column=8).value  = f.get("canto_largo_inf", "")
        ws.cell(row=r, column=9).value  = f.get("canto_izq", "")
        ws.cell(row=r, column=10).value = f.get("canto_der", "")
        ws.cell(row=r, column=11).value = f.get("notas", "")

    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    nombre_salida = archivo.filename or "Plantilla_de_pedidos_Maderas_Caroya.xlsx"
    return send_file(
        output,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        as_attachment=True,
        download_name=nombre_salida,
    )


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5055))
    app.run(host="0.0.0.0", port=port, debug=False)
