from django import forms
from .models import ImageUploadModel
# form field. gon add styling later
class UploadImageForm(forms.Form):
    title = forms.CharField(max_length=50)
    image = forms.ImageField()
# title meta
class ImageUploadForm(forms.ModelForm):
    class Meta:
        model = ImageUploadModel
        # fields = "__all__"
        fields = ('description', 'document')
    # set attributes form style
    def __init__( self, *args, **kwargs ):

        super( ImageUploadForm, self ).__init__( *args, **kwargs )
        self.fields[ 'description' ].widget.attrs.update({'class': 'form-control','id': 'description-id','placeholder': 'Who\'s in this picture?' } )
        self.fields[ 'document' ].widget.attrs.update({'class': 'form-control', 'id': 'document-id'} )
