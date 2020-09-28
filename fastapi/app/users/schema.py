"""
GQL Schema for User Querys and Mutations
"""

import graphene

from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.exceptions import IntegrityError
from graphene_pydantic import PydanticObjectType

from core.auth import security
from .models import User


# *******************************
#             TYPES             *
# *******************************

# Pydantic User schema model:
UserModelSchema = pydantic_model_creator(User)


class UserType(PydanticObjectType):
    """
    User type.
    """
    id = graphene.String(required=True)

    class Meta:
        """Get types from db model."""
        model = UserModelSchema
        exclude_fields = ("id",)


# *******************************
#             QUERYS            *
# *******************************

class Query(graphene.ObjectType):
    """
    Users querys.
    """
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    async def resolve_users(self, info):
        """Retrieve all users."""
        return await User.all()

    async def resolve_me(self, info):
        """Return the current user."""
        user = await security.get_current_user(info)
        return user


# *******************************
#           MUTATIONS           *
# *******************************

class CreateUser(graphene.Mutation):
    """
    Mutation for create a new user.
    """
    user = graphene.Field(UserType)

    class Arguments:
        """Required Arguments"""
        name = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    async def mutate(self, info, name: str, email: str, password: str):
        """Logic to create a new user"""
        hashed_password = security.hash_password(password)
        try:
            user = await User.create(name=name, email=email, password=hashed_password)
        except IntegrityError:
            raise Exception('email must be UNIQUE')
        return CreateUser(user=user)


class LoginUser(graphene.Mutation):
    """
    Authenticate and login a user.
    """
    token = graphene.String(required=True)

    class Arguments:
        """Required Arguments"""
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    async def mutate(self, info, email: str, password: str):
        """Logic to login a user"""
        user = await User.filter(email=email).first()

        if not user:
            security.raise_invalid_credentials_exception()
        if not security.verify_password(password, user.password):
            security.raise_invalid_credentials_exception()

        jwt_token = security.create_access_token(user.email)
        return LoginUser(token=jwt_token)


class UpdateUser(graphene.Mutation):
    """
    Authenticate and login a user.
    """
    user = graphene.Field(UserType)

    class Arguments:
        """Required Arguments"""
        id = graphene.Int(required=True)
        name = graphene.String()
        email = graphene.String()

    async def mutate(
            self, info, id: int, email: str = None, name: str = None):
        """Logic to login a user"""
        _ = await security.get_current_user(info)
        user = await User.filter(id=id).first()

        if not user:
            raise Exception("Invalid ID")
        if email:
            user.email = email
        if name:
            user.name = name
        await user.save()
        return UpdateUser(user=user)


class Mutation(graphene.ObjectType):
    """
    User mutations.
    """
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()
    update_user = UpdateUser.Field()
