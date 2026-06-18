from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from spider_app.models import User, Tag, Spider, Spider_img
from .serializers import UserSerializer, TagSerializer, SpiderSerializer, SpiderImgSerializer
from .permission import isAuthor
from rest_framework import filters


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class SpiderImgViewSet(viewsets.ModelViewSet):
    queryset = Spider_img.objects.all()
    serializer_class = SpiderImgSerializer


class SpiderViewSet(viewsets.ModelViewSet):
    queryset = Spider.objects.all()
    serializer_class = SpiderSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    ordering_fields = ['date_created', 'name', 'type']

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_permissions(self):
        if self.action == "update" or self.action == "partial_update" or self.action == "destroy":
            self.permission_classes = [isAuthor]
        else:
            self.permission_classes = [AllowAny]

        return super().get_permissions()
