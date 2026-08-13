# BlutvAuthentication SDK feature factory

from blutvauthentication_sdk.feature.base_feature import BlutvAuthenticationBaseFeature
from blutvauthentication_sdk.feature.test_feature import BlutvAuthenticationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BlutvAuthenticationBaseFeature(),
        "test": lambda: BlutvAuthenticationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
