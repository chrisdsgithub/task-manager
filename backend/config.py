
class Config:
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:root@localhost/taskmanager'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your-secret-key-change-in-production'
    SESSION_TYPE = 'filesystem'
    PERMANENT_SESSION_LIFETIME = 86400  # 24 hours in seconds