from django.urls import path
from . import views

urlpatterns = [
    path('blogs/', views.blog_list, name='blog-list'),
    path('blogs/create/', views.blog_create, name='blog-create'),
    path('blogs/<uuid:pk>/', views.blog_detail, name='blog-detail'),
    path('blogs/<uuid:pk>/update/', views.blog_update, name='blog-update'),
    path('blogs/<uuid:pk>/delete/', views.blog_delete, name='blog-delete'),
    path('blogs/random/', views.random_blogs, name='random-blogs'),
]