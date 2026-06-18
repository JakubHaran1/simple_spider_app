from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):

    pass


class Tag(models.Model):
    tag = models.CharField(max_length=50)

    def __str__(self):
        return self.tag


class Spider_img(models.Model):
    img = models.ImageField(upload_to=None, height_field=None,
                            width_field=None, max_length=None)
    title = models.CharField(max_length=250)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Spider(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="spiders")
    name = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    description = models.CharField(max_length=250)
    date_created = models.DateTimeField(auto_now_add=True)
    tags = models.ManyToManyField(Tag)
    # img = models.OneToOneField(
    #     Spider_img, verbose_name=("spider"), on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} | {self.type} | {self.author}'
