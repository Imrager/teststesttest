from django.contrib import admin
from .models import User, Review, Comment

# Register your models here.

admin.site.register([User, Review, Comment])