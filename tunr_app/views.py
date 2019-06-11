import requests
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import UserSerializer, ReviewSerializer, CommentSerializer
from .models import User, Review, Comment

url = 'http://api.tvmaze.com/shows/84/episodes'
r = requests.get(url).json()
# for x in r:
#     show = x['name'], x['season'], x['airdate'], x['airtime'], x['image']['medium'], x['summary']
#     print(show)
    



# def index(request):
#     url_show = "http://api.tvmaze.com/shows/84/episodes?specials=84"
    
#     request = requests.get(url_show)
#     print(request.text)
#     return render(request, '/')

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
        for x in r:
            episode = x['name'], x['season'], x['airdate'], x['airtime'], x['image']['medium'], x['summary']
            Response(episode)
# class ArtistView(viewsets.ModelViewSet):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

# class SongView(viewsets.ModelViewSet):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer