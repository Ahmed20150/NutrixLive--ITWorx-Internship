from django.db import models

class WorkOutPlan(models.Model):
    plan = models.TextField(null=True)
    email = models.CharField(max_length=60)
   
