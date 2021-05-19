from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .product_data import products
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products/',

    ]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)
