from django.contrib.auth import get_user_model

from rest_framework import authentication, permissions, viewsets, filters

from .forms import SprintFilter, TaskFilter
from .models import Sprint, Task
from .serializers import SprintSerializer, TaskSerializer, UserSerializer
from rest_framework.decorators import detail_route
from rest_framework.response import Response
from rest_framework import mixins

User = get_user_model()


class DefaultsMixin(object):

    authentication_classes = (
        authentication.BasicAuthentication,
        authentication.TokenAuthentication,    
    )
    permission_classes = (
        permissions.IsAuthenticated,
    )
    paginate_by = 25
    paginate_by_param = 'page_size'
    max_paginate_by = 100
    filter_backends = (
        filters.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class SprintViewSet(DefaultsMixin, viewsets.ModelViewSet):
    
    queryset = Sprint.objects.order_by('end')
    serializer_class = SprintSerializer
    filter_class = SprintFilter
    search_fields = ('name', )
    ordering_fields = ('end', 'name', )
    

class TaskViewSet(DefaultsMixin, viewsets.ModelViewSet):

    def delete(self, request, pk=None):
        # print(request.data.get('id'))
        Task.objects.filter(id=request.data.get('id')).delete()

        return Response({'code': 0})

    def patch(self, request, pk=None):
        # Task.objects.filter(id=request.data.get('id')).status = 4
        task = Task.objects.filter(id=request.data.get('id'))[0]
        if request.data.get('status') != '0':
            task.status = request.data.get('status')
        if request.data.get('text') != '':
            task.description = request.data.get('text')
        task.save()
        return Response({'code': 0})

    def put(self, request, pk=None):
        task = Task()
        task.id = request.data.get('id')
        task.name = request.data.get('name')
        task.description = request.data.get('description')
        task.status = '1'
        task.order = '0'
        task.due = '2019-02-28'
        task.save()
        return Response({'code': 0})

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_class = TaskFilter
    search_fields = ('name', 'description', )
    ordering_fields = ('name', 'order', 'started', 'due', 'completed', )
    
    
class UserViewSet(DefaultsMixin, viewsets.ReadOnlyModelViewSet):
    
    lookup_field = User.USERNAME_FIELD
    lookup_url_kwarg = User.USERNAME_FIELD
    queryset = User.objects.order_by(User.USERNAME_FIELD)
    serializer_class = UserSerializer
    search_fields = (User.USERNAME_FIELD, )
