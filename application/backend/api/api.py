from flask import jsonify
import helper.db_helper as db

def select(keyword):
    query = """SELECT * FROM student """
    if keyword:
        query += """ WHERE student_id = %(keyword)s """
        output = db.execute_query(query=query, params={"keyword":str(keyword)})
    else:
        output = db.execute_query(query=query)
    return jsonify(output)

def insert(student_id,student_first,student_last,student_email,student_mailing,student_gpa):
    query = """
        insert into student (student_id,student_first,student_last,student_email,student_mailing,student_gpa)
        values (%(student_id)s,%(student_first)s,%(student_last)s,%(student_email)s,%(student_mailing)s,%(student_gpa)s);
        """
        
    db.execute_query(query=query,params={
        "student_id":str(student_id),
        "student_first":str(student_first),
        "student_last":str(student_last),
        "student_email":str(student_email),
        "student_mailing":str(student_mailing),
        "student_gpa":str(student_gpa)
    })
    return "TODO"