from fastapi import HTTPException
import mysql.connector
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Database:

    pwd_Context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_Context.verify(plain_password, hashed_password)

    def hash_password(self, password: str):
        return self.pwd_Context.hash(password)

    def __init__(self, host, port, username, password, DB_name):
        self.config = {
            "host" : host,
            "port" : port,
            "username" : username,
            "password" : password,
            "database" : DB_name
        }
    
    def get_db_connection(self):
        try:
            # Establish Connection
            connection = mysql.connector.connect(**self.config)
            return connection
        
        except mysql.connector.Error as err:
            raise HTTPException(status_code=500, detail=f"Error: {err}")
