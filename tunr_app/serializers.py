from rest_framework import serializers

from .models import User, Review, Comment


# class SongSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Song
#         fields = ('id', 'title', 'album', 'preview_url', 'artist')

# class ArtistSerializer(serializers.ModelSerializer):
#     songs = SongSerializer(many=True, read_only=True)
#     class Meta:
#         model = Artist
#         fields = ('id', 'name', 'photo_url', 'nationality', 'songs')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'reply', 'review')

class ReviewSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ('id', 'review', 'user', 'comments', "episode")

class UserSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'name', 'password', 'image', 'reviews')

