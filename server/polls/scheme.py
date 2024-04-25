import graphene
from graphene_django import DjangoObjectType
from polls.models import CustomUser

class CustomUserType(DjangoObjectType):

    class Meta:
        model = CustomUser
        field = "__all__"

class Query(graphene.ObjectType):
    all_users = graphene.List(CustomUserType)

    def inputCustomUser(root, info):
        CustomUserType.Objects.put()

    def listall(root,info):
        all_users = graphene.List(CustomUserType)
        return all_users
    
schema = graphene.Schema(query=Query)