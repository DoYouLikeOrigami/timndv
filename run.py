#!/home/www/.virtualenvs/flask/bin/python
from joint import joint as application

if __name__ == '__main__':
    application.run(host='0', port=4444, debug=True)
