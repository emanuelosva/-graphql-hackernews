"""
GraphQl Schema root.
"""

import graphene
import links.schema


class Query(links.schema.Query, graphene.ObjectType):
    """
    Base Query object.
    """
    pass


class Mutation(links.schema.Mutation, graphene.ObjectType):
    """
    Base Mutation object.
    """
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
