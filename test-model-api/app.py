from flask import Flask, request, jsonify
import numpy as np
from tensorflow.keras.models import load_model

app = Flask(__name__)

# Load the trained model
model = load_model('location_model.h5')  # Gantilah 'your_model_path.h5' dengan path model Anda

@app.route('/', methods=['GET'])
def homepage():
    return 'homepage'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input from the request
        data = request.json
        
        # Extract coordinates from the input
        coordinates = np.array(data['coordinates'])
        
        # Make predictions using the loaded model
        predictions = model.predict(np.array([coordinates]))

        # Find the predicted class (index with the highest probability)
        predicted_class = np.argmax(predictions)

        # You might want to create a mapping to convert index to label
        label_mapping = {0: "LocationA", 1: "LocationB", 2: "LocationC", 3: "LocationD", 4: "LocationE", 5: "LocationF"}
        predicted_location = label_mapping[predicted_class]

        # Return the predicted location as JSON
        return jsonify({'predicted_location': predicted_location})
    
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
