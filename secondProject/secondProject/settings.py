"""
Django settings for secondProject project.
"""
from pathlib import Path
import os
import json

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Determine if the app is running in production or locally
DEBUG = 'WEBSITE_HOSTNAME' not in os.environ  # Set WEBSITE_HOSTNAME in production

if DEBUG:
    # Local development settings
    try:
        # Attempt to load secrets.json
        with open(os.path.join(BASE_DIR, 'secrets.json')) as f:
            secrets = json.load(f)

        SECRET_KEY = secrets.get("SECRET_KEY", "default-local-secret-key")
        SPOTIFY_CLIENT_ID = secrets.get("SPOTIFY_CLIENT_ID", "default-local-client-id")
        SPOTIFY_CLIENT_SECRET = secrets.get("SPOTIFY_CLIENT_SECRET", "default-local-client-secret")
        SPOTIFY_REDIRECT_URI = secrets.get("SPOTIFY_REDIRECT_URI", "http://localhost:8000/spotify-callback/")
        SPOTIFY_REFRESH_TOKEN = secrets.get("SPOTIFY_REFRESH_TOKEN", "default-local-refresh-token")
    except FileNotFoundError:
        # Fallback to default values if secrets.json is missing
        print("Warning: secrets.json not found. Using fallback values for local development.")
        SECRET_KEY = "default-local-secret-key"
        SPOTIFY_CLIENT_ID = "default-local-client-id"
        SPOTIFY_CLIENT_SECRET = "default-local-client-secret"
        SPOTIFY_REDIRECT_URI = "http://localhost:8000/spotify-callback/"
        SPOTIFY_REFRESH_TOKEN = "default-local-refresh-token"
else:
    # Production settings
    SECRET_KEY = os.environ['SECRET_KEY']
    SPOTIFY_CLIENT_ID = os.environ['SPOTIFY_CLIENT_ID']
    SPOTIFY_CLIENT_SECRET = os.environ['SPOTIFY_CLIENT_SECRET']
    SPOTIFY_REDIRECT_URI = os.environ['SPOTIFY_REDIRECT_URI']
    SPOTIFY_REFRESH_TOKEN = os.environ['SPOTIFY_REFRESH_TOKEN']


ALLOWED_HOSTS = [
    '127.0.0.1',
    'localhost',
    'secondproject-8lyv.onrender.com'
]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'spotifyWrapped.apps.SpotifywrappedConfig',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add whitenoise for static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS settings
if DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:3000",
    ]
else:
    CORS_ALLOWED_ORIGINS = [
        "https://second-project-alpha-rust.vercel.app",
    ]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

ROOT_URLCONF = 'secondProject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'secondProject.wsgi.application'

# Database
if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    # Configure your production database here
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.environ['DBNAME'],
            'HOST': os.environ['DBHOST'],
            'USER': os.environ['DBUSER'],
            'PASSWORD': os.environ['DBPASS'],
        }
    }

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Security settings for production
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True

# Rest Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}

# Session settings
SESSION_COOKIE_AGE = 86400
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
SESSION_SAVE_EVERY_REQUEST = True
SESSION_ENGINE = 'django.contrib.sessions.backends.db'

# URLs
LOGIN_REDIRECT_URL = '/spotify/data/'
LOGOUT_REDIRECT_URL = '/spotify/login/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'