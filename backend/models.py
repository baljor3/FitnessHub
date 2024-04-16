
from django.db import models
import hashlib

class CustomUser(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True,blank=False, null=False)
    hashed_pass = models.CharField(max_length=64)
    is_premium = models.BooleanField(default = False)

    def save(self, *args, **kwargs):
        self.hashed_pass = hashlib.sha256(self.my_field.encode().hedigest())
        super().save(*args,**kwargs)

