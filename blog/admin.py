from django.contrib import admin
from .models import ImageUploadModel
# allows to check uploaded img
class upload_image_Admin(admin.ModelAdmin):
  list_display = ('description', 'document')

admin.site.register(ImageUploadModel, upload_image_Admin)
