from flask import jsonify
from datetime import datetime
from config.db import SessionLocal
from models.job import Job
def add_job(data):
    print("Received data:", data)

    if not data or 'title' not in data or 'company' not in data or 'posting_date' not in data:
        return jsonify({"error": "Please fill all fields"}), 400

    session = SessionLocal()
    
    try:
        job = Job(
            title=data['title'],
            company=data['company'],
            location=data.get('location', None),
            posting_date=datetime.strptime(data['posting_date'], '%Y-%m-%d'), 
            job_type=data.get('job_type', 'Full-time'),
            tags=data.get('tags', '')                  
        )

        existing_job = session.query(Job).filter_by(
            title=job.title,
            company=job.company,
            posting_date=job.posting_date
        ).first()

        if existing_job:
            print(f"Job already exists: {job.title} at {job.company} on {job.posting_date}. Skipping...")
            return jsonify({"message": "Job Already Exists"}), 400

        session.add(job)
        session.commit()
        return jsonify({"message": "Job created successfully"}), 201

    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()


def get_all_jobs():
    session = SessionLocal()
    try:
        jobs = session.query(Job).all()
        return jsonify([{
            "id": job.id,
            "title": job.title,
            "company": job.company,
            "location": job.location,
            "posting_date": job.posting_date.strftime('%Y-%m-%d'),
            "job_type": job.job_type,
            "tags": job.tags
        } for job in jobs]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()


def update_job(data):
    print("the data receievd is",data)
    if not data or 'id' not in data:
        return jsonify({"error": "Job ID is required"}), 400

    session = SessionLocal()
    try:
        job = session.query(Job).filter_by(id=data['id']).first()
        if not job:
            return jsonify({"error": "Job not found"}), 404

        # Update fields if present in data
        if 'title' in data:
            job.title = data['title']
        if 'company' in data:
            job.company = data['company']
        if 'location' in data:
            job.location = data['location']
        if 'posting_date' in data:
            job.posting_date = datetime.strptime(data['posting_date'], '%Y-%m-%d')
        if 'job_type' in data:
            job.job_type = data['job_type']
        if 'tags' in data:
            job.tags = data['tags']

        session.commit()
        return jsonify({"message": "Job updated successfully"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()

def del_job(data):
    if not data or 'id' not in data:
        return jsonify({"error": "Job ID is required"}), 400
    session = SessionLocal()
    try:
        job = session.query(Job).filter_by(id=data['id']).first()
        if not job:
            return jsonify({"error": "Job not found"}), 404
        session.delete(job)
        session.commit()
        return jsonify({"message": "Job deleted successfully"}), 200
    except Exception as e:
        session.rollback()
        return jsonify({"error": str(e)}), 400
    finally:
        session.close()