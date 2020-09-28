"""
Schemas about links operations.
"""

import graphene

from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.query_utils import Q
from graphene_pydantic import PydanticObjectType

from core.auth import security
from users.schema import UserType
from .models import Link, Vote


# *******************************
#             TYPES             *
# *******************************

LinkModelSchema = pydantic_model_creator(Link)
VoteModelSchema = pydantic_model_creator(Vote)


class LinkType(PydanticObjectType):
    """
    Link type.
    """
    id = graphene.Int(required=True)
    posted_by = graphene.Field(UserType, required=True)

    class Meta:
        """Get types from db model."""
        model = LinkModelSchema
        exclude_fields = ("id")


class VoteType(PydanticObjectType):
    """
    Link type.
    """
    id = graphene.Int(required=True)
    user = graphene.Field(UserType)
    link = graphene.Field(LinkType)

    class Meta:
        """Get types from db model."""
        model = VoteModelSchema
        exclude_fields = ("id")


# *******************************
#             QUERYS            *
# *******************************

class Query(graphene.ObjectType):
    """
    Links querys.
    """
    links = graphene.List(
        LinkType,
        search=graphene.String(),
        skip=graphene.Int(),
        take=graphene.Int(),
    )

    votes = graphene.List(VoteType)

    async def resolve_links(
            self, info, search: str = None, skip: int = None, take: int = None):
        """Return the links that matches the filters"""
        query = Link.all()
        if search:
            query = query.filter(
                Q(url__icontains=search) |
                Q(description__icontains=search)
            )

        links = await query.prefetch_related("posted_by")

        if skip:
            links = links[skip:]
        if take:
            links = links[:take]
        return links

    async def resolve_votes(self, info):
        """Return all votes"""
        return await Vote.all().prefetch_related("user", "link")


# *******************************
#           MUTATIONS           *
# *******************************

class CreateLink(graphene.Mutation):
    """
    Create a new link.
    """
    link = graphene.Field(LinkType)

    class Arguments:
        """Required Arguments."""
        url = graphene.String(required=True)
        description = graphene.String(required=True)

    async def mutate(self, info, url: str, description: str):
        """Logic to create a new link"""
        user = await security.get_current_user(info)
        link = await Link.create(url=url, description=description, posted_by=user)
        return CreateLink(link=link)


class UpdateLink(graphene.Mutation):
    """
    Update a existing link.
    """
    link = graphene.Field(LinkType)

    class Arguments:
        """Required Arguments."""
        id = graphene.Int(required=True)
        url = graphene.String()
        description = graphene.String()

    async def mutate(self, info, id: int, url: str = None, description: str = None):
        """Logic to create a new link"""
        _ = await security.get_current_user(info)
        link = await Link.filter(id=id).first().prefetch_related("posted_by")
        if url:
            link.url = url
        if description:
            link.description = description
        await link.save()
        return UpdateLink(link=link)


class AddVote(graphene.Mutation):
    """
    Add a vote to a link.
    """
    user = graphene.Field(UserType)
    link = graphene.Field(LinkType)

    class Arguments:
        """Required arguments"""
        link_id = graphene.Int(required=True)

    async def mutate(self, info, link_id: int):
        """Logic to create a vote"""
        user = await security.get_current_user(info)

        link = await Link.get(id=link_id).prefetch_related("posted_by")
        if not link:
            raise Exception("Invalid ID")

        await Vote.create(user=user, link=link)
        return AddVote(user=user, link=link)


class Mutation(graphene.ObjectType):
    """
    Link mutations.
    """
    create_link = CreateLink.Field()
    update_link = UpdateLink.Field()

    add_vote = AddVote.Field()
