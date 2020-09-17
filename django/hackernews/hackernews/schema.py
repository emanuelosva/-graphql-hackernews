"""
GraphQl Schema root.
"""

import graphene
import graphql_jwt

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
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
