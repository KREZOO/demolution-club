from django.contrib import admin
from django.urls import path, include

def index(request):
    return JsonResponse({"message": "Django backend is running."})

urlpatterns = [
    path("", index),
    path("api/auth/", include("accounts.urls")),
    path("api/blog/", include("blog.urls")),
]
