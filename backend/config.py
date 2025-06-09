class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/taskmanager'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = '12345'