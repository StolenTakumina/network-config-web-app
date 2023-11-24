# -*- coding: utf-8 -*-
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from . import my_script # Import twojej funkcji zewnętrznej
import logging

logger = logging.getLogger(__name__)
@csrf_exempt  # Wyłącza CSRF, użyj z rozwagą w zastosowaniach produkcyjnych
@require_http_methods(["POST"])
def process_request(request):
    if request.method == 'POST':
        try:
            # Pobierz dane z ciała żądania (JSON)
            received_data_bytes = request.body
            received_data_str = received_data_bytes.decode('utf-8')
            received_data = json.loads(received_data_str)

            # Log the received data
            logger.debug("Received data: %s", received_data)

            # Przetwórz dane przy użyciu swojego skryptu
            processed_data = my_script.process_data(received_data)

            # Zwróć dane w formacie JSON
            return JsonResponse({'result': processed_data})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'})
    return JsonResponse({'error': 'Invalid request'})
