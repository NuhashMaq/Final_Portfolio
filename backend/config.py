import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///portfolio.db')
    CORS_ORIGINS = [
        o.strip() for o in os.getenv(
            'CORS_ORIGINS',
            'http://localhost:3000,http://127.0.0.1:3000'
        ).split(',') if o.strip()
    ]

    # ---- Contact email (SMTP) ----
    # For Gmail you must use an App Password (not your normal password).
    SMTP_HOST = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    SMTP_PORT = int(os.getenv('SMTP_PORT', '587'))
    SMTP_USERNAME = os.getenv('SMTP_USERNAME', '')
    SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '')
    SMTP_USE_TLS = os.getenv('SMTP_USE_TLS', 'true').strip().lower() in ('1', 'true', 'yes', 'on')

    # Where contact form emails should be delivered.
    CONTACT_TO_EMAIL = os.getenv('CONTACT_TO_EMAIL', '')

    # The From header used when sending mail via SMTP (often must match SMTP_USERNAME for Gmail).
    CONTACT_FROM_EMAIL = os.getenv('CONTACT_FROM_EMAIL', '')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
