import graphene
from graphene_django import DjangoObjectType
from polls.models import CustomUser
import hashlib

class CustomUserType(DjangoObjectType):

    class Meta:
        model = CustomUser
        field = "__all__"

class customUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required = True)
        password = graphene.String(required = True)
        email = graphene(required= True)

    customuser = graphene.Field(CustomUserType)
    @classmethod
    def mutate(cls,root,info,email, username, password):
        cus =cls.customuser
        salt  = hashlib.sha256()
        cus.salt = salt
        hashpassword = salt.update(password)
        hashpassword = hashpassword.hexdigest()
        cus.hashed_pass = hashpassword
        cus.email = email
        cus.username = username
        cus.is_premium = False

        return customUserMutation(customuser = cus)

        

class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)

    def inputCustomUser(root, info):
        CustomUserType.Objects.put()

    def listall(root,info):
        all_users = graphene.List(CustomUserType)
        return all_users
    
schema = graphene.Schema(query=Query)