"""
Schema merge file.
"""

import graphene
import users.schema


class Query(
        users.schema.Query,
        graphene.ObjectType):
    """
    Base Query object. (Merge all Query components)
    """
    pass


class Mutation(graphene.ObjectType):
    """
    Base Mutation object. (Merge all Mutation components)
    """
    pass


schema = graphene.Schema(query=Query)
