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



class User(models.Model):
    name = models.CharField(max_length=14)
    password = models.CharField(max_length=20)
    image = models.CharField(max_length=750)

    def __str__(self):
        return self.name

class Review(models.Model):
    review = models.CharField(max_length=250)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    episode = models.CharField(max_length=10)

    def __str__(self):
        return self.review

class Comment(models.Model):
    reply = models.CharField(max_length=250)
    review = models.ForeignKey(Review, on_delete=models.CASCADE, related_name='comments')
    


    def __str__(self):
        return self.reply