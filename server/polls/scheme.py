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
        email = graphene.String(required= True)

    customuser = graphene.Field(CustomUserType)
    
    @classmethod
    def mutate(cls,root,info,email, username, password):
        new_user = CustomUser.objects.create(
            username= username,
            email = email,
            is_premium= False
        )
        salt = hashlib.sha256(password.encode()).hexdigest()
        new_user.salt = salt
        hashpassword=hashlib.sha256((password + salt).encode()).hexdigest()
        new_user.hashed_pass = hashpassword
        new_user.save()
        return customUserMutation(customuser = new_user)

        
class Mutation(graphene.ObjectType):
    create_user = customUserMutation.Field()

class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)

    def listall(root,info):
        all_users = graphene.List(CustomUserType)
        return all_users
    
schema = graphene.Schema(query=Query, mutation=Mutation)