"""
GQL schema for Users
"""

import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model


# *******************************
#             TYPES             *
# *******************************

class UserType(DjangoObjectType):
    """
    Link type.

    type Users {
        username: String!
        email: String!
        password: String!
    }
    """
    class Meta:
        """
        Inherit types from User django model
        """
        model = get_user_model()


# *******************************
#             QUERYS            *
# *******************************

class Query(graphene.ObjectType):
    """
    Users Querys.
    """
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_users(self, info):
        """Retrieve all users"""
        return get_user_model().objects.all()

    def resolve_me(self, info):
        """Retrieve the current logged user"""
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not Logged in!')

        return user


# *******************************
#           MUTATIONS           *
# *******************************

class CreateUser(graphene.Mutation):
    """
    Mutation for create new User.
    gql -> type Mutation { createUser(...): User! }
    """
    user = graphene.Field(UserType)

    class Arguments:
        """
        Mutation Arguments
        """
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, email, password):
        """Mutation resolver"""
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    """
    User mutations
    """
    create_user = CreateUser.Field()
