from rest_framework import serializers
from .models import Tweet,TweetReply,Message

class TweetSerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    firstname = serializers.SerializerMethodField()
    verified = serializers.SerializerMethodField()
    class Meta:
        model = Tweet
        fields = ['id','tweet','user','firstname','username','verified','created_at']
    
    def get_username(self, obj):
        return obj.user.username

    def get_firstname(self, obj):
        return obj.user.first_name

    def get_verified(self, obj):
        return True

class TweetReplySerializer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()
    
    class Meta:
        model = TweetReply
        fields = ['id','reply','user','tweet','username','created_at']

    def get_username(self, obj):
        return obj.user.username

class MessageSerializer(serializers.ModelSerializer):
    #created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')

    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {
            'created_at': {'format': '%Y-%m-%d %H:%M:%S'}  # Format the datetime field
        }