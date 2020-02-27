from flask import Flask, render_template, request, jsonify
#from https://flask-wtf.readthedocs.io/en/latest/csrf.html
from flask_wtf.csrf import CSRFProtect, CSRFError, validate_csrf

app = Flask(__name__)
app.secret_key = 'example'
#To Register CSRF protection globally for the app
csrf = CSRFProtect(app)
csrf.init_app(app)

#you don't need this, its already returning a 400 response
# @app.errorhandler(CSRFError)
# def handle_csrf_error(e):
#     return render_template('csrf_error.html', reason=e.description), 400


@app.route('/')
def index():
	return render_template('form.html')

#you don't need this one either, no idea why.
# @app.errorhandler(CSRFError)
@app.route('/process', methods=['POST'])
def process():
	email = request.form['email']
	name = request.form['name']
	mytoken = request.environ.get("HTTP_X_CSRFTOKEN")
	print(mytoken)

	if name and email:
		newName = name[::-1]

		return jsonify({'name' : newName})

	return jsonify({'error' : 'Missing data!'})

if __name__ == '__main__':
	app.run(debug=True)