"""
Links Models
"""

from django.db import models
from django.conf import settings


class Link(models.Model):
    """
    Link model
    """
    url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    posted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        """
        To string method
        """
        return self.url
