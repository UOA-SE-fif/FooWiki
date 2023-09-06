from .. import app

@app.route("/")
def _():
    return 'index.html'