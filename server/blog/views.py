from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer
from random import sample

# API for getting a list of blogs
@api_view(['GET'])
def blog_list(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

# API for getting a specific blog
@api_view(['GET'])
def blog_detail(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = BlogSerializer(blog)
    return Response(serializer.data)

# API for getting 3 random blogs
@api_view(['GET'])
def random_blogs(request):
    blogs = Blog.objects.all()

    if len(blogs) <= 3:
        random_blogs = blogs
    else:
        random_blogs = sample(list(blogs), 3)

    serializer = BlogSerializer(random_blogs, many=True)
    
    return Response(serializer.data)

# API for creating a new blog
@api_view(['POST'])
def blog_create(request):
    if request.method == 'POST':
        if 'preview' not in request.data or not request.data['preview']:
            request.data['preview'] = '/default-blog.png'

        serializer = BlogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API for updating a blog
@api_view(['PUT'])
def blog_update(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if 'preview' not in request.data or not request.data['preview']:
        request.data['preview'] = '/default-blog.png'

    serializer = BlogSerializer(blog, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API for deleting a blog
@api_view(['DELETE'])
def blog_delete(request, pk):
    try:
        blog = Blog.objects.get(pk=pk)
    except Blog.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    blog.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)