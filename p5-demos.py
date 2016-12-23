from flask import Flask, render_template

app = Flask(__name__)
app.secret_key = 'secret'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<demo>')
def get_demo(demo):
    return render_template(demo)


if __name__ == '__main__':
    app.run(
        debug=True
    )
