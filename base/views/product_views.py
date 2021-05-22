from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers.product_serializers import ProductSerializer

from rest_framework import status


@api_view(["GET"])
def getProducts(request):
    # query for searching
    query = request.query__params.get('keyword')
    if query == None:
        query = ''

    # filtering product based on query string
    products = Product.objects.filter(name__icontains=query).order_by('-createdAt')

    # get the current page
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1
    
    page = int(page) # convert to interger
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(["GET"])
def getTopProducts(request):
    # get ratings greater than 4 from 0 to 5
    products = Product.objects.filter(rating__gte=4).order_by("-rating")[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getProduct(request, pk):
    # Find product matching with primary key
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name="Sample Name",
        price=0,
        brand="Sample Brand",
        countInStock=0,
        category="Sample category",
        description="",
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    # update product
    product.name = data["name"]
    product.price = data["price"]
    product.brand = data["brand"]
    product.countInStock = data["countInStock"]
    product.category = data["category"]
    product.description = data["description"]
    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response("Producted Deleted")


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def uploadProductImage(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get("image")
    product.save()

    return Response("Image is uploaded successfully")


@api_view(["POST"])
@permission_classes([IsAdminUser])
def addProductReview(request, pk):
    user = request.user
    data = request.data
    product = Product.objects.get(_id=pk)

    # Already reviewed
    existedReview = product.review_set.filter(user=user).exists()
    if existedReview:
        content = {"detail": "Product is already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # No rating or 0
    elif data["rating"] == 0:
        content = {"detail": "Please pleave a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)
    # Create a review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data["rating"],
            comment=data["comment"],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews) # reviews length

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
