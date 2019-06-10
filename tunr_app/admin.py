from django.contrib import admin
from .models import Season, Episode, Review

# Register your models here.

admin.site.register([Season, Episode, Review])