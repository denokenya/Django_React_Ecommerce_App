from django.apps import AppConfig


class BaseConfig(AppConfig):
    name = 'base'

    def read(self):
        import base.signals 
