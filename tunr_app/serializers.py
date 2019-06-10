from rest_framework import serializers

from .models import Season, Episode, Review


# class SongSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Song
#         fields = ('id', 'title', 'album', 'preview_url', 'artist')

# class ArtistSerializer(serializers.ModelSerializer):
#     songs = SongSerializer(many=True, read_only=True)
#     class Meta:
#         model = Artist
#         fields = ('id', 'name', 'photo_url', 'nationality', 'songs')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'review', 'episode')

class EpisodeSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = Episode
        fields = ('id', 'title', 'season', 'episode_number', 'image', 'reviews')


class SeasonSerializer(serializers.ModelSerializer):
    episodes = EpisodeSerializer(many=True, read_only=True)
    class Meta:
        model = Season
        fields = ('id', 'season_name', 'episodes')