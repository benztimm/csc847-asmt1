import configparser
import pymysql
from flask import jsonify
from flaskext.mysql import MySQL
from root import app

mysql = MySQL()

# Read the configurations from external file:
db_config_parser = configparser.ConfigParser()
db_config_parser.read("helper/db_config.ini")

app.config['MYSQL_DATABASE_USER'] = db_config_parser["production-db-config"]['MYSQL_DATABASE_USER']
app.config['MYSQL_DATABASE_PASSWORD'] = db_config_parser["production-db-config"]['MYSQL_DATABASE_PASSWORD']
app.config['MYSQL_DATABASE_DB'] = db_config_parser["production-db-config"]['MYSQL_DATABASE_DB']
app.config['MYSQL_DATABASE_HOST'] = db_config_parser["production-db-config"]['MYSQL_DATABASE_HOST']
mysql.init_app(app)

try:
    conn = mysql.connect()
    print("DB Connection Successful")
    conn.close()
except Exception as e:
    print(e)
    raise Exception("Error connecting database.")

def read(table, column = None, value = None, debug=False):
    """
    Reads from from a SINGLE Table in database.
    `input` table: Table to read from
    `input` column [optional]: for searching specific value (WHERE CLAUSE 
    `input` value [optional]: for searching specific value (WHERE clause)
    `input` param: dict with placehoder values if applicable
    `input` debug: Print the final query executed
    `returns` dict with query output
    """
    conn = None
    cursor = None

    try:
        # Connection:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # Query:
        query = f'''SELECT * FROM {table}'''
        if column and value: query += ''' WHEERE %(column)s LIKE %(value)s'''
        
        # Execution & Results:
        cursor.execute(query, {
                                "column" : column,
                                "value": '%' + value + '%' if value else value,
                                })
        conn.commit()
        rows = cursor.fetchall()

        # Debug:
        if debug: print(cursor._executed)
        return rows

    except Exception as e :
        print(e)
        raise("Error with Database (read)- Please check logs.")
    finally:
        conn.close()
        cursor.close()


def execute_query(query, params:dict = None, debug = False):
    """
    Run custom queries on the database
    `input` query: string with appropriate placeholders if applicable
    `input` param [optional]: dict with placehoder values if applicable
    `input` debug: Print the final query executed
    `returns` dict with query output
    """
    conn = None
    cursor = None

    try:
        # Connection:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # Query execution: (always run query with external params -> prevents sql injection)
        cursor.execute(query, params)
        conn.commit()

        # Results:
        rows = cursor.fetchall()
        
        # Debug:
        if debug: print(cursor._executed)

    except Exception as e :
        print(e)
        raise Exception("Error with Database (execute_query)- Please check logs.")
    finally:
        conn.close()
        cursor.close()
    
    return rows
    

def execute_query_rowcount(query, params:dict = None, debug = False):
    """
    Run custom queries on the database
    `input` query: string with appropriate placeholders if applicable
    `input` param [optional]: dict with placehoder values if applicable
    `input` debug: Print the final query executed
    `returns` int with query's rowcount
    """
    conn = None
    cursor = None

    try:
        # Connection:
        conn = mysql.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        
        # Query execution: (always run query with external params -> prevents sql injection)
        cursor.execute(query, params)
        conn.commit()

        # Results:
        rows = cursor.rowcount
        
        # Debug:
        if debug: print(cursor.rowcount)
        return rows

    except Exception as e :
        print(e)
        raise Exception("Error with Database (execute_query)- Please check logs.")
    finally:
        conn.close()
        cursor.close()