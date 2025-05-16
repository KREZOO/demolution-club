from django.urls import path
from . import views

urlpatterns = [
    path('', views.blog_list, name='blog-list'),
    path('create/', views.blog_create, name='blog-create'),
    path('<uuid:pk>/', views.blog_detail, name='blog-detail'),
    path('<uuid:pk>/update/', views.blog_update, name='blog-update'),
    path('<uuid:pk>/delete/', views.blog_delete, name='blog-delete'),
    path('random/', views.random_blogs, name='random-blogs'),
]