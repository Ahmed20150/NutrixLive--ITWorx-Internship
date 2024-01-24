from django.urls import path, include
from . import views

urlpatterns = [
    path('Create_workout/', views.CreateWorkPlan),
    path('displayPlan/', views.DisplayPlan),
    path('followUp/',views.FollowUp),
]