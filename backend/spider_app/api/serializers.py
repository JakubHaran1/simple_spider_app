from rest_framework import serializers

from spider_app.models import User, Tag, Spider, Spider_img


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        password_val = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password_val)
        user.save()
        return user

    def update(self, instance, validated_data):
        password_val = validated_data.pop("password")

        for atr, val in validated_data.items():
            setattr(instance, atr, val)

        if self.password:
            setattr(instance, "password", password_val)


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["tag"]


class SpiderImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spider_img
        fields = ["img"]


class SpiderSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    tags = TagSerializer(many=True)
    # spider_img = SpiderImgSerializer()

    class Meta:
        model = Spider
        fields = ["id", "name", "author", "type",
                  "tags", "date_created"]
        # fields = ["name", "author", "type",
        #           "tags", "date_created", "spider_img"]

    def create(self, validated_data):
        tags_data = validated_data.pop("tags")
        # img_data = validated_data.pop("spider_img")
        spider_obj = Spider.objects.create(**validated_data)
        # Spider_img.objects.create(spider=spider_obj, **img_data)
        print(validated_data)
        for tag in tags_data:
            tag_obj, _ = Tag.objects.get_or_create(tag=tag["tag"])
            spider_obj.tags.add(tag_obj)

        return spider_obj

    def update(self, instance, validated_data):
        tags_data = validated_data.pop("tags")

        # img_data = validated_data.pop("spider_img")
        # Spider_img.objects.update_or_create(**img_data)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        tags = []
        for tag in tags_data:
            name_clean = tag.get("tag", "").strip().lower()
            tag_obj, _ = Tag.objects.get_or_create(
                tag=name_clean, defaults=tag)
            tags.append(tag_obj)

        instance.tags.set(tags)

        return instance
