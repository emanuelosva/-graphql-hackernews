"""
GQL schema for Links
"""

import graphene
from graphene_django import DjangoObjectType
from django.forms.models import model_to_dict

from users.schema import UserType
from .models import Link, Vote


# *******************************
#             TYPES             *
# *******************************

class LinkType(DjangoObjectType):
    """
    Link type.

    type Link {
        url: String!
        description: String!
        created_at: Date!
        updated_at: Date!
    }
    """
    class Meta:
        """
        Inherit types from Link django model
        """
        model = Link


class VoteType(DjangoObjectType):
    """
    Vote type.

    type Vote {
        user: User!
        link: Link!
    }
    """

    class Meta:
        """
        Inherit types from Vote django model
        """
        model = Vote


# *******************************
#             QUERYS            *
# *******************************

class Query(graphene.ObjectType):
    """
    Querys definitions. gql -> type Query { ... }
    """
    links = graphene.List(LinkType)
    votes = graphene.List(VoteType)

    def resolve_links(self, info):
        """Retrieve all stored Links"""
        return Link.objects.all()

    def resolve_votes(self, info):
        """Retrieve all stored Votes"""
        return Vote.objects.all()


# *******************************
#           MUTATIONS           *
# *******************************

class CreateLink(graphene.Mutation):
    """
    Mutation for create new Link.
    gql -> type Mutation { createLink(...): Link! }
    """
    link = graphene.Field(LinkType)

    class Arguments:
        """
        Mutation arguments
        """
        url = graphene.String(required=True)
        description = graphene.String(required=True)

    def mutate(self, info, url, description):
        """Mutation resolver"""
        user = info.context.user or None
        new_link = Link(url=url, description=description, posted_by=user)
        new_link.save()

        return CreateLink(link=new_link)


class UpdateLink(graphene.Mutation):
    """
    Mutation for update a existing Link.
    gql -> type Mutation { updateLink(...): Link! }
    """
    link = graphene.Field(LinkType)

    class Arguments:
        """
        Mutation arguments
        """
        id = graphene.Int(required=True)
        url = graphene.String()
        description = graphene.String()

    def mutate(self, info, id, url=None, description=None):
        """Mutation resolver"""
        link = Link.objects.get(id=id)
        if bool(url):
            link.url = url
        if bool(description):
            link.description = description

        link.save()
        return UpdateLink(link=link)


class DeleteLink(graphene.Mutation):
    """
    Mutation for delete a existing Link.
    """
    link = graphene.Field(LinkType)

    class Arguments:
        """
        Mutation arguments
        """
        id = graphene.String(required=True)

    def mutate(self, info, id):
        """Mutation resolver"""
        link = Link.objects.get(id=id)
        link.delete()

        return DeleteLink(link=link)


class CreateVote(graphene.Mutation):
    """
    Mutation for add a vote to a Link.
    gql -> type Mutation { createVote(...): Vote! }
    """
    user = graphene.Field(UserType)
    link = graphene.Field(LinkType)

    class Arguments:
        """
        Mutation arguments
        """
        link_id = graphene.Int(required=True)

    def mutate(self, info, link_id):
        """Mutation resolver"""
        user = info.context.user
        if user.is_anonymous:
            raise Exception('You must be logged to vote')

        link = Link.objects.get(id=link_id)
        if not link:
            raise Exception('Invalid Link')

        Vote.objects.create(user=user, link=link)

        return CreateVote(user=user, link=link)


class Mutation(graphene.ObjectType):
    """
    Mutations. gql -> type Mutation { ... }
    """

    # About Link
    create_link = CreateLink.Field()
    update_link = UpdateLink.Field()
    delete_link = DeleteLink.Field()

    # About Vote
    create_vote = CreateVote.Field()
