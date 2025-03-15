from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from flask_cors import CORS  # Allow cross-origin requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Load dataset (sample data stored in CSV file)
DATA_PATH = "materials.csv"
df = pd.read_csv(DATA_PATH)

# Generate TF-IDF matrix for material descriptions
tfidf_vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf_vectorizer.fit_transform(df["Material Type"])

# Simple recommendation function
def recommend_packaging(material_type=None, recyclable=None, compostable=None):
    filtered_df = df.copy()

    if material_type:
        filtered_df = filtered_df[df['Material Type'].str.lower() == material_type.lower()]

    if recyclable is not None:
        filtered_df = filtered_df[filtered_df['Recyclable'] == recyclable]

    if compostable is not None:
        filtered_df = filtered_df[filtered_df['Compostable'] == compostable]

    return filtered_df.to_dict(orient="records")

# Advanced recommendation function based on similarity
def get_similar_materials(material_type):
    material_index = df[df['Material Type'].str.lower() == material_type.lower()].index
    if material_index.empty:
        return []

    material_index = material_index[0]
    cosine_similarities = cosine_similarity(tfidf_matrix[material_index], tfidf_matrix).flatten()
    similar_indices = cosine_similarities.argsort()[::-1][1:4]  # Top 3 similar materials

    return df.iloc[similar_indices].to_dict(orient="records")

# API Endpoint to get recommendations
@app.route("/recommend", methods=["GET"])
def recommend():
    material_type = request.args.get("material_type")
    recyclable = request.args.get("recyclable", type=lambda x: x.lower() == "true")
    compostable = request.args.get("compostable", type=lambda x: x.lower() == "true")

    recommendations = recommend_packaging(material_type, recyclable, compostable)

    if not recommendations and material_type:
        recommendations = get_similar_materials(material_type)

    return jsonify(recommendations)

# Default Route to check if API is running
@app.route("/", methods=["GET"])
def home():
    return "API is working! Use /recommend endpoint."

if __name__ == "__main__":
    app.run(debug=True)
