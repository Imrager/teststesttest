from django.db import models

# Create your models here.
class Artist(models.Model):
    name = models.CharField(max_length=255)
    photo_url = models.CharField(max_length=400)
    nationality = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Song(models.Model):
    title = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    preview_url = models.CharField(max_length=400)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')

    def __str__(self):
        return self.title