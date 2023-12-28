#!/bin/sh

python manage.py collectstatic --noinput
python manage.py migrate --noinput
gunicorn backend.wsgi:application --bind 0.0.0.0:8000