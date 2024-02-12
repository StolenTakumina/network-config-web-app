# -*- coding: utf-8 -*-
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from . import my_script
import logging

logger = logging.getLogger(__name__)
@csrf_exempt
@require_http_methods(["POST"])
def process_request(request):
    if request.method == 'POST':
        try:

            received_data_bytes = request.body
            received_data_str = received_data_bytes.decode('utf-8')
            received_data = json.loads(received_data_str)

            logger.debug("Received data: %s", received_data)

            processed_data = my_script.process_data(received_data)

            return JsonResponse({'result': processed_data})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})
    return JsonResponse({'error': 'Invalid request'})
