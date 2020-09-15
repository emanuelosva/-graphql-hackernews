"""
GQL schema for Links
"""

import graphene
from graphene_django import DjangoObjectType

from .models import Link


class LinkType(DjangoObjectType):
    """
    Link type. gql -> `type Link {...}`
    """
    class Meta:
        model = Link


class Query(graphene.ObjectType):
    """
    Querys definitions. gql -> type Query { ... }
    """
    links = graphene.List(LinkType)

    def resolve_links(self, info, **kwargs):
        """
        Resolver for `links` query.
        """
        return Link.objects.all()
