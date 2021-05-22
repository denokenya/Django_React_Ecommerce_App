from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path("", views.getProducts, name="products"),

    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadProductImage, name="image-upload"),

    path('<str:pk>/reviews/', views.addProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('<str:pk>/', views.getProducts, name="product"),

    path('<str:pk>/update/', views.updateProduct, name="product-update"),
    path('<str:pk>/delete/', views.deleteProduct, name="product-delete"),
]
