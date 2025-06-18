This project is a full-stack job listing web application composed of:

Backend: Flask API server using SQLAlchemy for database interaction.

Frontend: React application for interacting with job data.

Scraper: Python-based web scraper to extract job listings from [actuarylist.com].

Backend
Ensure Python 3 and MySQL are installed.

Install required Python packages (typically using pip install -r requirements.txt).

Run the backend with:
python app.py

This starts the Flask server and connects to the MySQL database via SQLAlchemy.

All job-related APIs are registered using:

app.register_blueprint(job_routes, url_prefix='/jobs')

