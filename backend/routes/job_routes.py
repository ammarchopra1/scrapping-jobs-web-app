from flask import Blueprint, request
from controller.job_controller import add_job,update_job,del_job

job_routes=Blueprint('job_routes',__name__)

@job_routes.route('/add_job',methods=['POST'])
def create_job():
    data=request.get_json()
    return add_job(data)


@job_routes.route('/get_all_jobs',methods=['GET'])
def get_all_jobs():
    from controller.job_controller import get_all_jobs
    return get_all_jobs()   

@job_routes.route('/update_job',methods=['put'])
def update_job_route():
    data = request.get_json()
    return update_job(data)

@job_routes.route('/delete-job',methods=['DELETE'])
def delete_job_route():
    data = request.get_json()
    return del_job(data)


