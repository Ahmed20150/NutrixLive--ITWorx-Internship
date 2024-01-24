from django.urls import path, include
from . import views


urlpatterns = [
    path('createNutriplan/', views.CreateNutriPlan),
    path('displayPlan/', views.DisplayPlan),
    path('followUp/',views.FollowUp),
]