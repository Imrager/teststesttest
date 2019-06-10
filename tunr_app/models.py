from django.db import models

# class Artist(models.Model):
#     name = models.CharField(max_length=255)
#     photo_url = models.CharField(max_length=400)
#     nationality = models.CharField(max_length=255)

#     def __str__(self):
#         return self.name

# class Song(models.Model):
#     title = models.CharField(max_length=255)
#     album = models.CharField(max_length=255)
#     preview_url = models.CharField(max_length=400)
#     artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')

#     def __str__(self):
#         return self.title

class Season(models.Model):
    season_name = models.CharField(max_length=40)

    def __str__(self):
        return self.season_name

class Episode(models.Model):
    title = models.CharField(max_length=255)
    season = models.ForeignKey(Season, on_delete=models.CASCADE, related_name='episodes')
    episode_number = models.IntegerField()
    image = models.CharField(max_length=500)

    def __str__(self):
        return self.episode_number

class Review(models.Model):
    review = models.CharField(max_length=250)
    episode = models.ForeignKey(Episode, on_delete=models.CASCADE, related_name='reviews')

    def __str__(self):
        return self.review