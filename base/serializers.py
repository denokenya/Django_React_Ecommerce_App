from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # return fields
        fields =['_id', 'username', 'email', 'name', 'isAdmin']

    # change id to _id to match with other models
    def get__id(self, obj):
        return obj.id

    # change is_staff to isAdmin
    def get_isAdmin(self, obj):
        return obj.is_staff

    # change firstname into name instead of first and last
    def get_name(self, obj):
        name = obj.first_name

        # when user dpesn't eneter their names
        if name == '':
            name = obj.email
        return name 

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
