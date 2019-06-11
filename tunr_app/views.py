import requests
# from rest_framework import viewsets
# from django.shortcuts import render
# from .serializers import ReviewSerializer, EpisodeSerializer, SeasonSerializer
# from .models import Season, Episode, Review

url = 'http://api.tvmaze.com/shows/84/episodes'
r = requests.get(url).json()
for x in r:
    show = x['name'], x['season'], x['airdate'], x['airtime'], x['image']['medium'], x['summary']
    print(show)
    



# def index(request):
#     url_show = "http://api.tvmaze.com/shows/84/episodes?specials=84"
    
#     request = requests.get(url_show)
#     print(request.text)
#     return render(request, '/')

# class ArtistView(viewsets.ModelViewSet):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

# class ArtistView(viewsets.ModelViewSet):
#     queryset = Artist.objects.all()
#     serializer_class = ArtistSerializer

# class SongView(viewsets.ModelViewSet):
#     queryset = Song.objects.all()
#     serializer_class = SongSerializer