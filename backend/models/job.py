# models/job.py
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    company = Column(String(255), nullable=False)
    location = Column(String(255), nullable=True)
    posting_date = Column(DateTime, nullable=False)
    job_type = Column(String(50), nullable=True)
    tags = Column(String(255), nullable=True)

    def __repr__(self):
        return f"<Job(title={self.title}, company={self.company},location={self.location},posting_date={self.posting_date},job_type={self.job_type},tags={self.tags})>"
