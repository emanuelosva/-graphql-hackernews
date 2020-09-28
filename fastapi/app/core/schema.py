"""
Schema merge file.
"""

import graphene
import users.schema
import links.schema


class Query(
        users.schema.Query,
        links.schema.Query,
        graphene.ObjectType):
    """
    Base Query object. (Merge all Query components)
    """
    pass


class Mutation(
        users.schema.Mutation,
        links.schema.Mutation,
        graphene.ObjectType):
    """
    Base Mutation object. (Merge all Mutation components)
    """
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
