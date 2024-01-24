from django.urls import path, include
from . import views

urlpatterns = [
    path('sendMessage/', views.sendMessage),
]