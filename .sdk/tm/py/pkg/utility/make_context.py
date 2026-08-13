# BlutvAuthentication SDK utility: make_context

from projectname_sdk.core.context import BlutvAuthenticationContext


def make_context_util(ctxmap, basectx):
    return BlutvAuthenticationContext(ctxmap, basectx)
