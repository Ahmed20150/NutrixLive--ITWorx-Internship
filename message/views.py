from django.shortcuts import render
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponseNotAllowed
from django.http import HttpResponse
from .models import Message
# Create your views here.

@csrf_exempt
def sendMessage(request):
    
    data = json.loads(request.body)
    try:
        message = Message.objects.create(
            name=data["name"],
            email=data["email"],
            message=data["message"],
        )
    except Exception as e:
        response = {
            "message": str(e),
        }
        return HttpResponse(
            json.dumps(response), content_type="application/json", status=400
        )
    response = {
        "message": "Message sent successfully",
    }
    return HttpResponse(
        json.dumps(response), content_type="application/json", status=200
    )

