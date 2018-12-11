from django.shortcuts import render

from django.shortcuts import redirect
from .forms import UploadImageForm
from django.core.files.storage import FileSystemStorage

from .forms import ImageUploadForm
from django.conf import settings
from .opencv_dface import opencv_dface

from .models import ImageUploadModel

def post_list(request):
	return render(request, 'blog/post_list.html', {})

def dface(request):
	if request.method == 'POST':
		# when user clicks 'save'button. validate the form
		form = ImageUploadForm(request.POST, request.FILES)
		if form.is_valid():
			post = form.save(commit=False)
			post.save()
			# pass the img file to deepface for scanning

			# auto deleting fuction. delete oldest file when there are over 50 img files stored in db
			if ImageUploadModel.objects.all().count() > 50:
				obs = ImageUploadModel.objects.all().first()
				if obs:
					obs.delete()

			imageURL = settings.MEDIA_URL + form.instance.document.name
			opencv_dface(settings.MEDIA_ROOT_URL + imageURL)

			return render(request, 'blog/dface.html', {'form':form, 'post':post})
	else:
		# rendering - passes img form to the template
		form = ImageUploadForm()
		return render(request, 'blog/dface.html',{'form':form})
