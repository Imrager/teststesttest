import requests
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import UserSerializer, ReviewSerializer, CommentSerializer
from .models import User, Review, Comment

class ReviewView(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class UserView(viewsets.ModelViewSet):
    queryset =User.objects.all()
    serializer_class = UserSerializer

class ShowView(viewsets.ViewSet):
    def list(self, request):
        url = 'http://api.tvmaze.com/shows/84/episodes'
        r = requests.get(url).json()
        # print(episodes)
        return Response(r)


# class EpisodeView(viewsets.ViewSet):
#     def list(self, request):

#         url = f'/shows/84/episodebynumber?season={season}season&number={episode}number'
#         r = requests.get(url).json()
#         # print(episodes)
#         return Response(r)

# class ArtistView(viewsets.ModelViewSet):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

# class SongView(viewsets.ModelViewSet):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer