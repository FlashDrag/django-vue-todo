#!/bin/sh

python manage.py collectstatic --noinput
echo "Hello from entrypoint.sh"
python manage.py migrate
gunicorn backend.wsgi:application --bind 0.0.0.0:8000