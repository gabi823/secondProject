"""
URL configuration for secondProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from spotifyWrapped import views
from spotifyWrapped.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home_view, name='home'),
    path('callback/', views.spotify_callback, name='spotify_callback'),
    path('spotify/login/', views.spotify_login, name='spotify_login'),
    path('spotify/data/', views.spotify_data, name='spotify_data'),
    path('spotify/profile/', views.profile_page, name='profile_page'),
    path('spotify/logout/', views.logout_view, name='spotify_logout'),
    path('delete_account/', views.delete_account, name='delete_account'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('unlink_spotify/', views.unlink_spotify, name='unlink_spotify'),
    path('spotify/delete_wrap/<int:wrap_id>/', views.delete_wrap, name='delete_wrap'),
    path('api/', include('spotifyWrapped.urls')),
    path('wel/', ReactView.as_view(), name="something")
]
