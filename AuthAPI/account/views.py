from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from account.models import MyUser
from account.serializers import ProfileSerializers, UserLogoutSerializer, SendPasswordResetEmailSerializer, UserChangePasswordSerializers, UserRegistrationSerializers, UserLogInSerializers, UserRestPinSerializer
from django.contrib.auth import authenticate, login, logout
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.permissions import IsAuthenticated
import logging

from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

logger = logging.getLogger(__name__)
#Generate Token Manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializers(data = request.data)
        if serializer.is_valid(raise_exception=True):
            Myuser = serializer.save()
        # uid = urlsafe_base64_encode(force_bytes(Myuser.pk))
            token = get_tokens_for_user(Myuser)
        # activation_link = reverse('activate', kwargs={'uid': uid, 'token':token})
        # activation_url = f'{settings.SITE_DOMAIN}{activation_link}'
        # send_activation_email(Myuser.email, activation_url)
            return Response({'token':token, 
            'msg':'Registration Successful. Please Login.', 'status': 'success'},
            status = status.HTTP_201_CREATED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserActivationView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [AllowAny]

# class UserActivationConfirm(APIView):
#     renderer_classes = [UserRenderer]
#     def post(self, request):
#         uid = request.data.get('uid')
#         token = request.data.get('token')
#         if not uid or not token:
#             return Response({'detail': 'Missing uid or token'}, status=status.HTTP_400_BAD_REQUEST)
#         try:
#             uid = force_str(urlsafe_base64_decode(uid))
#             user = MyUser.objects.get(pk = uid)
#             if default_token_generator.check_token(user, token):
#                 if user.is_active:
#                     return Response({'detail': 'Account is already activated.'}, status=status.HTTP_200_OK)
#                 user.is_active = True
#                 user.save()
#                 return Response({'detail':'Account activated successfully.'}, status= status.HTTP_200_OK)
#             else:
#                 return Response({'detail':'Invalid activation link'}, status=status.HTTP_400_BAD_REQUEST)
#         except MyUser.DoesNotExist:
#             return Response({'detail': 'Invalid activation link'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogInView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLogInSerializers(data = request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            Myuser = authenticate(email = email, password = password)
            
            if Myuser is not None:    
                token = get_tokens_for_user(Myuser)
                return Response({'token':token, 'msg':"SignIn Successful"}, status=status.HTTP_200_OK)
            else :
                return Response({'errors':{'non_field_errors':['email or password is not valid']}}, status=status.HTTP_401_UNAUTHORIZED )
        return Response({'msg':"SignIn Failed", 'errors': serializer.errors },  status=status.HTTP_400_BAD_REQUEST)

class ProfileView(APIView):
    renderer_classes=[UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format= None):
        serializer = ProfileSerializers(request.user)
        return Response(serializer.data, status = status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializers(data = request.data, context ={'user': request.user})# check under UserChangePasswordSerializers
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({ 'msg':'Password Change Successfully'}, status = status.HTTP_201_CREATED)
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserRestPinLinkView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({"msg": 'Password Rest Link Send to your email. Please check your Email.'}, status=status.HTTP_200_OK)
        return Response({'msg':"your session Failed"}, serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class UserRestPinView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, formate= None):
        serializer = UserRestPinSerializer(data = request.data, context={'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception= True):
            return Response({"msg": 'Password Reset your Successful.'}, status=status.HTTP_200_OK)
        return Response({'msg':"your session Failed"}, serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogOutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserLogoutSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                logger.info(f"User {request.user.email} logged out from IP {request.META.get('REMOTE_ADDR')}")
                resp = Response({'msg': 'Logged out'}, status=status.HTTP_200_OK)
                resp.delete_cookie('access_token')
                resp.delete_cookie('refresh_token')
                return resp
            except Exception as e:
                logger.error(f"Unexpected logout error: {e}", exc_info=True)
                return Response({'error': 'Logout failed'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)