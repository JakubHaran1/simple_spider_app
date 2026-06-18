from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from spider_app.api import url
from .views import UserViewSet, TagViewSet, SpiderViewSet, SpiderImgViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"tags", TagViewSet)
router.register(r"spiders", SpiderViewSet)
router.register(r"spidersImg", SpiderImgViewSet)


urlpatterns = [
    path("", include(router.urls))
]
