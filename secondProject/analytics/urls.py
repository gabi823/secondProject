from django.urls import path
from . import views

urlpatterns = [
    path('personality/', views.listening_personality_view, name='listening_personality'),
]
