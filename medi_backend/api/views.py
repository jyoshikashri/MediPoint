import google.generativeai as genai
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .forms import UploadImageForm
from PIL import Image
import io

genai.configure(api_key=settings.GOOGLE_API_KEY)

@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        form = UploadImageForm(request.POST, request.FILES)
        if form.is_valid():
            image = form.cleaned_data['image']

            # Convert the InMemoryUploadedFile to a PIL Image
            pil_image = Image.open(image)

            # Process the image with Google Gemini API
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                response1 = model.generate_content(["what is the name in the image of tablet", pil_image], stream=True)
                response1.resolve()
                additional_instruction = ", just return me its name don't need to say its name or any kind of supporting words"
                concatenated_prompt = response1.text + additional_instruction

                response = model.generate_content(concatenated_prompt, stream=True)
                response.resolve()
                # Log the entire response for debugging
                print(response)
                
                # Extract the text content from the response
                if response.parts and len(response.parts) > 0:
                    active_ingredients = response.text
                    return JsonResponse({'message': active_ingredients})
                else:
                    return JsonResponse({'error': 'No valid parts in the response. Please check candidate.safety_ratings.'})
            except Exception as e:
                return JsonResponse({'error': str(e)})

    return JsonResponse({'error': 'Invalid request'})
