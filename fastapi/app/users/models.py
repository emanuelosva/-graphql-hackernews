"""
User model definition.
"""

from tortoise.models import Model
from tortoise import fields


class User(Model):
    """
    User model.
    """
    id = fields.IntField(pk=True)
    name = fields.TextField()
    email = fields.CharField(unique=True, max_length=126)
    password = fields.TextField()

    def __str__(self):
        """
        Print format.
        """
        return self.email

    class Meta:
        ordering = ["email"]
