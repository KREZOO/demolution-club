from django.db import models
from django.contrib.auth.models import User
import uuid

class Blog(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    content = models.TextField()
    tags = models.CharField(max_length=255, blank=True, null=True)
    preview = models.URLField(blank=True, default='/default-blog.png')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(User, related_name='blogs', on_delete=models.CASCADE)

    def __str__(self):
        return self.title