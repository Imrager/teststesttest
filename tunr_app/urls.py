from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('users', views.UserView)
router.register('reviews', views.ReviewView)
router.register('comments', views.CommentView)
router.register('episodes', views.ShowView, base_name='episodes')


urlpatterns = [
    path('', include(router.urls))
]