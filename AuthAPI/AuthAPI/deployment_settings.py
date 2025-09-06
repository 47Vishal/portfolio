import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-sv!znqf^uvcxf)@30$+07#qq@+mj9e88km*81p1n6l9=&xd=0x')
RENDER_EXTERNAL_HOSTNAME = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

ALLOWED_HOSTS = [ RENDER_EXTERNAL_HOSTNAME, 
                 "portfolio-backend-f1yu.onrender.com", ]

CSRF_TRUSTED_ORIGINS = [
    f"https://{RENDER_EXTERNAL_HOSTNAME}",
    'https://'+ os.environ.get('RENDER_EXTERNAL_HOSTNAME'),
    'https://portfolio-frontend-bcwt.onrender.com'
    ]

# HCAPTCHA_SECRET_KEY = os.environ.get('HCAPTCHA_SECRET_KEY')
# HCAPTCHA_SITEKEY = os.environ.get('HCAPTCHA_SITEKEY')

# print("Loaded hCaptcha key:", HCAPTCHA_SECRET_KEY)  

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

FRONTEND_BASE_URL = os.environ.get('FRONTEND_BASE_URL', 'https://portfolio-frontend-bcwt.onrender.com')


CORS_ALLOWED_ORIGINS = [  # React dev server
    # "http://127.0.0.1:8000",
    FRONTEND_BASE_URL,
    os.environ.get('FRONTEND_BASE_URL', 'https://portfolio-frontend-bcwt.onrender.com')
] 

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [    'GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS',]

CORS_ALLOW_HEADERS = [
    'content-type',
    'authorization',
    'x-csrftoken',
]

STORAGES = {
    "default" : {
        "BACKEND" : "django.core.files.storage.FilesSystemStorage"
    },
    "staticfiles": {
        "BACKEND" : "whitenoise.storage.CompressedStaticFilesStorage"
    },
}
DATABASES = {
        'default': 
        dj_database_url.config(
            default=os.environ.get(
                'DATABASE_URL'
                ),
            conn_max_age=600
        )  
    }

LOGGING = {
    'version' : 1,
    'disable_existing_loggers' : False,
    'handlers' : {
        'mail_admins': {
            'level': 'ERROR',
            'class' : 'django.utils.log.AdminEmailHandler'
        },
    },
    'logger':{
        'django': {
            'handlers': ['mail_admins'],
            'level' : "ERROR",
            'propagate' : True,
        },
    },
}

ADMINS = [('CBI Analytics', "Yourmail@email.com")]

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.environ.get('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_PASS')
DEFAULT_FROM_EMAIL = 'default from email'


