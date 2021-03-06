import os


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
PACKAGE_ROOT = os.path.abspath(os.path.dirname(__file__))
BASE_DIR = PACKAGE_ROOT

DEBUG = True
TEMPLATE_DEBUG = DEBUG


DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'chrisdb',
            'USER': 'christest',
            'PASSWORD': 'gags1313',
            'HOST': 'christest.c5s5wgavsyu2.us-west-2.rds.amazonaws.com',
            'PORT': '3306',
        }
    }



ALLOWED_HOSTS = []

# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# On Unix systems, a value of None will cause Django to use the same
# timezone as the operating system.
# If running in a Windows environment this must be set to the same as your
# system time zone.
TIME_ZONE = "UTC"

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
LANGUAGE_CODE = "en-us"

SITE_ID = int(os.environ.get("SITE_ID", 1))

# If you set this to False, Django will make some optimizations so as not
# to load the internationalization machinery.
USE_I18N = True

# If you set this to False, Django will not format dates, numbers and
# calendars according to the current locale.
USE_L10N = True

# If you set this to False, Django will not use timezone-aware datetimes.
USE_TZ = True

# Absolute filesystem path to the directory that will hold user-uploaded files.
# Example: "/home/media/media.lawrence.com/media/"
MEDIA_ROOT = os.path.join(PACKAGE_ROOT, "media")

# URL that handles the media served from MEDIA_ROOT. Make sure to use a
# trailing slash.
# Examples: "http://media.lawrence.com/media/", "http://example.com/media/"
MEDIA_URL = "/media/"

# Absolute path to the directory static files should be collected to.
# Don"t put anything in this directory yourself; store your static files
# in apps" "static/" subdirectories and in STATICFILES_DIRS.
# Example: "/home/media/media.lawrence.com/static/"
#STATIC_ROOT = os.path.join(PACKAGE_ROOT, "site_media", "static") # where on my computer

# URL prefix for static files.
# Example: "http://media.lawrence.com/static/"
#STATIC_URL = "/static/" #what the url is

#STATIC_ROOT = os.path.join(BASE_DIR,"static")
STATIC_ROOT = BASE_DIR
STATIC_URL = 'web_experiments/'

# Additional locations of static files
STATICFILES_DIRS = [
    os.path.join(PACKAGE_ROOT, "static"),
    os.path.join(PACKAGE_ROOT, "experiment_example"),
    os.path.join(PACKAGE_ROOT, "experiment_bandit"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi_combined"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi_combined_est"),
    os.path.join(PACKAGE_ROOT, "experiment_horizon"),
    os.path.join(PACKAGE_ROOT, "experiment_motiondots"),
    os.path.join(PACKAGE_ROOT, "experiment_beliefupdate"),
    os.path.join(PACKAGE_ROOT, "experiment_questionnaires"),
    os.path.join(PACKAGE_ROOT, "experiment_effort"),
    os.path.join(PACKAGE_ROOT, "experiment_planning"),
    os.path.join(PACKAGE_ROOT, "static/images"),
    os.path.join(PACKAGE_ROOT, "static/js"),
]

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = [
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
]

# Make this unique, and don't share it with anybody.
SECRET_KEY = "t$)p=3nf$^c$o(7#o14z^4-amf&3sd5ykjjm13%nlv5w)yh1!u"

# List of callables that know how to import templates from various sources.
TEMPLATE_LOADERS = [
    "django.template.loaders.filesystem.Loader",
    "django.template.loaders.app_directories.Loader",
]

TEMPLATE_CONTEXT_PROCESSORS = [
    "django.contrib.auth.context_processors.auth",
    "django.core.context_processors.debug",
    "django.core.context_processors.i18n",
    "django.core.context_processors.media",
    "django.core.context_processors.static",
    "django.core.context_processors.tz",
    "django.core.context_processors.request",
    "django.contrib.messages.context_processors.messages",
    "account.context_processors.account",
    "pinax_theme_bootstrap.context_processors.theme",
]


MIDDLEWARE_CLASSES = [
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.auth.middleware.SessionAuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "web_experiments.urls"

# Python dotted path to the WSGI application used by Django's runserver.
WSGI_APPLICATION = "web_experiments.wsgi.application"

TEMPLATE_DIRS = [
    os.path.join(PACKAGE_ROOT, "templates"),
    os.path.join(PACKAGE_ROOT, "experiment_example"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi_combined"),
    os.path.join(PACKAGE_ROOT, "experiment_ambi_combined_est"),
    os.path.join(PACKAGE_ROOT, "experiment_bandit"),
    os.path.join(PACKAGE_ROOT, "experiment_horizon"),
    os.path.join(PACKAGE_ROOT, "experiment_motiondots"),
    os.path.join(PACKAGE_ROOT, "experiment_beliefupdate"),
    os.path.join(PACKAGE_ROOT, "experiment_questionnaires"),
    os.path.join(PACKAGE_ROOT, "experiment_effort"),
    os.path.join(PACKAGE_ROOT, "experiment_planning"),
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.sessions",
    "django.contrib.sites",
    "django.contrib.staticfiles",

    ### addded
    "simplejson",

    # theme
    "bootstrapform",
    "pinax_theme_bootstrap",

    # external
    "account",
    "eventlog",
    "metron",

    # project
    "web_experiments",
    "web_experiments.models",
    "web_experiments.experiment_example.experiment_example_models",
    "web_experiments.experiment_beliefupdate.experiment_beliefupdate_models"

]

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error when DEBUG=False.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "require_debug_false": {
            "()": "django.utils.log.RequireDebugFalse"
        }
    },
    "handlers": {
        "mail_admins": {
            "level": "ERROR",
            "filters": ["require_debug_false"],
            "class": "django.utils.log.AdminEmailHandler"
        }
    },
    "loggers": {
        "django.request": {
            "handlers": ["mail_admins"],
            "level": "ERROR",
            "propagate": True,
        },
    }
}

FIXTURE_DIRS = [
    os.path.join(PROJECT_ROOT, "fixtures"),
]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ACCOUNT_OPEN_SIGNUP = False
ACCOUNT_EMAIL_UNIQUE = True
ACCOUNT_EMAIL_CONFIRMATION_REQUIRED = False
ACCOUNT_LOGIN_REDIRECT_URL = "home"
ACCOUNT_LOGOUT_REDIRECT_URL = "home"
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 2

AUTHENTICATION_BACKENDS = [
    "account.auth_backends.UsernameAuthenticationBackend",
]
