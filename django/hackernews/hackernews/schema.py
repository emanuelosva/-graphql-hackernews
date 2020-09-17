"""
GraphQl Schema root.
"""

import graphene
import links.schema
import users.schema


class Query(
        users.schema.Query,
        links.schema.Query,
        graphene.ObjectType):
    """
    Base Query object.
    """
    pass


class Mutation(
        users.schema.Mutation,
        links.schema.Mutation,
        graphene.ObjectType):
    """
    Base Mutation object.
    """
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
