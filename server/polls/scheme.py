import graphene
from graphene_django import DjangoObjectType
from polls.models import CustomUser

class CustomUserType(DjangoObjectType):

    class Meta:
        model = CustomUser
        field = ("username","email","hashed_pass","is_premium")

class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)

    def listall(root,info):
        all_users = graphene.List(CustomUserType)
        return all_users
    
scheme = graphene.Schema(query=Query)