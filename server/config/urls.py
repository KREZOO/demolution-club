from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def index(request):
    return JsonResponse({"message": "Django backend is running."})

urlpatterns = [
    path("", index),
    path("api/auth/", include("accounts.urls")),
    path("api/blogs/", include("blog.urls")),
]
