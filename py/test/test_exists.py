# ProjectName SDK exists test

import pytest
from blutvauthentication_sdk import BlutvAuthenticationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BlutvAuthenticationSDK.test(None, None)
        assert testsdk is not None
