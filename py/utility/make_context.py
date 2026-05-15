# BlutvAuthentication SDK utility: make_context

from core.context import BlutvAuthenticationContext


def make_context_util(ctxmap, basectx):
    return BlutvAuthenticationContext(ctxmap, basectx)
