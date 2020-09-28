"""
Configuration file.
"""

from pydantic import BaseSettings


class Settings(BaseSettings):
    """
    All configurations and env variables.
    """

    class Config:
        """
        Get data from env file.
        """
        env_file = "../.env"

    # *******************************
    #              AUTH             *
    # *******************************
    jwt_secret: str


settings = Settings()
