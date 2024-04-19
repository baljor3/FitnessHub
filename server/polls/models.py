from django.db import models

# Create your models here.
import hashlib

class CustomUser(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=False, null=False)
    hashed_pass = models.CharField(max_length=64)
    is_premium = models.BooleanField(default=False)
  

    def save(self, *args, **kwargs):
        # Encode the password before hashing
        encoded_password = self.hashed_pass.encode('utf-8')
        
        # Hash the password using SHA256
        hashed_password = hashlib.sha256(encoded_password).hexdigest()
        
        # Update the hashed password field
        self.hashed_pass = hashed_password
        
        # Call the superclass's save method
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.username
