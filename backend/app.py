from flask import Flask
from config.db import engine
from models.job import Base
from routes.job_routes import job_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.register_blueprint(job_routes,url_prefix='/jobs')

# Create tables in the database
Base.metadata.create_all(bind=engine)

@app.route("/")
def home():
    return "FLASK app is running"

# Entry point
if __name__ == "__main__":
    app.run(debug=True)
