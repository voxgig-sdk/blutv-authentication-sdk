# BlutvAuthentication SDK feature factory

from feature.base_feature import BlutvAuthenticationBaseFeature
from feature.test_feature import BlutvAuthenticationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BlutvAuthenticationBaseFeature(),
        "test": lambda: BlutvAuthenticationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
