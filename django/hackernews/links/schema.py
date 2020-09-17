"""
GQL schema for Links
"""

import graphene
from graphene_django import DjangoObjectType
from django.forms.models import model_to_dict

from .models import Link


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
        model = Link


# *******************************
#             QUERYS            *
# *******************************

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
        """
        Mutation resolver
        """
        new_link = Link(url=url, description=description)
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
        """
        Mutation resolver
        """
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
        """
        Mutation resolver
        """
        link = Link.objects.get(id=id)
        link.delete()

        return DeleteLink(link=link)


class Mutation(graphene.ObjectType):
    """
    Mutations. gql -> type Mutation { ... }
    """
    create_link = CreateLink.Field()
    update_link = UpdateLink.Field()
    delete_link = DeleteLink.Field()
