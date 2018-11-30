from django.shortcuts import render

from django.shortcuts import redirect
from .forms import UploadImageForm
from django.core.files.storage import FileSystemStorage

from .forms import ImageUploadForm
from django.conf import settings
from .opencv_dface import opencv_dface



def post_list(request):
	return render(request, 'blog/post_list.html', {})

def uimage(request):
		# excute when upload img file
	if request.method == 'POST':
		form = UploadImageForm(request.POST, request.FILES)
		if form.is_valid():
			myfile = request.FILES['image']
			fs = FileSystemStorage()
			filename = fs.save(myfile.name, myfile)
			uploaded_file_url = fs.url(filename)
			return render(request, 'blog/uimage.html', {'form': form, 'uploaded_file_url': uploaded_file_url})
	else:
		# render
		form = UploadImageForm()
		return render(request, 'blog/uimage.html', {'form': form})


def dface(request):
	if request.method == 'POST':
		# when user clicks 'save'button. validate the form
		form = ImageUploadForm(request.POST, request.FILES)
		if form.is_valid():
			post = form.save(commit=False)
			post.save()
			# pass the img file to deepface for scanning
			imageURL = settings.MEDIA_URL + form.instance.document.name
			opencv_dface(settings.MEDIA_ROOT_URL + imageURL)

			return render(request, 'blog/dface.html', {'form':form, 'post':post})
	else:
		# rendering - passes img form to the template
		form = ImageUploadForm()
		return render(request, 'blog/dface.html',{'form':form})
