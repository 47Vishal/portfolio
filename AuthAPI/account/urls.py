from django.urls import path, include
from account.views import ProfileView, UserChangePasswordView, UserRegistrationView, UserLogInView, UserRestPinLinkView, UserRestPinView, UserLogOutView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    # path('activate/<str:uid>/<str:token>/', UserActivationView.as_view(), name='activate'),
    # path('activation/', UserActivationConfirm.as_view(), name='activation'),
    path('SignIn/', UserLogInView.as_view(), name='SignIn'),
    path('profile/', ProfileView.as_view(), name='Profile'),
    path('change_password/', UserChangePasswordView.as_view(), name='changPin'),
    path('ResetLink_Pin/', UserRestPinLinkView.as_view(), name='ResetLink_Pin'),
    path('reset/<uid>/<token>/', UserRestPinView.as_view(), name='Reset_Pin'),
    path('logout/', UserLogOutView.as_view(), name='Logout'),
 # path('api/user/', include('account.urls'))
]
