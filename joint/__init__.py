# -*- coding: utf-8 -*-

from flask import Flask

joint = Flask(__name__)
joint.config.from_object('config')
from joint import views