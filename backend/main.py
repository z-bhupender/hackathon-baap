import uvicorn
from src import App

app = App()

uvicorn.run(app, host="localhost", port=8000)
