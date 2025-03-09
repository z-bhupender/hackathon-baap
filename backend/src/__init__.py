from fastapi import FastAPI
from src.middleware import configure_middleware

def App():
    app = FastAPI(debug=True)

    app = configure_middleware(app)

    return app