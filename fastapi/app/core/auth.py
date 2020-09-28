"""
Auth functionalities.
"""

from datetime import datetime, timedelta
from fastapi import Request
from fastapi.security.api_key import APIKeyHeader
from jose import jwt, JWTError
from passlib.context import CryptContext

from users.models import User
from config import settings


# Password manage
pwd_context = CryptContext(schemes=["bcrypt"])

# Token extracter
auth_schema = APIKeyHeader(name="Authorization")


# *******************************
#         Auth helpers          *
# *******************************

class Security:
    """
    Class for manage security tasks.
    """

    def raise_unauthorized_exception(self) -> None:
        """
        Raise a aunauthorized exception and interrump
        the request process.
        """
        raise Exception("Unauthorized")

    def raise_invalid_credentials_exception(self) -> None:
        """
        Raise a aunauthorized exception and interrump
        the request process.
        """
        raise Exception("Invalid credentials")

    def hash_password(self, password: str) -> str:
        """Return a hashed password."""
        return pwd_context.hash(password)

    def verify_password(self, password: str, hashed_password: str) -> bool:
        """Verify the has password"""
        return pwd_context.verify(password, hashed_password)

    def create_access_token(self, email: str) -> str:
        """Create a encoded JWT."""
        to_encode = {"email": email}

        expire = datetime.utcnow() + timedelta(days=1)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, settings.jwt_secret, algorithm="HS256")

    async def get_current_user(self, info):
        """
        Authenticate the user request and verify if it is valid.
        """
        request: Request = info.context["request"]
        token = request.headers.get("Authorization")

        if not token:
            self.raise_invalid_credentials_exception()
        if token.startswith("Bearer"):
            token = token.split(" ")[0]

        try:
            payload: dict = jwt.decode(
                token,
                settings.jwt_secret,
                algorithms=["HS256"],
            )
        except JWTError:
            self.raise_invalid_credentials_exception()

        email = payload.get("email")
        if not email:
            self.raise_invalid_credentials_exception()

        current_user = await User.filter(email=email).first()
        if not current_user:
            self.raise_invalid_credentials_exception()

        return current_user


security = Security()
