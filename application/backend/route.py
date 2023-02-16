from root import app
from flask import render_template, jsonify, request, redirect, url_for
import helper.db_helper as db
import api.api as api

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/homepage/', defaults={'keyword': None})
@app.route('/homepage/<keyword>')
def homepage(keyword = None):
    try:
        output = api.select(keyword)
        return output,200
    except Exception as e:
        print(e)
        return output,500
    



@app.route('/upload/',methods = ['POST'],defaults={'student_id' : None, 'student_first' : None, 'student_last' : None, 'student_email' : None, 'student_mailing' : None, 'student_gpa' : None})
def upload_file(student_id = None, student_first = None, student_last = None, student_email = None, student_mailing = None, student_gpa = None):
    try:
        #get all parameter
        student_id = request.form['student_id']
        student_first = request.form['student_first']
        student_last = request.form['student_last']
        student_email = request.form['student_email']
        student_mailing = request.form['student_mailing']
        student_gpa = request.form['student_gpa']
        #CALL API TO INSERT ITEM TO TABLE
        output = api.insert(student_id,student_first,student_last,student_email,student_mailing,student_gpa)
        return output,200

    except Exception as e:
        print(f"== EXCEPTION == upload-file:\n{e}\n")
        return jsonify({"message": "Something went wrong. Please check logs on the server :/"}), 500
    
