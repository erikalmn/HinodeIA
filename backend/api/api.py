from flask import Flask, request, jsonify
from joblib import load
import pandas as pd
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

model = load('./api/model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Verificando se é um único registro ou uma lista
        if isinstance(data, dict):
            df = pd.DataFrame([data])
        elif isinstance(data, list):
            df = pd.DataFrame(data)
        else:
            return jsonify({"error": "Invalid input format."}), 400

        predictions = model.predict(df)
        return jsonify({"updated_at": datetime.now().strftime("%d/%m/%Y às %H:%M"), "predictions": predictions.tolist()})

    except Exception as e:
        return jsonify({"error": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)