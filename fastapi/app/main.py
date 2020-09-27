"""
Application entrypoint.
"""

from fastapi import FastAPI
from starlette.graphql import GraphQLApp
from graphql.execution.executors.asyncio import AsyncioExecutor
from tortoise.contrib.fastapi import register_tortoise

from core.schema import schema


#############################
#         App Server        #
#############################

app = FastAPI()

# Add the GQL App server in root url
app.add_route("/", GraphQLApp(
    schema=schema,
    executor_class=AsyncioExecutor,
))


#############################
#         DB Register       #
#############################

# Initialize and close connections
register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={
        "models": ["users.models"]
    },
    generate_schemas=True,
    add_exception_handlers=True,
)
