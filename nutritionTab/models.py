from django.db import models

# Create your models here.

class Nutrition(models.Model):
    plan = models.TextField(null=True)
    email = models.CharField(max_length=60)







