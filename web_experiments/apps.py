from django.apps import AppConfig as BaseAppConfig
from django.utils.importlib import import_module


class AppConfig(BaseAppConfig):

    name = "web_experiments"

    def ready(self):
        import_module("web_experiments.receivers")
