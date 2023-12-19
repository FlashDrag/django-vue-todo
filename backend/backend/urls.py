from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from core import views

router = routers.DefaultRouter()
router.register('todos', views.TodoView, 'todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/create/', views.CreateUserView.as_view(), name='create'),
    path('api/token/', views.CreateTokenView.as_view(), name='token'),
    path('api/me/', views.ManageUserView.as_view(), name='me'),
    path('api/', include(router.urls))
]
