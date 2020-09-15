"""
Hackernews URL Configuration
"""

from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.contrib import admin
from django.urls import path

from .settings import PRODUCTION

urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=not PRODUCTION)))
]
