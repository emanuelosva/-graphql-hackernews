"""
Links Models
"""

from django.db import models


class Link(models.Model):
    """
    Link model
    """
    url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
