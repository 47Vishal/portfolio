from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class MyUserManager(BaseUserManager):
    def create_user(self, email, First_name, Last_Name, Term, password=None, confirm_password=None):
        """
        Creates and saves a User with the given email,Name, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            First_name = First_name,
            Last_Name=Last_Name,
            Term = Term, 
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, First_name, Last_Name, Term, password=None):
        """
        Creates and saves a superuser with the given email,Name, tc, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password, 
            First_name = First_name,
            Last_Name = Last_Name,
            Term = Term, 
        )
        user.is_admin = True
        user.save(using=self._db)
        return user
    
# Create your custom models here.

class MyUser(AbstractBaseUser):

    email = models.EmailField(
        verbose_name="email",
        max_length=255,
        unique=True,
    )
    First_name = models.CharField(max_length=200)
    Last_Name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    Term = models.BooleanField(help_text="User has agreed to terms and conditions")

    objects = MyUserManager() 

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["Last_Name", 'First_name', 'Term']

    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return self.name


    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
