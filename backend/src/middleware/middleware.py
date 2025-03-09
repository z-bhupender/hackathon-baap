from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


def configure_middleware(app: FastAPI) -> FastAPI:

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
