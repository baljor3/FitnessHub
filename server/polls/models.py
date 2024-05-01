from django.db import models



class CustomUser(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=False, null=False)
    salt = models.CharField(max_length=64)
    hashed_pass = models.CharField(max_length=64)
    is_premium = models.BooleanField(default=False)
  
    
    def __str__(self):
        return self.username
