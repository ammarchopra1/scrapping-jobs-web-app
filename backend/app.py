from flask import Flask
from config.db import engine
from models.job import Base
from routes.job_routes import job_routes
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Register blueprint for job routes
app.register_blueprint(job_routes, url_prefix='/jobs')

# Create all tables in the database (if not already existing)
Base.metadata.create_all(bind=engine)

# Root endpoint
@app.route("/")
def home():
    return "FLASK app is running"

# Entry point
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Use env PORT or default to 5000
    app.run(host="0.0.0.0", port=port, debug=True)
