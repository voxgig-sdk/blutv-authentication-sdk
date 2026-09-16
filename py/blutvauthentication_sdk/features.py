# BlutvAuthentication SDK feature factory

from blutvauthentication_sdk.feature.base_feature import BlutvAuthenticationBaseFeature
from blutvauthentication_sdk.feature.ratelimit_feature import BlutvAuthenticationRatelimitFeature
from blutvauthentication_sdk.feature.retry_feature import BlutvAuthenticationRetryFeature
from blutvauthentication_sdk.feature.test_feature import BlutvAuthenticationTestFeature
from blutvauthentication_sdk.feature.timeout_feature import BlutvAuthenticationTimeoutFeature


_FEATURES = {
    "base": lambda: BlutvAuthenticationBaseFeature(),
    "ratelimit": lambda: BlutvAuthenticationRatelimitFeature(),
    "retry": lambda: BlutvAuthenticationRetryFeature(),
    "test": lambda: BlutvAuthenticationTestFeature(),
    "timeout": lambda: BlutvAuthenticationTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
