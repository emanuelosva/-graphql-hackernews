"""
Link model definitions.
"""

from tortoise.models import Model
from tortoise import fields


class Link(Model):
    """
    Link model.
    """
    id = fields.IntField(pk=True)
    url = fields.TextField()
    description = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)
    posted_by = fields.ForeignKeyField(
        "models.User",
        related_name="postedBy",
        on_delete=fields.CASCADE,
    )

    def __str__(self):
        """
        Print format.
        """
        return self.url

    class Meta:
        ordering = ["updated_at"]


class Vote(Model):
    """
    Vote model.
    """
    id = fields.IntField(pk=True)
    user = fields.ForeignKeyField(
        "models.User",
        on_delete=fields.CASCADE,
    )
    link = fields.ForeignKeyField(
        "models.Link",
        on_delete=fields.CASCADE,
    )
